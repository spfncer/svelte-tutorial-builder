import { writable } from "svelte/store";

export type TutorialItem = {
    description: string;
    component: HTMLElement;
    clickToAdvance: boolean;
}

function createStore() {

    const data = new Map<number, TutorialItem>();
    const { subscribe, set, update } = writable(data);

    return {
        subscribe,
        addClickable: (key: number, item: HTMLElement, text: string) => {
            const newItem: TutorialItem = {
                description: text,
                component: item,
                clickToAdvance: true
            }
            update(dataMap => {
                dataMap.set(key, newItem);
                return dataMap;
            })
        },
        addNonClickable: (key: number, item: HTMLElement, text: string) => {
            const newItem: TutorialItem = {
                description: text,
                component: item,
                clickToAdvance: false
            }
            update(dataMap => {
                dataMap.set(key, newItem);
                return dataMap;
            })
        }
    }
}

export const TutorialStore = createStore();