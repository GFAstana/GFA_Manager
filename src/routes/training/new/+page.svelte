<script lang="ts">
	import { goto } from '$app/navigation';
	import { trainers } from '$lib/data';
	import {
		appStore,
		createTraining,
		getAvailableSlotsForDate,
		getEligibleForSession,
		type EligibleAthlete
	} from '$lib/state/app-store';
	import { DEMO_TODAY } from '$lib/data/demo';
	import { formatDate, formatTrainingCount, getWeekdayName } from '$lib/utils';

	let date = $state(DEMO_TODAY);
	let slotId = $state('');
	let selected = $state<Set<string>>(new Set());
	let error = $state('');
	let submitting = $state(false);

	let availableSlots = $derived.by(() => {
		$appStore;
		return getAvailableSlotsForDate(date);
	});

	const weekday = $derived(getWeekdayName(date));
	const slot = $derived(availableSlots.find((s) => s.id === slotId) ?? null);
	const trainer = $derived(
		slot ? trainers.find((t) => t.id === slot.defaultTrainerId) : null
	);
	const eligible = $derived(getEligibleForSession(date, slotId));

	$effect(() => {
		date;
		$appStore;
		const slots = getAvailableSlotsForDate(date);
		if (!slots.some((s) => s.id === slotId)) {
			slotId = slots[0]?.id ?? '';
		}
		selected = new Set();
	});

	function selectSlot(id: string) {
		slotId = id;
		selected = new Set();
	}

	function toggleAthlete(id: string) {
		const next = new Set(selected);
		if (next.has(id)) next.delete(id);
		else next.add(id);
		selected = next;
	}

	function selectAll() {
		selected = new Set(eligible.map((a) => a.client.id));
	}

	function remainingLabel(a: EligibleAthlete): string {
		return a.remaining === 'unlimited' ? 'безлимит' : `${a.remaining} осталось`;
	}

	function handleSubmit(e: Event) {
		e.preventDefault();
		error = '';
		submitting = true;

		const result = createTraining(date, slotId, [...selected]);
		submitting = false;

		if (!result.ok) {
			error = result.error ?? 'Ошибка';
			return;
		}

		goto('/training');
	}
</script>

<a href="/training" class="back">← Все тренировки</a>

<h1 class="page-title">Новая тренировка</h1>
<p class="page-subtitle">
	Слоты на {formatDate(date)} ({weekday}) · ещё не заведённые
</p>

