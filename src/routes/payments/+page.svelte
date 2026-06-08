<script lang="ts">
	import { clients, subscriptionPlans } from '$lib/data';
	import { appStore } from '$lib/state/app-store';
	import {
		formatDate,
		formatMoney,
		formatTrainingCount,
		paymentStatusLabel
	} from '$lib/utils';
	function clientName(id: string): string {
		return clients.find((c) => c.id === id)?.name ?? '—';
	}

	function planName(id: string): string {
		return subscriptionPlans.find((p) => p.id === id)?.name ?? '—';
	}

	function planById(id: string) {
		return subscriptionPlans.find((p) => p.id === id);
	}

	let payments = $derived($appStore.subscriptionPayments);
	let activeCount = $derived(payments.filter((p) => p.status === 'active').length);
	let totalRevenue = $derived(payments.reduce((sum, p) => sum + p.amount, 0));
</script>

<h1 class="page-title">Оплаты абонементов</h1>
<p class="page-subtitle">Учёт оплат клиентов по тарифам</p>

<div class="stats">
	<div class="card stat">
		<div class="stat-value">{payments.length}</div>
		<div class="stat-label">Всего оплат</div>
	</div>
	<div class="card stat">
		<div class="stat-value">{activeCount}</div>
		<div class="stat-label">Активных</div>
	</div>
	<div class="card stat">
		<div class="stat-value">{formatMoney(totalRevenue)}</div>
		<div class="stat-label">Сумма оплат</div>
	</div>
</div>

<div class="card table-wrap">
	<table>
		<thead>
			<tr>
				<th>Клиент</th>
				<th>Абонемент</th>
				<th>Оплата</th>
				<th>Период</th>
				<th>Использовано</th>
				<th>Статус</th>
			</tr>
		</thead>
		<tbody>
			{#each payments as payment}
				{@const plan = planById(payment.planId)}
				<tr>
					<td>
						<a href="/clients/{payment.clientId}" class="client-link">
							<strong>{clientName(payment.clientId)}</strong>
						</a>
					</td>
					<td>{planName(payment.planId)}</td>
					<td>
						<strong>{formatMoney(payment.amount)}</strong>
						<span class="sub">{formatDate(payment.paidAt)}</span>
					</td>
					<td>
						{formatDate(payment.validFrom)}
						<span class="sub">до {formatDate(payment.validUntil)}</span>
					</td>
					<td>
						{payment.trainingsUsed}
						{#if plan}
							<span class="sub">
								/ {formatTrainingCount(plan.trainingCount, plan)}
							</span>
						{/if}
					</td>
					<td>
						<span class="status status-{payment.status}">
							{paymentStatusLabel(payment.status)}
						</span>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.stat {
		text-align: center;
	}

	.table-wrap {
		overflow-x: auto;
		padding: 0;
	}

	table {
		min-width: 700px;
	}

	td strong {
		display: block;
	}

	.sub {
		display: block;
		font-size: 0.78rem;
		color: var(--text-muted);
	}

	.status {
		display: inline-block;
		padding: 0.2rem 0.6rem;
		border-radius: 999px;
		font-size: 0.78rem;
		font-weight: 600;
	}

	.status-active {
		background: rgba(76, 175, 120, 0.15);
		color: #6fcf97;
		border: 1px solid rgba(76, 175, 120, 0.3);
	}

	.status-expired {
		background: rgba(224, 90, 90, 0.12);
		color: var(--danger);
		border: 1px solid rgba(224, 90, 90, 0.3);
	}

	.status-used_up {
		background: var(--accent-glow);
		color: var(--accent);
		border: 1px solid var(--accent-dim);
	}

	.client-link {
		color: inherit;
		text-decoration: none;
	}

	.client-link:hover strong {
		color: var(--accent);
	}
</style>
