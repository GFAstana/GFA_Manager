import { writable, get } from 'svelte/store';
import { clients } from '$lib/data/clients';
import { subscriptionPlans } from '$lib/data/plans';
import { subscriptionPayments as initialPayments } from '$lib/data/payments';
import { visits as initialVisits } from '$lib/data/visits';
import { timeSlots } from '$lib/data/slots';
import { getWeekdayName } from '$lib/utils';
import type { Client, SubscriptionPayment, SubscriptionPlan, TimeSlot, Visit } from '$lib/types';

export interface EligibleAthlete {
	client: Client;
	payment: SubscriptionPayment;
	plan: SubscriptionPlan;
	remaining: number | 'unlimited';
}

interface AppState {
	visits: Visit[];
	subscriptionPayments: SubscriptionPayment[];
}

export const appStore = writable<AppState>({
	visits: structuredClone(initialVisits),
	subscriptionPayments: structuredClone(initialPayments)
});

export function getVisits(): Visit[] {
	return get(appStore).visits;
}

export function getPayments(): SubscriptionPayment[] {
	return get(appStore).subscriptionPayments;
}

function activePaymentForDate(clientId: string, date: string): EligibleAthlete | null {
	const state = get(appStore);
	const payment = state.subscriptionPayments.find((p) => {
		if (p.clientId !== clientId || p.status !== 'active') return false;
		if (date < p.validFrom || date > p.validUntil) return false;
		const plan = subscriptionPlans.find((pl) => pl.id === p.planId)!;
		if (plan.trainingCount < 999 && p.trainingsUsed >= plan.trainingCount) return false;
		return true;
	});

	if (!payment) return null;

	const plan = subscriptionPlans.find((p) => p.id === payment.planId)!;
	const remaining =
		plan.trainingCount >= 999 ? 'unlimited' : plan.trainingCount - payment.trainingsUsed;

	return { client: clients.find((c) => c.id === clientId)!, payment, plan, remaining };
}

export function getEligibleAthletes(date: string): EligibleAthlete[] {
	if (!date) return [];

	return clients
		.map((c) => activePaymentForDate(c.id, date))
		.filter((a): a is EligibleAthlete => a !== null)
		.sort((a, b) => a.client.name.localeCompare(b.client.name, 'ru'));
}

export function isSessionCreated(date: string, slotId: string): boolean {
	return get(appStore).visits.some((v) => v.date === date && v.slotId === slotId);
}

export function getAvailableSlotsForDate(date: string): TimeSlot[] {
	if (!date) return [];

	const weekday = getWeekdayName(date);
	return timeSlots
		.filter((s) => s.day === weekday)
		.filter((s) => !isSessionCreated(date, s.id))
		.sort((a, b) => a.time.localeCompare(b.time));
}

export function isAlreadyMarked(clientId: string, date: string, slotId: string): boolean {
	return get(appStore).visits.some(
		(v) => v.clientId === clientId && v.date === date && v.slotId === slotId
	);
}

export function getEligibleForSession(date: string, slotId: string): EligibleAthlete[] {
	return getEligibleAthletes(date).filter((a) => !isAlreadyMarked(a.client.id, date, slotId));
}

export interface CreateTrainingResult {
	ok: boolean;
	error?: string;
	created?: number;
}

export function createTraining(
	date: string,
	slotId: string,
	clientIds: string[]
): CreateTrainingResult {
	if (!date || !slotId) return { ok: false, error: 'Выберите дату и слот' };
	if (!timeSlots.some((s) => s.id === slotId)) return { ok: false, error: 'Слот не найден' };
	if (clientIds.length === 0) return { ok: false, error: 'Выберите хотя бы одного атлета' };

	const toAdd: { clientId: string; paymentId: string }[] = [];

	for (const clientId of clientIds) {
		if (isAlreadyMarked(clientId, date, slotId)) {
			return { ok: false, error: 'Один из атлетов уже отмечен на эту тренировку' };
		}
		const eligible = activePaymentForDate(clientId, date);
		if (!eligible) {
			const name = clients.find((c) => c.id === clientId)?.name ?? clientId;
			return { ok: false, error: `${name} не может посетить: нет активного абонемента` };
		}
		toAdd.push({ clientId, paymentId: eligible.payment.id });
	}

	appStore.update((state) => {
		const visits = [...state.visits];
		const subscriptionPayments = state.subscriptionPayments.map((p) => ({ ...p }));

		for (const { clientId, paymentId } of toAdd) {
			const visitId = `v${Date.now()}_${clientId}`;
			visits.push({ id: visitId, clientId, paymentId, slotId, date });

			const payIdx = subscriptionPayments.findIndex((p) => p.id === paymentId);
			if (payIdx === -1) continue;

			const plan = subscriptionPlans.find((pl) => pl.id === subscriptionPayments[payIdx].planId)!;
			subscriptionPayments[payIdx].trainingsUsed += 1;

			if (
				plan.trainingCount < 999 &&
				subscriptionPayments[payIdx].trainingsUsed >= plan.trainingCount
			) {
				subscriptionPayments[payIdx].status = 'used_up';
			}
		}

		return { visits, subscriptionPayments };
	});

	return { ok: true, created: toAdd.length };
}
