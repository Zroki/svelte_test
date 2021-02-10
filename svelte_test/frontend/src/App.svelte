<script>
	let users = [];
	let errorMessage = "";
	let load = false;
	let currentPage = '';

	async function sleep() {
		return new Promise((res) => {
			setTimeout(() => {
				res(true);
			}, 800);
		});
	}

	async function getUsers(page) {
		load = true;
		currentPage = page;
		await sleep();
		const request = await fetch(`/users?page=${page}`);
		try {
			const response = await request.json();

			if (response.success) {
				users = response.data;
			} else {
				users = [];
				errorMessage = `Нет данных о пользователях на странице ${page}`;

				setTimeout(() => {
					errorMessage = "";
				}, 2000);
			}

			load = false;
		} catch (error) {
			load = false;
			users = [];
			errorMessage = "Ошибка получения данных";

			setTimeout(() => {
				errorMessage = "";
			}, 2000);
		}
	}
</script>

<div class="main">
	{#if load}
		<span>Загрузка данных...</span>
	{:else}
		<div class="users_view">
			{#each users as user, index (index)}
				<div class="user">
					<span class="name">Имя: {user.name}</span>
					<span class="money">Бюджет: {user.balance}</span>
					<span class="age">Возраст: {user.age}</span>
				</div>
			{/each}
			{#if errorMessage}
				<span class="error">{errorMessage}</span>
			{/if}
		</div>
	{/if}
	{#if currentPage}
		<div class="current_page">Текущая страница: {currentPage}</div>
	{/if}
	<div class="pages">
		<div class="page" on:click={() => getUsers(1)}>1</div>
		<div class="page" on:click={() => getUsers(2)}>2</div>
		<div class="page" on:click={() => getUsers(3)}>3</div>
		<div class="page" on:click={() => getUsers(4)}>4</div>
		<div class="page" on:click={() => getUsers(5)}>5</div>
	</div>
</div>

<style>
	.users_view {
		display: flex;
		flex-direction: column;
		width: 20%;
	}

	.current_page {
		color: blue;
		border: 1px solid #898989;
		padding: 3px;
		border-radius: 3px;
		margin: 4px;
		display: inline-block;
	}

	.pages {
		display: inline-flex;
		justify-content: space-evenly;
	}

	.page {
		padding: 5px;
		border: 1px solid black;
		border-radius: 5px;
		font-size: 24px;
		cursor: pointer;
	}

	.user {
		border: 1px solid black;
		display: flex;
		flex-direction: column;
		margin: 5px;
		padding: 5px;
		border-radius: 3px;
		background-color: #fefefe;
		box-shadow: black 0px 0px 11px;
	}

	.error {
		color: red;
		text-shadow: 0 0 1px black;
		font-size: 25px;
	}
</style>
