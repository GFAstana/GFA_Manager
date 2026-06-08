export interface Client {
	id: string;
	name: string;
	contact: string;
	registeredAt: string;
}

export interface Trainer {
	id: string;
	fullName: string;
}

export interface TimeSlot {
	id: string;
	day: string;
	time: string;
	direction: string;
	hall: string;
	defaultTrainerId: string;
}

export interface SubscriptionPlan {
	id: string;
	name: string;
	price: number;
	trainingCount: number;
	validityDays: number;
}

export type PaymentStatus = 'active' | 'expired' | 'used_up';

export interface SubscriptionPayment {
	id: string;
	clientId: string;
	planId: string;
	paidAt: string;
	amount: number;
	trainingsUsed: number;
	validFrom: string;
	validUntil: string;
	status: PaymentStatus;
}

export interface Visit {
	id: string;
	clientId: string;
	paymentId: string;
	slotId: string;
	date: string;
}

export interface TrainingAttendee {
	clientId: string;
	clientName: string;
	visitId: string;
	planName: string;
}

export interface TrainingSession {
	id: string;
	date: string;
	slotId: string;
	trainerId: string;
	day: string;
	time: string;
	direction: string;
	hall: string;
	trainerName: string;
	attendees: TrainingAttendee[];
}
