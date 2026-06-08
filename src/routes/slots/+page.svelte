<script lang="ts">
	import { timeSlots, trainers } from '$lib/data';

	function trainerName(id: string): string {
		return trainers.find((t) => t.id === id)?.fullName ?? '—';
	}

	const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
</script>

<h1 class="page-title">Временные слоты</h1>
<p class="page-subtitle">Расписание тренировок по дням недели</p>

{#each days as day}
	{@const daySlots = timeSlots.filter((s) => s.day === day)}
	{#if daySlots.length > 0}
		<section class="day-section">
			<h2>{day}</h2>
			<div class="card table-wrap">
				<table>
					<thead>
						<tr>
							<th>Время</th>
							<th>Направление</th>
							<th>Зал</th>
							<th>Тренер</th>
						</tr>
					</thead>
					<tbody>
						{#each daySlots as slot}
							<tr>
								<td><strong>{slot.time}</strong></td>
								<td><span class="badge">{slot.direction}</span></td>
								<td>{slot.hall}</td>
								<td>
									<a href="/trainers/{slot.defaultTrainerId}" class="trainer-link">
										{trainerName(slot.defaultTrainerId)}
									</a>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</section>
	{/if}
{/each}

<style>
	.day-section {
		margin-bottom: 1.5rem;
	}

	h2 {
		font-size: 1rem;
		color: var(--accent);
		margin-bottom: 0.5rem;
	}

	.table-wrap {
		overflow-x: auto;
		padding: 0;
	}

	table {
		min-width: 500px;
	}

	.trainer-link {
		color: inherit;
		text-decoration: none;
	}

	.trainer-link:hover {
		color: var(--accent);
	}
</style>
