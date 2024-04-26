# svelte-tutorial-builder

A library for Svelte to simplify creating a simple linear in-app tutorial for new users.

## Loading HTML Elements into TutorialStore
To create a Tutorial, you first need to load HTML Elements into the **TutorialStore**. This allows the Tutorial Component to access it later.

When loading elements into TutorialStore, they can be inserted as one of two types. A clickable element is something the user clicks on to advance the tutorial. This might be a button, for instance, which opens another part of the app you want to highlight next. Alternatively, non-clickable elements will present users with a "Next" button to advance the tutorial.

It's also important to plan out the order of your tutorial before coding! TutorialStore expects each item to have a numeric ID, which should be a positive integer starting from 1. The Tutorial will advance in order, and if elements are missing the tutorial will end abruptly.

To insert items into TutorialStore:

1. Inside your app's components, [create bindings to individual HTML elements](https://learn.svelte.dev/tutorial/bind-this) you want to call attention to in the tutorial.
2. Import the TutorialStore in each component containing HTML elements to reference.
3. Consider how you want users to interact with each component. If it's something they'll click, use TutorialStore.addClickable() to add it to the store. Otherwise, use TutorialStore.addNonClickable().
4. When the component mounts, add your HTMLElements to the store using the chosen methods. Note that you can mix-and-match, just ensure your IDs are consecutive, positive integers starting from 1.
5. Import and add the Tutorial component to the top-level component for the app/page you want to show tutorials on.

## Using the Tutorial Component
* By default, the Tutorial Component will immediately start from item #1 in the TutorialStore when it mounts. You can pass the **autoStart** prop to change this behavior.
* By using **bind:this** on the tutorial component, you can call **startTutorial()** on the Tutorial component at some arbitrary time, such as when the user clicks a button.
* You can pass the **show** prop to the component to manually highlight the Element with that ID

### Props
* `show`: Optional. Takes an ID of an item in TutorialStore, and immediately puts the tutorial to that item. Provides no way for user to advance, so ideally this will use a binding to provide another way to advance.
* `curtainZIndex`: Optional, default 50. Sets the Z-Index for the backdrop used to dim the application.
* `autoStart`: Optional, default true. If true, the tutorial will begin as soon as the Tutorial component mounts. If false, use the exported function `startTutorial()` to start at an arbitrary time.
* `buttonClasses`: Optional. Pass a string containing (global) CSS classes to apply to the buttons that appear on the floating explanations panel.
* `boxClasses`: Optional. Pass a string containing (global) CSS classes to apply to the floating explanations panel.
* `clickableMessage`: Optional, default 'Click it to continue.' Takes a string to display instead of the Next button for any Clickable elements.

### Full Usage with Props
```
<Tutorial bind:this={TutorialComponent} curtainZIndex={20} autoStart={false} buttonClasses="custom-btn" boxClasses="custom-box" />
```
The above creates a Tutorial but does not start until user calls.`TutorialComponent.startTutorial()`.

```
<Tutorial show={13} autoStart={false} />
```
Creates a Tutorial and immediately highlights #13. autoStart has no effect since the show prop was specified.

## Developing & Contributing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

Everything inside `src/lib` is part of the library, everything inside `src/routes` can be used as a showcase or preview app.

Suggested changes to this repo should be suggested as Pull Requests on GitHub. I look forward to seeing your contributions!

## Building

To build the library:

```bash
npm run package
```