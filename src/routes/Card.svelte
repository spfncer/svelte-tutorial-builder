<script lang="ts">
	import { TutorialStore } from "$lib";
	import { onMount } from "svelte";

    let item: HTMLElement;
    let parent: HTMLElement;
    onMount(()=>{
        TutorialStore.addNonClickable(7, item, "This will add another mask.", parent);
    })
</script>

<div class="card" bind:this={parent}>
    <table>
        <thead>
            <tr bind:this={item}>
                <th>Item One</th>
                <th>Item Two</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Hi</td>
                <td>Hello</td>
            </tr>
        </tbody>
    </table>
</div>

<style>
    .card{
        width: 500px;
        height: 500px;
        background-color: white;
        display: block;
        outline: 2px black solid;
        margin-top: 10px;
    }
    table{
        width: 90%;
    }
    thead > tr > th{
        background-color: green;
        color: white;
    }
</style>