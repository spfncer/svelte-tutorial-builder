<script lang="ts">
	import { onMount } from 'svelte';
	import { TutorialStore } from '../lib/TutorialStore';

	let elem4: HTMLElement;

	onMount(() => TutorialStore.addNonClickable(6, elem4, 'This is a box 4'));
</script>

<div bind:this={elem4}>This item wasn't here before!!</div>

<style>
	div {
		background-color: lightblue;
	}
</style>
