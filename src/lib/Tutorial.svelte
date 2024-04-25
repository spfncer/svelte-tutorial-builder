<script lang="ts">
	import ComputeLocation from './ComputeLocation.ts';
	import { TutorialStore } from './TutorialStore.ts';
	import { browser } from '$app/environment';

	export let show: string = '';
	export let curtainZIndex: number = 50;

	let current = -1;
	let explanation: HTMLDivElement;
	let item: HTMLElement | undefined;

	$: {
		//logic for manually showing an item
		item = $TutorialStore.get(show);
		if (item) {
			addItemFocus(item);
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

	function removeItemFocus(item: HTMLElement) {
		item.style.removeProperty('z-index');
		item.style.removeProperty('position');
	}

	function moveBox() {
		if (item) {
			let positions = ComputeLocation(item, explanation);
			explanation.style.left = positions.x + 'px';
			explanation.style.top = positions.y + 'px';
		}
	}
	if(browser)
		window.addEventListener("resize", moveBox);


	
</script>

{#if show !== ''}
	<div class="curtain" style={'z-index:' + curtainZIndex}></div>
{/if}

<div class={show !== '' ? 'explanation shown' : 'explanation'} bind:this={explanation}>
	I don't really care about WHAT??
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
</style>
