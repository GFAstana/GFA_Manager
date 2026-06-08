import { trainers, timeSlots } from '$lib/data';
import { getTrainingSessions } from '$lib/training-sessions';
import type { TimeSlot, Trainer, TrainingSession } from '$lib/types';

export interface TrainerProfile {
	trainer: Trainer;
	slots: TimeSlot[];
	sessions: TrainingSession[];
	directions: string[];
	stats: {
		weeklySlots: number;
		directionsCount: number;
		sessionsCount: number;
		uniqueAthletes: number;
		totalAttendeeMarks: number;
	};
}

const dayOrder = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

export function getTrainerProfile(trainerId: string): TrainerProfile | null {
	const trainer = trainers.find((t) => t.id === trainerId);
	if (!trainer) return null;

	const slots = timeSlots
		.filter((s) => s.defaultTrainerId === trainerId)
		.sort((a, b) => {
			const dayCmp = dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
			if (dayCmp !== 0) return dayCmp;
			return a.time.localeCompare(b.time);
		});

	const slotIds = new Set(slots.map((s) => s.id));
	const sessions = getTrainingSessions().filter((s) => slotIds.has(s.slotId));

	const directions = [...new Set(slots.map((s) => s.direction))];
	const athleteIds = new Set(sessions.flatMap((s) => s.attendees.map((a) => a.clientId)));

	return {
		trainer,
		slots,
		sessions,
		directions,
		stats: {
			weeklySlots: slots.length,
			directionsCount: directions.length,
			sessionsCount: sessions.length,
			uniqueAthletes: athleteIds.size,
			totalAttendeeMarks: sessions.reduce((sum, s) => sum + s.attendees.length, 0)
		}
	};
}
