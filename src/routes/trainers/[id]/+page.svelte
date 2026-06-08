<script lang="ts">
	import type { PageData } from './$types';
	import { getTrainerProfile } from '$lib/trainer-profile';
	import { appStore } from '$lib/state/app-store';
	import { formatDate } from '$lib/utils';

	let { data }: { data: PageData } = $props();
	const profile = $derived.by(() => {
		$appStore;
		return getTrainerProfile(data.profile.trainer.id) ?? data.profile;
	});
</script>

<a href="/trainers" class="back">← Все тренеры</a>

<div class="header card">
	<div class="avatar">{profile.trainer.fullName.charAt(0)}</div>
	<div class="info">
		<h1 class="page-title">{profile.trainer.fullName}</h1>
		<p class="meta">Тренер HEMA · GFA Astana</p>
		<div class="tags">
			{#each profile.directions as dir}
				<span class="badge">{dir}</span>
			{/each}
		</div>
	</div>
</div>

<div class="stats">
	<div class="card stat">
		<div class="stat-value">{profile.stats.weeklySlots}</div>
		<div class="stat-label">Слотов в неделю</div>
	</div>
	<div class="card stat">
		<div class="stat-value">{profile.stats.sessionsCount}</div>
		<div class="stat-label">Проведено тренировок</div>
	</div>
	<div class="card stat">
		<div class="stat-value">{profile.stats.uniqueAthletes}</div>
		<div class="stat-label">Уникальных атлетов</div>
	</div>
	<div class="card stat">
		<div class="stat-value">{profile.stats.totalAttendeeMarks}</div>
		<div class="stat-label">Отметок посещения</div>
	</div>
</div>

<section class="section">
	<h2>Расписание слотов</h2>
	{#if profile.slots.length === 0}
		<div class="card empty">Слотов не назначено</div>
	{:else}
		<div class="card table-wrap">
			<table>
				<thead>
					<tr>
						<th>День</th>
						<th>Время</th>
						<th>Направление</th>
						<th>Зал</th>
					</tr>
				</thead>
				<tbody>
					{#each profile.slots as slot}
						<tr>
							<td>{slot.day}</td>
							<td><strong>{slot.time}</strong></td>
							<td><span class="badge">{slot.direction}</span></td>
							<td>{slot.hall}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</section>

<section class="section">
	<h2>Проведённые тренировки</h2>
	{#if profile.sessions.length === 0}
		<div class="card empty">Тренировок с отметками пока нет</div>
	{:else}
		<div class="sessions">
			{#each profile.sessions as session}
				<div class="card session">
					<div class="session-header">
						<div>
							<strong>{session.direction}</strong>
							<p class="when">
								{formatDate(session.date)} · {session.day} · {session.time} · {session.hall}
							</p>
						</div>
						<span class="count">{session.attendees.length} атлетов</span>
					</div>
					{#if session.attendees.length > 0}
						<ul class="athletes">
							{#each session.attendees as athlete}
								<li>
									<a href="/clients/{athlete.clientId}">{athlete.clientName}</a>
								</li>
							{/each}
						</ul>
					{/if}
				</div>
			{/each}
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
		align-items: flex-start;
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
		margin-bottom: 0.75rem;
	}

	.tags {
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

	.section {
		margin-bottom: 2rem;
	}

	.section h2 {
		font-size: 1rem;
		color: var(--accent);
		margin-bottom: 0.75rem;
	}

	.table-wrap {
		overflow-x: auto;
		padding: 0;
	}

	table {
		min-width: 480px;
	}

	.empty {
		color: var(--text-muted);
		text-align: center;
	}

	.sessions {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.session-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
		margin-bottom: 0.5rem;
	}

	.when {
		font-size: 0.85rem;
		color: var(--text-muted);
		margin-top: 0.15rem;
	}

	.count {
		white-space: nowrap;
		padding: 0.25rem 0.7rem;
		border-radius: 999px;
		font-size: 0.8rem;
		font-weight: 600;
		background: var(--accent-glow);
		color: var(--accent);
		border: 1px solid var(--accent-dim);
	}

	.athletes {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem 1rem;
		padding-top: 0.5rem;
		border-top: 1px solid var(--border);
	}

	.athletes a {
		font-size: 0.9rem;
		color: var(--text);
		text-decoration: none;
	}

	.athletes a:hover {
		color: var(--accent);
	}
</style>
