<script lang="ts">
	import { getTrainingSessions } from '$lib/training-sessions';
	import { appStore } from '$lib/state/app-store';
	import { formatDate } from '$lib/utils';

	let sessions = $derived.by(() => {
		$appStore;
		return getTrainingSessions();
	});
	let totalMarked = $derived(sessions.reduce((sum, s) => sum + s.attendees.length, 0));
</script>

<div class="page-header">
	<div>
		<h1 class="page-title">Тренировки</h1>
		<p class="page-subtitle">
			{sessions.length} тренировок · {totalMarked} отметок посещения атлетами
		</p>
	</div>
	<a href="/training/new" class="btn-primary">+ Новая тренировка</a>
</div>

<div class="stats">
	<div class="card stat">
		<div class="stat-value">{sessions.length}</div>
		<div class="stat-label">Тренировок</div>
	</div>
	<div class="card stat">
		<div class="stat-value">{totalMarked}</div>
		<div class="stat-label">Всего отметок</div>
	</div>
	<div class="card stat">
		<div class="stat-value">
			{sessions.filter((s) => s.attendees.length > 1).length}
		</div>
		<div class="stat-label">Групповых</div>
	</div>
</div>

<div class="sessions">
	{#each sessions as session}
		<div class="card session">
			<div class="session-header">
				<div>
					<h2>{session.direction}</h2>
					<p class="when">
						{formatDate(session.date)} · {session.day} · {session.time}
					</p>
				</div>
				<span class="count">{session.attendees.length} атлетов</span>
			</div>

			<div class="meta">
				<span>{session.hall}</span>
				<span>·</span>
				<a href="/trainers/{session.trainerId}" class="trainer-link">{session.trainerName}</a>
			</div>

			{#if session.attendees.length === 0}
				<p class="empty">Никто не отметился</p>
			{:else}
				<ul class="athletes">
					{#each session.attendees as athlete}
						<li>
							<a href="/clients/{athlete.clientId}" class="athlete-link">
								<span class="avatar">{athlete.clientName.charAt(0)}</span>
								<span class="name">{athlete.clientName}</span>
							</a>
							<span class="plan">{athlete.planName}</span>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	{/each}
</div>

<style>
	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
		margin-bottom: 0.25rem;
	}

	.page-subtitle {
		margin-bottom: 1.5rem;
	}

	.btn-primary {
		padding: 0.55rem 1rem;
		border-radius: var(--radius);
		background: var(--accent);
		color: var(--bg);
		font-weight: 600;
		font-size: 0.9rem;
		text-decoration: none;
		white-space: nowrap;
	}

	.btn-primary:hover {
		opacity: 0.9;
		text-decoration: none;
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

	.sessions {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.session-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
		margin-bottom: 0.5rem;
	}

	h2 {
		font-size: 1.05rem;
		color: var(--accent);
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

	.meta {
		font-size: 0.85rem;
		color: var(--text-muted);
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		margin-bottom: 0.75rem;
		padding-bottom: 0.75rem;
		border-bottom: 1px solid var(--border);
	}

	.athletes {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.athletes li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.75rem;
		padding: 0.35rem 0;
	}

	.athlete-link {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		color: inherit;
		text-decoration: none;
	}

	.athlete-link:hover .name {
		color: var(--accent);
	}

	.avatar {
		width: 28px;
		height: 28px;
		border-radius: 50%;
		background: var(--bg-hover);
		border: 1px solid var(--border);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.75rem;
		font-weight: 700;
		color: var(--accent);
		flex-shrink: 0;
	}

	.name {
		font-weight: 600;
		font-size: 0.9rem;
	}

	.plan {
		font-size: 0.78rem;
		color: var(--text-muted);
	}

	.empty {
		color: var(--text-muted);
		font-size: 0.9rem;
	}

	.trainer-link {
		color: var(--text-muted);
		text-decoration: none;
	}

	.trainer-link:hover {
		color: var(--accent);
	}

	@media (max-width: 600px) {
		.page-header {
			flex-direction: column;
		}
	}
</style>
