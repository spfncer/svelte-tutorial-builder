# svelte-tutorial

A library for Svelte to simplify creating a simple linear in-app tutorial for new users.

## Loading HTML Elements into TutorialStore
1. Inside your app's components, [create bindings to individual HTML elements](https://learn.svelte.dev/tutorial/bind-this) you want to call attention to in the tutorial.
2. Import the TutorialStore in each component containing HTML elements to reference.
3. Consider how you want users to interact with each component. If it's something they'll click (like a button), you can use TutorialStore.addClickable() to add it to the store. With this method, users will have to click on the item to advance the tutorial. Otherwise, use TutorialStore.addNonClickable().
4. When the component mounts, add your HTMLElements to the store using the chosen methods. Note that you can mix-and-match, just ensure your IDs are consecutive, positive integers starting from 1.
5. Import and add the Tutorial component to the top-level component for the app/page you want to show tutorials on.

## Using the Tutorial Component
* By default, the Tutorial Component will immediately start from item #1 in the TutorialStore when it mounts. You can pass the **autoStart** prop to change this behavior.
* By using **bind:this** on the tutorial component, you can call **startTutorial()** on the Tutorial component at some arbitrary time, such as when the user clicks a button.
* You can pass the **show** prop to the component to manually highlight the Element with that ID

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

Everything inside `src/lib` is part of the library, everything inside `src/routes` can be used as a showcase or preview app.

## Building

To build your library:

```bash
npm run package
```

To create a production version of your showcase app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.