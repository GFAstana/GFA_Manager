import type { PaymentStatus, SubscriptionPlan } from '$lib/types';

const WEEKDAYS = [
	'Воскресенье',
	'Понедельник',
	'Вторник',
	'Среда',
	'Четверг',
	'Пятница',
	'Суббота'
];

export function getWeekdayName(dateStr: string): string {
	return WEEKDAYS[new Date(`${dateStr}T12:00:00`).getDay()];
}

export function formatDate(dateStr: string): string {
	return new Date(dateStr).toLocaleDateString('ru-RU', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});
}

export function formatMoney(amount: number): string {
	return amount.toLocaleString('ru-RU') + ' ₸';
}

export function formatValidityDays(days: number): string {
	if (days === 30) return '1 месяц';
	if (days === 60) return '2 месяца';
	if (days === 45) return '45 дней';
	return `${days} дн.`;
}

export function formatTrainingCount(count: number, plan?: SubscriptionPlan): string {
	if (plan && count >= 999) return 'безлимит';
	return `${count} трен.`;
}

export function paymentStatusLabel(status: PaymentStatus): string {
	const labels: Record<PaymentStatus, string> = {
		active: 'Активен',
		expired: 'Истёк',
		used_up: 'Исчерпан'
	};
	return labels[status];
}