<form class="form" onsubmit={handleSubmit}>
	<div class="card fields">
		<div class="field">
			<label for="date">Дата</label>
			<input id="date" type="date" bind:value={date} required />
		</div>
	</div>

	<div class="card slots-section">
		<h2>Доступные слоты</h2>
		{#if availableSlots.length === 0}
			<p class="empty">
				{#if weekday === 'Воскресенье'}
					В воскресенье тренировок нет в расписании
				{:else}
					На эту дату все слоты уже заведены или нет слотов в расписании
				{/if}
			</p>
		{:else}
			<div class="slots-grid">
				{#each availableSlots as s}
					{@const t = trainers.find((tr) => tr.id === s.defaultTrainerId)}
					<button
						type="button"
						class="slot-card"
						class:selected={slotId === s.id}
						onclick={() => selectSlot(s.id)}
					>
						<span class="slot-time">{s.time}</span>
						<strong>{s.direction}</strong>
						<span class="slot-meta">{s.hall} · {t?.fullName ?? '—'}</span>
					</button>
				{/each}
			</div>
		{/if}
	</div>

	{#if slot}
		<div class="card preview">
			<h2>Параметры тренировки</h2>
			<div class="preview-grid">
				<div><span class="label">Направление</span><strong>{slot.direction}</strong></div>
				<div><span class="label">Время</span><strong>{slot.time}</strong></div>
				<div><span class="label">Зал</span><strong>{slot.hall}</strong></div>
				<div>
					<span class="label">Тренер</span>
					<strong>{trainer?.fullName ?? '—'}</strong>
				</div>
			</div>
		</div>

		<div class="card athletes-section">
			<div class="athletes-header">
				<h2>Атлеты по абонементу</h2>
				{#if eligible.length > 0}
					<button type="button" class="btn-link" onclick={selectAll}>Выбрать всех</button>
				{/if}
			</div>

			{#if eligible.length === 0}
				<p class="empty">
					Нет атлетов с активным абонементом на эту дату или все уже отмечены
				</p>
			{:else}
				<ul class="athletes">
					{#each eligible as athlete}
						<li>
							<label class="athlete-row">
								<input
									type="checkbox"
									checked={selected.has(athlete.client.id)}
									onchange={() => toggleAthlete(athlete.client.id)}
								/>
								<span class="avatar">{athlete.client.name.charAt(0)}</span>
								<span class="info">
									<strong>{athlete.client.name}</strong>
									<span class="sub">
										{athlete.plan.name} · {remainingLabel(athlete)} ·
										{formatTrainingCount(athlete.plan.trainingCount, athlete.plan)}
									</span>
								</span>
							</label>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	{/if}

	{#if error}
		<p class="error">{error}</p>
	{/if}

	<div class="actions">
		<button
			type="submit"
			class="btn-primary"
			disabled={submitting || selected.size === 0 || !slotId}
		>
			Создать тренировку ({selected.size})
		</button>
		<a href="/training" class="btn-secondary">Отмена</a>
	</div>
</form>

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

	.form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.fields {
		max-width: 280px;
	}

	.field label {
		display: block;
		font-size: 0.8rem;
		color: var(--text-muted);
		margin-bottom: 0.35rem;
	}

	input {
		width: 100%;
		padding: 0.6rem 0.75rem;
		border-radius: var(--radius);
		border: 1px solid var(--border);
		background: var(--bg);
		color: var(--text);
		font: inherit;
	}

	input:focus {
		outline: none;
		border-color: var(--accent-dim);
	}

	.slots-section h2,
	.preview h2,
	.athletes-header h2 {
		font-size: 1rem;
		color: var(--accent);
		margin-bottom: 0.75rem;
	}

	.slots-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 0.75rem;
	}

	.slot-card {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.25rem;
		padding: 0.85rem 1rem;
		border-radius: var(--radius);
		border: 1px solid var(--border);
		background: var(--bg);
		color: var(--text);
		cursor: pointer;
		text-align: left;
		font: inherit;
		transition: border-color 0.15s, background 0.15s;
	}

	.slot-card:hover {
		border-color: var(--accent-dim);
		background: var(--bg-hover);
	}

	.slot-card.selected {
		border-color: var(--accent);
		background: var(--accent-glow);
	}

	.slot-time {
		font-size: 1.1rem;
		font-weight: 700;
		color: var(--accent);
	}

	.slot-card strong {
		font-size: 0.9rem;
	}

	.slot-meta {
		font-size: 0.78rem;
		color: var(--text-muted);
	}

	.preview-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 1rem;
	}

	.label {
		display: block;
		font-size: 0.78rem;
		color: var(--text-muted);
		margin-bottom: 0.15rem;
	}

	.athletes-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.75rem;
	}

	.btn-link {
		background: none;
		border: none;
		color: var(--accent);
		font-size: 0.85rem;
		cursor: pointer;
		padding: 0;
	}

	.btn-link:hover {
		text-decoration: underline;
	}

	.athletes {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.athlete-row {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.5rem;
		border-radius: var(--radius);
		cursor: pointer;
	}

	.athlete-row:hover {
		background: var(--bg-hover);
	}

	.athlete-row input {
		width: auto;
		accent-color: var(--accent);
	}

	.avatar {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: var(--accent-glow);
		border: 1px solid var(--accent-dim);
		color: var(--accent);
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 0.8rem;
		flex-shrink: 0;
	}

	.info strong {
		display: block;
		font-size: 0.9rem;
	}

	.sub {
		font-size: 0.78rem;
		color: var(--text-muted);
	}

	.empty {
		color: var(--text-muted);
		font-size: 0.9rem;
	}

	.error {
		color: var(--danger);
		font-size: 0.9rem;
	}

	.actions {
		display: flex;
		gap: 0.75rem;
		align-items: center;
	}

	.btn-primary {
		padding: 0.65rem 1.25rem;
		border-radius: var(--radius);
		border: none;
		background: var(--accent);
		color: var(--bg);
		font-weight: 600;
		cursor: pointer;
	}

	.btn-primary:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.btn-secondary {
		padding: 0.65rem 1.25rem;
		color: var(--text-muted);
		font-size: 0.9rem;
	}
</style>
