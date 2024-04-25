<script lang="ts">
	import ComputeLocation from './ComputeLocation.ts';
	import { TutorialStore, type TutorialItem } from './TutorialStore.ts';
	import { browser } from '$app/environment';
	import { tick } from 'svelte';

	export let show: number = 0;
	export let curtainZIndex: number = 50;

	let current = 0;
	let explanation: HTMLDivElement;

	let item: TutorialItem | undefined;

	$: showCurtain = show > 0 || current > 0;

	$: if (show > 0) {
		//logic for manually showing an item
		item = $TutorialStore.get(show);
		if (item) {
			addItemFocus(item.component);
		}
	}

	export function startTutorial() {
		showNext();
	}

	async function showNext() {
		removeItemFocus();
		current++;
		await tick(); //wait for the DOM to update in case the next item is not yet mounted
		item = $TutorialStore.get(current);
		while (!item) {
			current++;
			if (current > $TutorialStore.size) {
				current = 0;
				return;
			}
		}
		addItemFocus(item.component);
		if (item.clickToAdvance) {
			item.component.addEventListener('click', showNext, { once: true });
		}
	}

	async function showPrevious() {
		removeItemFocus();
		current--;
		await tick(); //wait for the DOM to update in case the next item is not yet mounted
		item = $TutorialStore.get(current);
		while (!item) {
			current--;
			if (current < 1) {
				current = 0;
				return;
			}
		}
		addItemFocus(item.component);
		if (item.clickToAdvance) {
			item.component.addEventListener('click', showNext, { once: true });
		}
	}

	function addItemFocus(item: HTMLElement) {
		const computedStyle = getComputedStyle(item);
		item.style.zIndex = (curtainZIndex + 1).toString();
		let positionValue = computedStyle.getPropertyValue('position');
		if (positionValue != 'absolute' && positionValue != 'fixed') {
			item.style.position = 'relative';
		}
		explanation.style.zIndex = (curtainZIndex + 2).toString();
		moveBox();
	}

	function removeItemFocus() {
		item?.component.style.removeProperty('z-index');
		item?.component.style.removeProperty('position');
	}

	function moveBox() {
		if (item) {
			let positions = ComputeLocation(item.component, explanation);
			explanation.style.left = positions.x + 'px';
			explanation.style.top = positions.y + 'px';
		}
	}
	if (browser) window.addEventListener('resize', moveBox);
</script>

{#if showCurtain}
	<div class="curtain" style={'z-index:' + curtainZIndex}></div>
{/if}

<div class={showCurtain ? 'explanation shown' : 'explanation'} bind:this={explanation}>
	{item?.description}
	<div class="controls">
		{#if item?.clickToAdvance}
			<p>Click the button to continue.</p>
		{:else}
			<button class="control" on:click={showPrevious}>Previous</button>
			<button class="control" on:click={showNext}>Next</button>
		{/if}
	</div>
</div>

<style>
	.curtain {
		position: fixed;
		left: 0;
		top: 0;
		width: 100dvw;
		height: 100dvh;
		background-color: #000;
		opacity: 0.5;
	}
	.explanation {
		display: none;
		position: absolute;
		max-width: 400px;
		background-color: #fff;
		border-radius: 4px;
		padding: 10px;
	}
	.explanation.shown {
		display: block;
	}
	.controls {
		margin-top: 10px;
		display: flex;
		justify-content: center;
	}
	.control {
		margin: 0 5px;
	}
</style>
