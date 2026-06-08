<script lang="ts">
	import { clients, trainers, timeSlots, subscriptionPlans } from '$lib/data';
	import { appStore } from '$lib/state/app-store';
	import { formatMoney } from '$lib/utils';

	let activePayments = $derived(
		$appStore.subscriptionPayments.filter((p) => p.status === 'active').length
	);
	let totalRevenue = $derived(
		$appStore.subscriptionPayments.reduce((sum, p) => sum + p.amount, 0)
	);
</script>

<h1 class="page-title">Добро пожаловать</h1>
<p class="page-subtitle">Система управления тренировками HEMA-клуба GFA Astana</p>

<div class="stats">
	<div class="card stat">
		<div class="stat-value">{clients.length}</div>
		<div class="stat-label">Клиентов</div>
	</div>
	<div class="card stat">
		<div class="stat-value">{trainers.length}</div>
		<div class="stat-label">Тренеров</div>
	</div>
	<div class="card stat">
		<div class="stat-value">{timeSlots.length}</div>
		<div class="stat-label">Слотов в неделю</div>
	</div>
	<div class="card stat">
		<div class="stat-value">{subscriptionPlans.length}</div>
		<div class="stat-label">Тарифов</div>
	</div>
	<div class="card stat">
		<div class="stat-value">{activePayments}</div>
		<div class="stat-label">Активных абонементов</div>
	</div>
	<div class="card stat">
		<div class="stat-value">{formatMoney(totalRevenue)}</div>
		<div class="stat-label">Оплат всего</div>
	</div>
</div>

<div class="sections">
	<div class="card">
		<h2>Ближайшие слоты</h2>
		<ul>
			{#each timeSlots.slice(0, 5) as slot}
				<li>
					<span class="badge">{slot.day}</span>
					<strong>{slot.time}</strong> — {slot.direction}, {slot.hall}
				</li>
			{/each}
		</ul>
		<a href="/slots" class="link">Все слоты →</a>
	</div>

	<div class="card">
		<h2>Тарифы абонементов</h2>
		<ul>
			{#each subscriptionPlans.slice(0, 4) as plan}
				<li>
					<strong>{plan.name}</strong>
					<span class="muted">{plan.price.toLocaleString('ru-RU')} ₸</span>
				</li>
			{/each}
		</ul>
		<a href="/plans" class="link">Все тарифы →</a>
	</div>
</div>

<style>
	.stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.stat {
		text-align: center;
	}

	.sections {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
	}

	h2 {
		font-size: 1rem;
		margin-bottom: 1rem;
		color: var(--accent);
	}

	ul {
		list-style: none;
	}

	li {
		padding: 0.5rem 0;
		border-bottom: 1px solid var(--border);
		font-size: 0.9rem;
	}

	li:last-child {
		border-bottom: none;
	}

	li strong {
		color: var(--accent);
	}

	.link {
		display: inline-block;
		margin-top: 1rem;
		font-size: 0.85rem;
	}

	.muted {
		color: var(--text-muted);
		font-size: 0.85rem;
	}

	li {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	@media (max-width: 700px) {
		.sections {
			grid-template-columns: 1fr;
		}
	}
</style>
