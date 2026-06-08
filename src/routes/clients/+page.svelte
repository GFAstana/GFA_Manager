<script lang="ts">
	import { clients } from '$lib/data';
	import { appStore } from '$lib/state/app-store';
	import { formatDate } from '$lib/utils';

	function visitCount(clientId: string): number {
		return $appStore.visits.filter((v) => v.clientId === clientId).length;
	}

	function hasActive(clientId: string): boolean {
		return $appStore.subscriptionPayments.some(
			(p) => p.clientId === clientId && p.status === 'active'
		);
	}
</script>

<h1 class="page-title">Клиенты</h1>
<p class="page-subtitle">{clients.length} записей · имя, контакт, дата заведения</p>

<div class="card table-wrap">
	<table>
		<thead>
			<tr>
				<th>#</th>
				<th>Имя</th>
				<th>Контакт</th>
				<th>Дата заведения</th>
				<th>Посещений</th>
				<th>Абонемент</th>
			</tr>
		</thead>
		<tbody>
			{#each clients as client, i}
				<tr class="clickable">
					<td class="muted">{i + 1}</td>
					<td>
						<a href="/clients/{client.id}" class="client-link">
							<strong>{client.name}</strong>
						</a>
					</td>
					<td>{client.contact}</td>
					<td>{formatDate(client.registeredAt)}</td>
					<td>{visitCount(client.id)}</td>
					<td>
						{#if hasActive(client.id)}
							<span class="status-active">Активен</span>
						{:else}
							<span class="status-none">—</span>
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.table-wrap {
		overflow-x: auto;
		padding: 0;
	}

	table {
		min-width: 500px;
	}

	.muted {
		color: var(--text-muted);
		width: 2rem;
	}

	.client-link {
		color: inherit;
		text-decoration: none;
	}

	.client-link:hover strong {
		color: var(--accent);
	}

	.clickable:hover {
		cursor: pointer;
	}

	.status-active {
		color: #6fcf97;
		font-size: 0.85rem;
		font-weight: 600;
	}

	.status-none {
		color: var(--text-muted);
	}
</style>
