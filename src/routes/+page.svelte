<script lang="ts">
	import { onMount } from 'svelte';
	import { TutorialStore } from '../lib/TutorialStore';
	import Tutorial from '$lib/Tutorial.svelte';
	import TestComp from './TestComp.svelte';
	import { Paused } from '$lib';
	
	let elem1: HTMLElement;
	let elem2: HTMLElement;
	let elem3: HTMLElement;

	let show4 = false;

	let bound: number = 0;

	let showTutorial = false;

	function onCompletion() {
		showTutorial = false;
	}

	onMount(() => {
		TutorialStore.addTextOnly(1, "Welcome to the tutorial. Use the buttons below to navigate, unless prompted otherwise.")
		TutorialStore.addNonClickable(2, elem1, 'This is a box');
		TutorialStore.addNonClickable(3, elem2, 'This is a box 2');
		TutorialStore.addClickable(5, elem3, 'This is a box 3');
		TutorialStore.addPause(
			4,
			'To continue the tutorial, increase the counter value to 5!',
			prePause
		);
		TutorialStore.addTextOnly(7, "You've completed the tutorial! Click Next to close.")
	});

	$: if ($Paused) {
		if (bound > 4) Paused.unpause();
	}

	function prePause() {
		bound = 0;
	}

</script>

{#if showTutorial}
	<Tutorial {onCompletion}></Tutorial>
{/if}
<h1 bind:this={elem1}>Welcome to your library project</h1>
<p bind:this={elem2}>
	Create your package using @sveltejs/package and preview/showcase your work with SvelteKit
</p>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<p
	bind:this={elem3}
	on:click={() => {
		show4 = true;
	}}
>
	Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
{#if show4}
	<TestComp></TestComp>
{/if}

<input type="number" bind:value={bound} />

<button on:click={() => (showTutorial = true)}>{showTutorial ? "Tutorial in Progress" : "Start Tutorial"}</button>

<style>
	h1,
	p {
		background-color: orange;
	}
</style>
