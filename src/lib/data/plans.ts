import type { SubscriptionPlan } from '$lib/types';

export const subscriptionPlans: SubscriptionPlan[] = [
	{
		id: 'p1',
		name: 'Разовое посещение',
		price: 5_000,
		trainingCount: 1,
		validityDays: 7
	},
	{
		id: 'p2',
		name: 'Стартовый — 4 тренировки',
		price: 18_000,
		trainingCount: 4,
		validityDays: 30
	},
	{
		id: 'p3',
		name: 'Базовый — 8 тренировок',
		price: 32_000,
		trainingCount: 8,
		validityDays: 45
	},
	{
		id: 'p4',
		name: 'Стандарт — 12 тренировок',
		price: 42_000,
		trainingCount: 12,
		validityDays: 60
	},
	{
		id: 'p5',
		name: 'Безлимит месяц',
		price: 55_000,
		trainingCount: 999,
		validityDays: 30
	}
];
