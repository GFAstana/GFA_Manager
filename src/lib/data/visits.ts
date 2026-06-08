import type { Visit } from '$lib/types';

/**
 * Мок посещений. Все даты до 2026-06-08.
 * Понедельник 2026-06-08 (s1, s2) — слоты свободны для новых тренировок.
 */
export const visits: Visit[] = [
	// c1 — pay1, 3 посещения
	{ id: 'v1', clientId: 'c1', paymentId: 'pay1', slotId: 's1', date: '2026-05-12' },
	{ id: 'v2', clientId: 'c1', paymentId: 'pay1', slotId: 's6', date: '2026-05-14' },
	{ id: 'v3', clientId: 'c1', paymentId: 'pay1', slotId: 's1', date: '2026-05-26' },

	// c2 — pay9, 2 посещения
	{ id: 'v4', clientId: 'c2', paymentId: 'pay9', slotId: 's2', date: '2026-06-02' },
	{ id: 'v5', clientId: 'c2', paymentId: 'pay9', slotId: 's7', date: '2026-06-05' },

	// c3 — pay3, 2 посещения
	{ id: 'v6', clientId: 'c3', paymentId: 'pay3', slotId: 's3', date: '2026-05-27' },
	{ id: 'v7', clientId: 'c3', paymentId: 'pay3', slotId: 's8', date: '2026-06-06' },

	// c4 — pay4, 4 посещения (безлимит)
	{ id: 'v8', clientId: 'c4', paymentId: 'pay4', slotId: 's4', date: '2026-06-03' },
	{ id: 'v9', clientId: 'c4', paymentId: 'pay4', slotId: 's9', date: '2026-06-07' },
	{ id: 'v10', clientId: 'c4', paymentId: 'pay4', slotId: 's4', date: '2026-06-05' },
	{ id: 'v11', clientId: 'c4', paymentId: 'pay4', slotId: 's10', date: '2026-06-07' },

	// c6 — pay11, 4 посещения
	{ id: 'v12', clientId: 'c6', paymentId: 'pay11', slotId: 's1', date: '2026-05-19' },
	{ id: 'v13', clientId: 'c6', paymentId: 'pay11', slotId: 's6', date: '2026-05-21' },
	{ id: 'v14', clientId: 'c6', paymentId: 'pay11', slotId: 's1', date: '2026-06-02' },
	{ id: 'v15', clientId: 'c6', paymentId: 'pay11', slotId: 's6', date: '2026-06-04' },

	// c7 — pay7, 2 посещения
	{ id: 'v16', clientId: 'c7', paymentId: 'pay7', slotId: 's5', date: '2026-06-04' },
	{ id: 'v17', clientId: 'c7', paymentId: 'pay7', slotId: 's5', date: '2026-06-06' },

	// групповая — 2026-06-07 суббота, s10
	{ id: 'v18', clientId: 'c1', paymentId: 'pay1', slotId: 's10', date: '2026-06-07' },
	{ id: 'v19', clientId: 'c3', paymentId: 'pay3', slotId: 's10', date: '2026-06-07' },
	{ id: 'v20', clientId: 'c7', paymentId: 'pay7', slotId: 's10', date: '2026-06-07' }

	// c5 pay10 — 0 посещений (новый абонемент)
	// c8 pay8 — 0 посещений (ещё не ходил)
];
