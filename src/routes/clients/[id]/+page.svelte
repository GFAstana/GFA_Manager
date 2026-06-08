<script lang="ts">
	import type { PageData } from './$types';
	import { getClientProfile } from '$lib/client-profile';
	import { appStore } from '$lib/state/app-store';
	import {
		formatDate,
		formatMoney,
		formatTrainingCount,
		paymentStatusLabel
	} from '$lib/utils';

	let { data }: { data: PageData } = $props();
	const profile = $derived.by(() => {
		$appStore;
		return getClientProfile(data.profile.client.id) ?? data.profile;
	});
</script>

<a href="/clients" class="back">← Все клиенты</a>

<div class="header card">
	<div class="avatar">{profile.client.name.charAt(0)}</div>
	<div class="info">
		<h1 class="page-title">{profile.client.name}</h1>
		<p class="meta">
			<span>{profile.client.contact}</span>
			<span>·</span>
			<span>Клиент с {formatDate(profile.client.registeredAt)}</span>
			<span>·</span>
			<span>{profile.stats.daysInClub} дн. в клубе</span>
		</p>
	</div>
</div>

<div class="stats">
	<div class="card stat">
		<div class="stat-value">{profile.stats.totalVisits}</div>
		<div class="stat-label">Посещений</div>
	</div>
	<div class="card stat">
		<div class="stat-value">{formatMoney(profile.stats.totalPaid)}</div>
		<div class="stat-label">Всего оплачено</div>
	</div>
	<div class="card stat">
		<div class="stat-value">{profile.payments.length}</div>
		<div class="stat-label">Абонементов</div>
	</div>
	<div class="card stat">
		<div class="stat-value">{profile.stats.remainingTrainings}</div>
		<div class="stat-label">Осталось тренировок</div>
	</div>
</div>

{#if profile.activePayment}
	{@const activePayment = profile.activePayment}
	<div class="card active-sub">
		<h2>Текущий абонемент</h2>
		<div class="active-grid">
			<div>
				<span class="label">Тариф</span>
				<strong>{activePayment.plan.name}</strong>
			</div>
			<div>
				<span class="label">Статус</span>
				<span class="status status-active">{paymentStatusLabel(activePayment.status)}</span>
			</div>
			<div>
				<span class="label">Использовано</span>
				<strong>
					{activePayment.trainingsUsed}
					/ {formatTrainingCount(activePayment.plan.trainingCount, activePayment.plan)}
				</strong>
			</div>
			<div>
				<span class="label">Действует до</span>
				<strong>{formatDate(activePayment.validUntil)}</strong>
			</div>
		</div>
		<div class="progress-wrap">
			{#if activePayment.plan.trainingCount < 999}
				{@const pct = Math.round(
					(activePayment.trainingsUsed / activePayment.plan.trainingCount) * 100
				)}
				<div class="progress-bar">
					<div class="progress-fill" style="width: {pct}%"></div>
				</div>
				<span class="progress-label">{pct}% использовано</span>
			{:else}
				<span class="progress-label">Безлимитный абонемент</span>
			{/if}
		</div>
	</div>
{:else}
	<div class="card no-active">
		Нет активного абонемента
	</div>
{/if}

<section class="section">
	<h2>История оплат</h2>
	<div class="card table-wrap">
		<table>
			<thead>
				<tr>
					<th>Тариф</th>
					<th>Сумма</th>
					<th>Дата оплаты</th>
					<th>Период</th>
					<th>Посещений</th>
					<th>Статус</th>
				</tr>
			</thead>
			<tbody>
				{#each profile.payments as payment}
					<tr>
						<td><strong>{payment.plan.name}</strong></td>
						<td>{formatMoney(payment.amount)}</td>
						<td>{formatDate(payment.paidAt)}</td>
						<td>
							{formatDate(payment.validFrom)} — {formatDate(payment.validUntil)}
						</td>
						<td>
							{payment.visitCount}
							<span class="sub">
								/ {formatTrainingCount(payment.plan.trainingCount, payment.plan)}
							</span>
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
</section>

<section class="section">
	<h2>Посещения</h2>
	{#if profile.visits.length === 0}
		<div class="card empty">Посещений пока нет</div>
	{:else}
		<div class="card table-wrap">
			<table>
				<thead>
					<tr>
						<th>Дата</th>
						<th>Направление</th>
						<th>Время</th>
						<th>Зал</th>
						<th>Тренер</th>
						<th>Абонемент</th>
					</tr>
				</thead>
				<tbody>
					{#each profile.visits as visit}
						<tr>
							<td><strong>{formatDate(visit.date)}</strong></td>
							<td><span class="badge">{visit.direction}</span></td>
							<td>{visit.time}</td>
							<td>{visit.hall}</td>
							<td>{visit.trainerName}</td>
							<td class="sub">{visit.planName}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</section>

<style>
	.back {
		display: inline-block;
		margin-bottom: 1rem;
		font-size: 0.9rem;
		color: var(--text-muted);
	}

	.back:hover {
		color: var(--accent);
	}

	.header {
		display: flex;
		align-items: center;
		gap: 1.25rem;
		margin-bottom: 1.5rem;
	}

	.avatar {
		width: 64px;
		height: 64px;
		border-radius: 50%;
		background: var(--accent-glow);
		border: 2px solid var(--accent-dim);
		color: var(--accent);
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 1.5rem;
		flex-shrink: 0;
	}

	.page-title {
		margin-bottom: 0.25rem;
	}

	.meta {
		color: var(--text-muted);
		font-size: 0.9rem;
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.stat {
		text-align: center;
	}

	.active-sub h2,
	.section h2 {
		font-size: 1rem;
		color: var(--accent);
		margin-bottom: 1rem;
	}

	.active-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.label {
		display: block;
		font-size: 0.78rem;
		color: var(--text-muted);
		margin-bottom: 0.2rem;
	}

	.no-active {
		color: var(--text-muted);
		text-align: center;
		margin-bottom: 1.5rem;
	}

	.progress-wrap {
		margin-top: 0.5rem;
	}

	.progress-bar {
		height: 6px;
		background: var(--border);
		border-radius: 3px;
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background: var(--accent);
		border-radius: 3px;
		transition: width 0.3s;
	}

	.progress-label {
		font-size: 0.78rem;
		color: var(--text-muted);
		margin-top: 0.3rem;
		display: block;
	}

	.section {
		margin-bottom: 2rem;
	}

	.table-wrap {
		overflow-x: auto;
		padding: 0;
	}

	table {
		min-width: 600px;
	}

	.sub {
		font-size: 0.78rem;
		color: var(--text-muted);
	}

	.empty {
		color: var(--text-muted);
		text-align: center;
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
</style>
