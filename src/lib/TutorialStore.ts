import { writable } from "svelte/store";


export type TutorialItem = {
    description: string;
    component: HTMLElement | undefined;
    clickToAdvance: boolean;
    pause: boolean;
    pauseTask: (()=>void);
}

function doNothing(){
    return;
}

function createStore() {

    const data = new Map<number, TutorialItem>();
    const { subscribe, set, update } = writable(data);

    return {
        subscribe,
        /**
         * Add an item to the in-app tutorial that the user should click on to advance the tutorial
         * @param key {number} A positive, non-zero integer that uniquely identifies the item in the order it should appear. Should be consecutive.
         * @param item {HTMLElement} The element to highlight
         * @param text {string} The explanatory text to display in the tutorial
         */
        addClickable: (key: number, item: HTMLElement, text: string) => {
            const newItem: TutorialItem = {
                description: text,
                component: item,
                clickToAdvance: true,
                pause: false,
                pauseTask: doNothing,
            }
            update(dataMap => {
                dataMap.set(key, newItem);
                return dataMap;
            })
        },
        /**
         * Add an item to the in-app tutorial that the user should not click on to advance the tutorial. Instead there will be a "Next" button.
         * @param key {number} A positive, non-zero integer that uniquely identifies the item in the order it should appear. Should be consecutive.
         * @param item {HTMLElement} The element to highlight
         * @param text {string} The explanatory text to display in the tutorial
         */
        addNonClickable: (key: number, item: HTMLElement, text: string) => {
            const newItem: TutorialItem = {
                description: text,
                component: item,
                clickToAdvance: false,
                pause: false,
                pauseTask: doNothing,
            }
            update(dataMap => {
                dataMap.set(key, newItem);
                return dataMap;
            })
        },
        /**
         * Add a pause to the in-app tutorial to allow the user to test out some functionality. Tutorial will continue when you call the UnpauseTutorial() function in your component's code.
         * @param key {number} A positive, non-zero integer that uniquely identifies the item in the order it should appear. Should be consecutive.
         * @param text {string} The explanatory text to display right before the pause
         * @param prePauseTask {()=>void} A function to run right before letting the user explore. This should set whatever condition your're waiting for to be false, so you can advance once the user makes it true.
         */
        addPause: (key:number, text: string, prePauseTask:()=>void) => {
            const newItem: TutorialItem = {
                description: text,
                component: undefined,
                clickToAdvance: false,
                pause: true,
                pauseTask: prePauseTask,
            }
            update(dataMap => {
                dataMap.set(key, newItem);
                return dataMap;
            })
        },
        /**
         * Add a pause to the in-app tutorial to allow the user to test out some functionality. Tutorial will continue when you call the UnpauseTutorial() function in your component's code.
         * This function does not take in a pre-pause task, so only use this one if you're certain the condition you're checking for will always start out as false.
         * @param key {number} A positive, non-zero integer that uniquely identifies the item in the order it should appear. Should be consecutive.
         * @param text {string} The explanatory text to display right before the pause
         */
        addPauseWithoutSetup: (key:number, text: string) => {
            const newItem: TutorialItem = {
                description: text,
                component: undefined,
                clickToAdvance: false,
                pause: true,
                pauseTask: doNothing,
            }
            update(dataMap => {
                dataMap.set(key, newItem);
                return dataMap;
            })
        },
        remove: (key: number) => {
            update(dataMap => {
                dataMap.delete(key);
                return dataMap;
            })
        },
        clear: () => {
            set(new Map<number, TutorialItem>());
        }
    }
}

export const TutorialStore = createStore();