import { writable } from "svelte/store";

function createPausing(){
    const{subscribe, set, update} = writable(false);

    return{
        subscribe,
        pause: () => {set(true)},
        unpause: () => {set(false)}
    }
}

export const Paused = createPausing();