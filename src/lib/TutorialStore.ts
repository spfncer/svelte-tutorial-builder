import { SvelteComponent, type ComponentType } from "svelte";
import { writable } from "svelte/store";

function createStore(){

    const data = new Map<String, HTMLElement>();
    const {subscribe, set, update} = writable(data);

    return {
        subscribe,
        add: (key:string, item: HTMLElement) => {
            update(dataMap => {
                dataMap.set(key, item);
                return dataMap;
            })
        }
    }
}

export const TutorialStore = createStore();