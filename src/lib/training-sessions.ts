import { clients, subscriptionPlans, timeSlots, trainers } from '$lib/data';
import { getPayments, getVisits } from '$lib/state/app-store';
import type { TrainingSession, TrainingAttendee } from '$lib/types';

function sessionKey(date: string, slotId: string): string {
	return `${date}_${slotId}`;
}

function buildAttendee(visitId: string, clientId: string, paymentId: string): TrainingAttendee {
	const client = clients.find((c) => c.id === clientId)!;
	const payment = getPayments().find((p) => p.id === paymentId)!;
	const plan = subscriptionPlans.find((pl) => pl.id === payment.planId)!;
	return {
		clientId,
		clientName: client.name,
		visitId,
		planName: plan.name
	};
}

export function getTrainingSessions(): TrainingSession[] {
	const map = new Map<string, TrainingSession>();

	for (const visit of getVisits()) {
		const key = sessionKey(visit.date, visit.slotId);
		const slot = timeSlots.find((s) => s.id === visit.slotId)!;
		const trainer = trainers.find((t) => t.id === slot.defaultTrainerId);

		if (!map.has(key)) {
			map.set(key, {
				id: key,
				date: visit.date,
				slotId: visit.slotId,
				trainerId: slot.defaultTrainerId,
				day: slot.day,
				time: slot.time,
				direction: slot.direction,
				hall: slot.hall,
				trainerName: trainer?.fullName ?? '—',
				attendees: []
			});
		}

		map.get(key)!.attendees.push(buildAttendee(visit.id, visit.clientId, visit.paymentId));
	}

	return [...map.values()].sort((a, b) => {
		const dateCmp = b.date.localeCompare(a.date);
		if (dateCmp !== 0) return dateCmp;
		return a.time.localeCompare(b.time);
	});
}

export function getTrainingSession(id: string): TrainingSession | null {
	return getTrainingSessions().find((s) => s.id === id) ?? null;
}
