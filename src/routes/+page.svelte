<script lang="ts">
	import { onMount } from "svelte";
    import { TutorialStore } from "../lib/TutorialStore.ts";
	import Tutorial from "$lib/Tutorial.svelte";

    let elem1: HTMLElement;
    let elem2: HTMLElement;
    let elem3: HTMLElement;

    onMount(()=>{
        TutorialStore.add("e1", elem1);
        TutorialStore.add("e2", elem2);
        TutorialStore.add("e3", elem3);
    })
</script>

<Tutorial show={"e1"}></Tutorial>
<h1 >Welcome to your library project</h1>
<p bind:this={elem2}>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p bind:this={elem3}>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<div bind:this={elem1} class="tester">This is a box</div>

<style>
    h1,p{
        background-color: orange;
    }
</style>