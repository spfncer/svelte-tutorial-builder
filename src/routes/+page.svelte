<script lang="ts">
	import { onMount } from 'svelte';
	import { TutorialStore } from '../lib/TutorialStore.ts';
	import Tutorial from '$lib/Tutorial.svelte';
	import TestComp from './TestComp.svelte';

	let elem1: HTMLElement;
	let elem2: HTMLElement;
	let elem3: HTMLElement;

	let show4 = false;

	let tutorialComponent: Tutorial;

	onMount(() => {
		TutorialStore.addNonClickable(1, elem1, 'This is a box');
		TutorialStore.addNonClickable(2, elem2, 'This is a box 2');
		TutorialStore.addClickable(3, elem3, 'This is a box 3');
	});
</script>

<Tutorial bind:this={tutorialComponent}></Tutorial>
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

<button on:click={() => tutorialComponent.startTutorial()}>Start tutorial</button>

<style>
	h1,
	p {
		background-color: orange;
	}
</style>
