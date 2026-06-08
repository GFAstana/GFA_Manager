import type { SubscriptionPayment } from '$lib/types';

/**
 * Мок оплат. Ориентир «сегодня»: 2026-06-08 (понедельник).
 * Активные абонементы — для создания новых тренировок на /training/new.
 */
export const subscriptionPayments: SubscriptionPayment[] = [
	// c1 — Алиев Тимур · Стандарт 12, осталось 9
	{
		id: 'pay1',
		clientId: 'c1',
		planId: 'p4',
		paidAt: '2026-05-10',
		amount: 42_000,
		trainingsUsed: 3,
		validFrom: '2026-05-10',
		validUntil: '2026-07-09',
		status: 'active'
	},
	// c2 — Соколова Анна · старый исчерпанный
	{
		id: 'pay2',
		clientId: 'c2',
		planId: 'p3',
		paidAt: '2026-03-01',
		amount: 32_000,
		trainingsUsed: 8,
		validFrom: '2026-03-01',
		validUntil: '2026-04-15',
		status: 'used_up'
	},
	// c2 — продление · Базовый 8, осталось 6
	{
		id: 'pay9',
		clientId: 'c2',
		planId: 'p3',
		paidAt: '2026-06-01',
		amount: 32_000,
		trainingsUsed: 2,
		validFrom: '2026-06-01',
		validUntil: '2026-07-16',
		status: 'active'
	},
	// c3 — Жумабеков · Стартовый 4, осталось 2
	{
		id: 'pay3',
		clientId: 'c3',
		planId: 'p2',
		paidAt: '2026-05-20',
		amount: 18_000,
		trainingsUsed: 2,
		validFrom: '2026-05-20',
		validUntil: '2026-06-19',
		status: 'active'
	},
	// c4 — Ким · Безлимит
	{
		id: 'pay4',
		clientId: 'c4',
		planId: 'p5',
		paidAt: '2026-06-01',
		amount: 55_000,
		trainingsUsed: 4,
		validFrom: '2026-06-01',
		validUntil: '2026-07-01',
		status: 'active'
	},
	// c5 — Волкова · старый разовый
	{
		id: 'pay5',
		clientId: 'c5',
		planId: 'p1',
		paidAt: '2026-03-12',
		amount: 5_000,
		trainingsUsed: 1,
		validFrom: '2026-03-12',
		validUntil: '2026-03-19',
		status: 'used_up'
	},
	// c5 — новый · Стартовый 4, осталось 4
	{
		id: 'pay10',
		clientId: 'c5',
		planId: 'p2',
		paidAt: '2026-06-05',
		amount: 18_000,
		trainingsUsed: 0,
		validFrom: '2026-06-05',
		validUntil: '2026-07-05',
		status: 'active'
	},
	// c6 — Мусаев · старый истёкший
	{
		id: 'pay6',
		clientId: 'c6',
		planId: 'p4',
		paidAt: '2026-02-15',
		amount: 42_000,
		trainingsUsed: 12,
		validFrom: '2026-02-15',
		validUntil: '2026-04-16',
		status: 'expired'
	},
	// c6 — новый · Стандарт 12, осталось 8
	{
		id: 'pay11',
		clientId: 'c6',
		planId: 'p4',
		paidAt: '2026-05-15',
		amount: 42_000,
		trainingsUsed: 4,
		validFrom: '2026-05-15',
		validUntil: '2026-07-14',
		status: 'active'
	},
	// c7 — Бекова · Базовый 8, осталось 6
	{
		id: 'pay7',
		clientId: 'c7',
		planId: 'p3',
		paidAt: '2026-06-03',
		amount: 32_000,
		trainingsUsed: 2,
		validFrom: '2026-06-03',
		validUntil: '2026-07-18',
		status: 'active'
	},
	// c8 — Громов · Стартовый 4, осталось 4
	{
		id: 'pay8',
		clientId: 'c8',
		planId: 'p2',
		paidAt: '2026-05-28',
		amount: 18_000,
		trainingsUsed: 0,
		validFrom: '2026-05-28',
		validUntil: '2026-06-27',
		status: 'active'
	}
];
