<script lang="ts">
	import { subscriptionPlans } from '$lib/data';
	import { formatMoney, formatTrainingCount, formatValidityDays } from '$lib/utils';
</script>

<h1 class="page-title">Абонементы</h1>
<p class="page-subtitle">
	Настраиваемые тарифы · название, стоимость, количество тренировок, срок действия
</p>

<div class="grid">
	{#each subscriptionPlans as plan}
		<div class="card plan">
			<div class="plan-header">
				<h2>{plan.name}</h2>
				<span class="price">{formatMoney(plan.price)}</span>
			</div>
			<ul class="conditions">
				<li>
					<span class="label">Тренировок</span>
					<span>{formatTrainingCount(plan.trainingCount, plan)}</span>
				</li>
				<li>
					<span class="label">Срок действия</span>
					<span>{formatValidityDays(plan.validityDays)}</span>
				</li>
				<li>
					<span class="label">Цена за тренировку</span>
					<span>
						{plan.trainingCount >= 999
							? '—'
							: formatMoney(Math.round(plan.price / plan.trainingCount))}
					</span>
				</li>
			</ul>
		</div>
	{/each}
</div>

<div class="card table-wrap">
	<h2 class="table-title">Сводная таблица</h2>
	<table>
		<thead>
			<tr>
				<th>Название</th>
				<th>Стоимость</th>
				<th>Тренировок</th>
				<th>Срок</th>
			</tr>
		</thead>
		<tbody>
			{#each subscriptionPlans as plan}
				<tr>
					<td><strong>{plan.name}</strong></td>
					<td>{formatMoney(plan.price)}</td>
					<td>{formatTrainingCount(plan.trainingCount, plan)}</td>
					<td>{formatValidityDays(plan.validityDays)}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.plan-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	h2 {
		font-size: 1rem;
		color: var(--accent);
	}

	.price {
		font-weight: 700;
		font-size: 1.1rem;
		white-space: nowrap;
	}

	.conditions {
		list-style: none;
	}

	.conditions li {
		display: flex;
		justify-content: space-between;
		padding: 0.4rem 0;
		border-bottom: 1px solid var(--border);
		font-size: 0.9rem;
	}

	.conditions li:last-child {
		border-bottom: none;
	}

	.label {
		color: var(--text-muted);
	}

	.table-title {
		font-size: 1rem;
		color: var(--accent);
		margin-bottom: 1rem;
		padding: 1.25rem 1.25rem 0;
	}

	.table-wrap {
		overflow-x: auto;
		padding: 0 0 0.5rem;
	}
</style>
