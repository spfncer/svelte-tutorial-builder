<script lang="ts">
	import ComputeLocation from './ComputeLocation';
	import { Paused } from './Paused.ts';
	import { TutorialStore, type TutorialItem } from './TutorialStore';
	import { onMount, tick } from 'svelte';

	export let show: number = 0;
	export let curtainZIndex: number = 50;
	export let autoStart: boolean = true;
	export let buttonClasses: string = '';
	export let boxClasses: string = '';
	export let clickableMessage: string = 'Click it to continue.';

	let current = 0;
	let suspended = 0;
	let explanation: HTMLDivElement;
	let aboutToClose = false;
	let browser = false;

	let item: TutorialItem | undefined;

	$: showCurtain = show > 0 || current > 0;

	$:console.log("Current", current);
	$:console.log("Suspended", suspended);

	$: if (show > 0) {
		//logic for manually showing an item
		item = $TutorialStore.get(show);
		if (item?.component) {
			addItemFocus(item.component);
		}
	}

	$: if (!$Paused && suspended > 0) {
		current = suspended + 1;
		suspended = 0;
		item = $TutorialStore.get(current);
		if (item && item.component) {
			addItemFocus(item.component);
			if (item.clickToAdvance) {
				item.component.addEventListener(
					'click',
					() => {
						showNext(false);
					},
					{ once: true }
				);
			}
		}
	}

	onMount(() => {
		if (autoStart) {
			//start tutorial automatically
			showNext(false);
		}

		//check if the browser is available
		browser = typeof window !== 'undefined';
		console.log('browser', browser);
		//end onMount
	});

	export function startTutorial() {
		showNext(false);
	}

	async function showNext(bypass: boolean) {
		removeItemFocus();
		if (current == 0 || item?.component || bypass) {
			//the current thing open is an HTML element, just advance
			current++;
			await tick(); //wait for the DOM to update in case the next item is not yet mounted
			item = $TutorialStore.get(current);
			if (!item) {
				current = 0;
				return;
			}
			if (item.component) {
				//new item is another HTML element
				addItemFocus(item.component);
				if (item.clickToAdvance) {
					item.component.addEventListener(
						'click',
						() => {
							showNext(false);
						},
						{ once: true }
					);
				}
			} else {
				//new item is a pause explanation
				moveBoxCenter();
			}
		} else {
			//the current thing open is an explanation for a pause, so now pause
			suspended = current;
			current = 0;
			//setup monitoring for when condition is true
			Paused.pause();
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
			item.component.addEventListener(
				'click',
				() => {
					showNext(false);
				},
				{ once: true }
			);
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
		if (typeof item?.component == 'object') {
			item?.component.style.removeProperty('z-index');
			item?.component.style.removeProperty('position');
		}
	}

	function moveBox() {
		if (item && typeof item.component == 'object') {
			let positions = ComputeLocation(item.component, explanation);
			explanation.style.left = positions.x + 'px';
			explanation.style.top = positions.y + 'px';
		}
	}
	if (browser) window.addEventListener('resize', moveBox);

	function handleBackDropClick() {
		if (showCurtain && !aboutToClose) {
			aboutToClose = true;
			moveBoxCenter();
		}
	}

	function moveBoxCenter() {
		explanation.style.top = window.innerHeight / 2 - explanation.offsetHeight / 2 + 'px';
		explanation.style.left = window.innerWidth / 2 - explanation.offsetWidth / 2 + 'px';
	}

	function handleCancelClose() {
		aboutToClose = false;
		moveBox();
	}
</script>

{#if showCurtain}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="curtain"
		style={'z-index:' + curtainZIndex}
		on:click|stopPropagation={handleBackDropClick}
	></div>
{/if}

<!-- Below is the floating explanations box! -->
<div
	class={(showCurtain ? 'explanation show ' : 'explanation ') + boxClasses}
	bind:this={explanation}
>
	{#if !aboutToClose}
		<!-- Normal behavior for floating explanations box -->
		{item?.description}
		<div class="controls">
			<button class="control" on:click={showPrevious}>Previous</button>
			{#if item?.clickToAdvance}
				<p class="click2">{clickableMessage}</p>
			{:else}
				<button
					class={'control ' + buttonClasses}
					on:click={() => {
						showNext(false);
					}}>Next</button
				>
			{/if}
		</div>
	{:else}
		<!-- User clicked backdrop, prompt if they want to close -->
		Do you want to exit the tutorial?
		<div class="controls">
			<button class={'control ' + buttonClasses} on:click={handleCancelClose}>No</button>
			<button
				class={'control ' + buttonClasses}
				on:click={() => {
					aboutToClose = false;
					current = 0;
				}}>Yes</button
			>
		</div>
	{/if}
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
		transition:
			top 0.4s ease,
			left 0.4s ease;
	}
	.explanation.show {
		display: block;
	}
	.controls {
		margin-top: 10px;
		display: flex;
		justify-content: center;
		width: 100%;
		&.screenTop {
			position: absolute;
			top: 5dvh;
		}
		&.screenBottom {
			position: absolute;
			bottom: 5dvh;
		}
	}
	.control {
		margin: 0 5px;
		padding: 3px;
		background-color: transparent;
		outline: 1px solid #000;
		border: none;
		transition: outline 0.4s ease;
		z-index: inherit;
	}
	.control:hover,
	.control:focus {
		outline: 1px solid blue;
	}

	.control:active {
		outline: 2px solid blue;
	}
	.click2 {
		margin: 0;
		padding: 5px 0 0 0;
		font-size: 0.8em;
	}
</style>
