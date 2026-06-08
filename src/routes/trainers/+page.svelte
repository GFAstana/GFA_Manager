<script lang="ts">
	import { trainers, timeSlots } from '$lib/data';
	import { appStore } from '$lib/state/app-store';
	import { getTrainingSessions } from '$lib/training-sessions';

	let sessions = $derived.by(() => {
		$appStore;
		return getTrainingSessions();
	});

	function slotCount(trainerId: string): number {
		return timeSlots.filter((s) => s.defaultTrainerId === trainerId).length;
	}

	function sessionCount(trainerId: string): number {
		const slotIds = new Set(
			timeSlots.filter((s) => s.defaultTrainerId === trainerId).map((s) => s.id)
		);
		return sessions.filter((s) => slotIds.has(s.slotId)).length;
	}

	function directions(trainerId: string): string[] {
		return [
			...new Set(
				timeSlots.filter((s) => s.defaultTrainerId === trainerId).map((s) => s.direction)
			)
		];
	}
</script>

<h1 class="page-title">Тренеры</h1>
<p class="page-subtitle">{trainers.length} тренеров клуба</p>

<div class="grid">
	{#each trainers as trainer}
		<a href="/trainers/{trainer.id}" class="card trainer">
			<div class="avatar">{trainer.fullName.charAt(0)}</div>
			<div class="body">
				<strong>{trainer.fullName}</strong>
				<span class="role">Тренер HEMA</span>
				<div class="tags">
					{#each directions(trainer.id) as dir}
						<span class="badge">{dir}</span>
					{/each}
				</div>
				<div class="nums">
					<span>{slotCount(trainer.id)} слотов</span>
					<span>·</span>
					<span>{sessionCount(trainer.id)} тренировок</span>
				</div>
			</div>
		</a>
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1rem;
	}

	.trainer {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		color: inherit;
		text-decoration: none;
		transition: border-color 0.15s;
	}

	.trainer:hover {
		border-color: var(--accent-dim);
	}

	.avatar {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background: var(--accent-glow);
		border: 2px solid var(--accent-dim);
		color: var(--accent);
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 1.1rem;
		flex-shrink: 0;
	}

	.body strong {
		display: block;
		margin-bottom: 0.15rem;
	}

	.trainer:hover strong {
		color: var(--accent);
	}

	.role {
		font-size: 0.8rem;
		color: var(--text-muted);
		display: block;
		margin-bottom: 0.5rem;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.3rem;
		margin-bottom: 0.5rem;
	}

	.nums {
		font-size: 0.8rem;
		color: var(--text-muted);
		display: flex;
		gap: 0.35rem;
	}
</style>
