<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';

	const nav = [
		{ href: '/', label: 'Главная' },
		{ href: '/clients', label: 'Клиенты' },
		{ href: '/trainers', label: 'Тренеры' },
		{ href: '/slots', label: 'Слоты' },
		{ href: '/training', label: 'Тренировки' },
		{ href: '/plans', label: 'Абонементы' },
		{ href: '/payments', label: 'Оплаты' }
	];
</script>

<div class="app">
	<header>
		<div class="brand">
			<span class="logo">⚔</span>
			<div>
				<strong>GFA Manager</strong>
				<span class="tagline">HEMA клуб · Астана</span>
			</div>
		</div>
		<nav>
			{#each nav as item}
				<a href={item.href} class:active={$page.url.pathname === item.href}>
					{item.label}
				</a>
			{/each}
		</nav>
	</header>

	<main>
		<slot />
	</main>

	<footer>
		Локальная разработка · данные в памяти
	</footer>
</div>

<style>
	.app {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 2rem;
		border-bottom: 1px solid var(--border);
		background: var(--bg-card);
	}

	.brand {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.logo {
		font-size: 1.5rem;
	}

	.brand strong {
		display: block;
		font-size: 1.1rem;
	}

	.tagline {
		font-size: 0.75rem;
		color: var(--text-muted);
	}

	nav {
		display: flex;
		gap: 0.5rem;
	}

	nav a {
		padding: 0.5rem 1rem;
		border-radius: var(--radius);
		color: var(--text-muted);
		text-decoration: none;
		font-size: 0.9rem;
		transition: background 0.15s, color 0.15s;
	}

	nav a:hover {
		background: var(--bg-hover);
		color: var(--text);
		text-decoration: none;
	}

	nav a.active {
		background: var(--accent-glow);
		color: var(--accent);
	}

	main {
		flex: 1;
		padding: 2rem;
		max-width: 1100px;
		width: 100%;
		margin: 0 auto;
	}

	footer {
		text-align: center;
		padding: 1rem;
		color: var(--text-muted);
		font-size: 0.8rem;
		border-top: 1px solid var(--border);
	}
</style>
