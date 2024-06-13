import { writable } from "svelte/store";

function createPausing(){
    const{subscribe, set, update} = writable(false);

    return{
        subscribe,
        /**
         * Pauses the Tutorial. Don't call it directly, use TutorialStore.addPause() or TutorialStore.addPauseWithoutSetup()
         */
        pause: () => {set(true)},
        /**
         * Call this once the user has completed some action independently, to continue the guided tutorial.
         */
        unpause: () => {set(false)}
    }
}

export const Paused = createPausing();