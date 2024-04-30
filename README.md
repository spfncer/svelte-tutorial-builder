# svelte-tutorial-builder

A library for Svelte to simplify creating a linear in-app tutorial for new users.

## Loading HTML Elements into TutorialStore
To create a Tutorial, you first need to load HTML Elements into the **TutorialStore**. This allows the Tutorial Component to access it later.

When loading elements into TutorialStore, they can be inserted as one of five types.

* `addNonClickable`: The standard item. Pass in an HTMLElement and it will be highlighted to the user. When finished, the user clicks the "Next" button to advance.
* `addClickable`: Pass in an HTMLElement, and the user will have to click on it to advance the tutorial. Other behaviors will apply, so this works great for clicking an "open" button that reveals some other element you want to show the user.
* `addTextOnly`: Shows some explanation in the popup without focusing on any specific elements. Great for introductory/completion messages.
* `addPause`: Pause the tutorial to allow the user to complete a task independently, and resume the tutorial on task completion. Takes in a prePauseTask which should ensure their environment does not already have the desired condition true.
* `addPauseWithoutSetup`: Like `addPause` but does not take in a prePauseTask. Use with caution. 

It's also important to plan out the order of your tutorial before coding! TutorialStore expects each item to have a numeric ID, which should be a positive integer starting from 1. The Tutorial will advance in order, and if elements are missing the tutorial will end abruptly.

To insert items into TutorialStore:

1. Inside your app's components, [create bindings to individual HTML elements](https://learn.svelte.dev/tutorial/bind-this) you want to call attention to in the tutorial.
2. Import the TutorialStore in each component containing HTML elements to reference.
3. Consider how you want users to interact with each component, and use the appropriate "add" method on TutorialStore.
4. When the component mounts, add your HTMLElements to the store using the chosen methods. Note that you can mix-and-match, just ensure your IDs are consecutive, positive integers starting from 1.
5. Import and add the Tutorial component to the top-level component for the app/page you want to show tutorials on.

## Using the Tutorial Component
* By default, the Tutorial Component will immediately start from item #1 in the TutorialStore when it mounts. This is the ideal usage; use a local variable to track when to mount the component, and unmount the tutorial when finished.

### Props
* `onCompletion`: Optional, but recommended. Pass a function to execute when the user exits the Tutorial. Should trigger the Tutorial Component to unmount.
* `show`: Optional. Takes an ID of an item in TutorialStore, and immediately puts the tutorial to that item. Provides no way for user to advance, so ideally this will use a binding to provide another way to advance.
* `curtainZIndex`: Optional, default 50. Sets the Z-Index for the backdrop used to dim the application.
* `autoStart`: Optional, default true. If true, the tutorial will begin as soon as the Tutorial component mounts. If false, use the exported function `startTutorial()` to start at an arbitrary time.
* `buttonClasses`: Optional. Pass a string containing (global) CSS classes to apply to the buttons that appear on the floating explanations panel.
* `boxClasses`: Optional. Pass a string containing (global) CSS classes to apply to the floating explanations panel.
* `clickableMessage`: Optional, default 'Click it to continue.' Takes a string to display instead of the Next button for any Clickable elements.

### Exported Functions

`startTutorial`: Assuming the Tutorial Component is mounted but autoStart = false, calling this function will begin the tutorial.

### Full Usage with Props

```svelte
{#if condition}
    <Tutorial {onCompletion}></Tutorial>
{/if}
```
The above is the recommended configuration. The component should be wrapped in a conditional, which is only true when the user engages with the tutorial. Upon exit, onCompletion() is called, which triggers the condition to become false.

```svelte
<Tutorial bind:this={TutorialComponent} curtainZIndex={20} autoStart={false} buttonClasses="custom-btn" boxClasses="custom-box" />
```
The above creates a Tutorial but does not start until user calls.`TutorialComponent.startTutorial()`.

```svelte
<Tutorial show={13} autoStart={false} />
```
Creates a Tutorial and immediately highlights #13. autoStart has no effect since the show prop was specified.

## Developing & Contributing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev
```

Everything inside `src/lib` is part of the library, everything inside `src/routes` can be used as a showcase or preview app.

Suggested changes to this repo should be suggested as Pull Requests on GitHub. I look forward to seeing your contributions!

## Building

To build the library:

```bash
npm run package
```
