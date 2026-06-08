import { clients, subscriptionPlans, timeSlots, trainers } from '$lib/data';
import { getPayments, getVisits } from '$lib/state/app-store';
import type { Client, SubscriptionPayment, SubscriptionPlan, Visit } from '$lib/types';

export interface VisitDetail extends Visit {
	direction: string;
	time: string;
	hall: string;
	trainerName: string;
	planName: string;
}

export interface PaymentDetail extends SubscriptionPayment {
	plan: SubscriptionPlan;
	visitCount: number;
}

export interface ClientProfile {
	client: Client;
	payments: PaymentDetail[];
	visits: VisitDetail[];
	activePayment: PaymentDetail | null;
	stats: {
		totalVisits: number;
		totalPaid: number;
		remainingTrainings: string;
		daysInClub: number;
	};
}

function enrichPayment(payment: SubscriptionPayment): PaymentDetail {
	const plan = subscriptionPlans.find((p) => p.id === payment.planId)!;
	const visitCount = getVisits().filter((v) => v.paymentId === payment.id).length;
	return { ...payment, plan, visitCount };
}

function enrichVisit(visit: Visit): VisitDetail {
	const slot = timeSlots.find((s) => s.id === visit.slotId)!;
	const payment = getPayments().find((p) => p.id === visit.paymentId)!;
	const plan = subscriptionPlans.find((pl) => pl.id === payment.planId)!;
	const trainer = trainers.find((t) => t.id === slot.defaultTrainerId);
	return {
		...visit,
		direction: slot.direction,
		time: slot.time,
		hall: slot.hall,
		trainerName: trainer?.fullName ?? '—',
		planName: plan.name
	};
}

function remainingTrainings(payment: PaymentDetail): string {
	if (payment.plan.trainingCount >= 999) return 'безлимит';
	const left = payment.plan.trainingCount - payment.trainingsUsed;
	return `${left} из ${payment.plan.trainingCount}`;
}

export function getClientProfile(clientId: string): ClientProfile | null {
	const client = clients.find((c) => c.id === clientId);
	if (!client) return null;

	const payments = getPayments()
		.filter((p) => p.clientId === clientId)
		.map(enrichPayment)
		.sort((a, b) => b.paidAt.localeCompare(a.paidAt));

	const visitList = getVisits()
		.filter((v) => v.clientId === clientId)
		.map(enrichVisit)
		.sort((a, b) => b.date.localeCompare(a.date));

	const activePayment = payments.find((p) => p.status === 'active') ?? null;

	const registered = new Date(client.registeredAt);
	const today = new Date();
	const daysInClub = Math.floor((today.getTime() - registered.getTime()) / (1000 * 60 * 60 * 24));

	return {
		client,
		payments,
		visits: visitList,
		activePayment,
		stats: {
			totalVisits: visitList.length,
			totalPaid: payments.reduce((sum, p) => sum + p.amount, 0),
			remainingTrainings: activePayment ? remainingTrainings(activePayment) : '—',
			daysInClub
		}
	};
}
