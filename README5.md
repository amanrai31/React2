# ESCAPE HATCHES

## Referencing Values with Refs

`useRef` creates a mutable object (`{ current: value }`) that persists across renders without triggering re-renders.

You can access the current value of that ref through the ref.current property. This value is intentionally mutable, meaning you can both read and write to it. It’s like a secret pocket of your component that React doesn’t track. (This is what makes it an “escape hatch” from React’s one-way data flow)

```js
let ref = useRef(0);  // you could point to anything: a string, an object, or even a function. 

  function handleClick() {
    ref.current = ref.current + 1;
    alert('You clicked ' + ref.current + ' times!');
  }
```

**NOTE :** Unlike state, ref is a plain JS object with the `current` property that you can read and modify. Like state, refs are retained by React between re-renders. However, setting state re-renders a component. Changing a ref does not!

```js
// useRef onTop of useState
function useRef(initialValue) {
  const [ref, unused] = useState({ current: initialValue });
  return ref;
}
```

### When to use `useRef`

We will use a ref when your component needs to “step outside” React and communicate with external APIs—often a browser API that won’t impact the appearance of the component.

- storing timeout IDs
- storing & manupulating DOM Elements
- Storing other objects that aren’t necessary to calculate the JSX.

Try challenge 4 => [https://react.dev/learn/referencing-values-with-refs#challenges]

-----

## Manipulating the DOM with Refs

React automatically updates the DOM to match your render output, so your components won’t often need to manipulate it. However, sometimes you might need access to the DOM elements managed by React e.g. - to focus a node, scroll to it, or measure its size and position. There is no built-in way to do those things in React, so you will need a `ref` to the DOM node.

```js
import {useRef} from 'react';
const myRef = useRef(null);
<div ref ={myRef}>
```

- When React creates a DOM node for this `<div>`, React will put a `reference to this node` into `myRef.current`. You can then access this DOM node from your event handlers and use the built-in browser APIs defined on it. e.g. - `myRef.current.scrollIntoView();`, `myRef.current.focus()`

**NOTE :** While DOM manipulation is the most common use case for `refs`, the useRef Hook can be used for storing other things outside React, like timer IDs.

```js
import { useRef, useState } from "react";

export default function CatFriends() {
  const itemsRef = useRef(null);
  const [catList, setCatList] = useState(setupCatList);

  function scrollToCat(cat) {
    const map = getMap();
    const node = map.get(cat);
    node.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  function getMap() {
    if (!itemsRef.current) {
      // Initialize the Map on first usage.
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }

  return (
    <>
      <nav>
        <button onClick={() => scrollToCat(catList[0])}>Neo</button>
        <button onClick={() => scrollToCat(catList[5])}>Millie</button>
        <button onClick={() => scrollToCat(catList[9])}>Bella</button>
      </nav>
      <div>
        <ul>
          {catList.map((cat) => (
            <li
              key={cat}
              ref={(node) => {
                const map = getMap();
                map.set(cat, node);
                return () => {            // The returned f/n is a cleanup f/n: React calls this when the component unmounts or when the ref changes (Prevent memory leak)
                  map.delete(cat);
                };
              }}
            >
              <img src={cat} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function setupCatList() {
  const catList = [];
  for (let i = 0; i < 10; i++) {
    catList.push("https://loremflickr.com/320/240/cat?lock=" + i);
  }

  return catList;
}

```

 Above => `itemsRef` doesn’t hold a single DOM node. Instead, it holds a Map from item ID to a DOM node


### Accessing another component’s DOM nodes 

We can pass refs from parent component to child components just like any other prop.

### When React attaches the refs

In React, every update is split in two phases:

- During render, React calls your components to figure out what should be on the screen.
- During commit, React applies changes to the DOM.

In general, you don’t want to access refs during rendering. During the first render, the DOM nodes have not yet been created, so ref.current will be null. And during the rendering of updates, the DOM nodes haven’t been updated yet. So it’s too early to read them.

Before updating the DOM, React sets the affected `ref.current` values to `null`. After updating the DOM(commit), React immediately sets them to the corresponding DOM nodes.

**NOTE :** Usually, you will access refs from event handlers. If you want to do something with a ref, but there is no particular event to do it in, you might need an Effect.

**Flushing state updates synchronously with flushSync** => `import { flushSync } from 'react-dom'`. Immediately apply state updates synchronously instead of batching them. It's part of React's concurrent features control.

**NOTE :** Use sparingly: flushSync can hurt performance by preventing React's optimizations. Synchronous rendering: Updates happen immediately, blocking the main thread. Emergency escape hatch: Only use when you absolutely need immediate DOM updates

### Best practices for DOM manipulation with refs

Refs are an escape hatch. You should only use them when you have to “step outside React”. e.g. managing focus, scroll position, play, pause or calling browser APIs(timer etc) that React does not expose.

However, if you try to modify the DOM manually, you can risk conflicting with the changes React is making.

-----

## Synchronizing with Effects

Some components need to synchronize with external systems. e.g., you might want to control a non-React component based on the React state, set up a server connection, or send an analytics log when a component appears on the screen. Effects let you run some code after rendering so that you can synchronize your component with some system outside of React.

Two types of logic inside React components:

- Rendering code lives at the top level of your component. This is where you take the props and state, transform them, and return the JSX you want to see on the screen. Rendering code must be pure.

- Event handlers are nested f/n inside your components that do things rather than just calculate them. An event handler might update an input field, submit an HTTP POST request to buy a product, or navigate the user to another screen. Event handlers contain `side effects` (they change the program’s state when triggered)

Now consider a ChatRoom component that must connect to the chat server whenever it’s visible on the screen. Connecting to a server is not a pure calculation (it’s a side effect) so it can’t happen during rendering. Effects run at the end of a commit after the screen updates. This is a good time to synchronize the React components with some external system (like network or a third-party library).

**NOTE :** Effects let you specify side effects that are caused by rendering itself, rather than by a particular event. `Effect` is side effect caused by rendering.  If there’s no external system and you only want to adjust some state based on other state, you might not need an Effect.(Also can cause infinite loop if no dependency given)

**You might not need an Effect :** Effects are typically used to “step out” of your React code and synchronize with some external system (browser API, 3rd party widgets, n/w etc)

### Write an Effect  (Declare, dependencyArray, cleanup)

#### 1. Declare an effect (Call it at the top of component)

```js
import { useState, useRef, useEffect } from 'react';

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  if (isPlaying) {
    ref.current.play();  // Calling these while rendering isn't allowed.
  } else {
    ref.current.pause(); // Also, this crashes.
  }

  return <video ref={ref} src={src} loop playsInline />;
}

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <VideoPlayer
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </>
  );
}
```
This code is incorrect cuz it tries to do something with the DOM node during rendering. In React, rendering should be a pure calculation of JSX and should not contain side effects like modifying the DOM. There isn’t a DOM node yet to call play() or pause() on.

Wrap the above if & else conditions inside useEffect. By wrapping the DOM update in an Effect, you let React update the screen first. Then your Effect runs.

**NOTE :** The “external system” we synchronized to React state was the browser media API. We can use a similar approach to wrap legacy non-React code (like jQuery plugins) into declarative React components.

#### 2. Specify the Effect dependencies

- The dependency array can contain multiple dependencies. React will only skip re-running the Effect if all of the dependencies you specify have exactly the same values as they had during the previous render. React compares the dependency values using the `Object.is` comparison.

```js
useEffect(() => {
  // This runs after every render
});

useEffect(() => {
  // This runs only on mount (when the component appears)
}, []);

useEffect(() => {
  // This runs on mount *and also* if either a or b have changed since the last render
}, [a, b]);
```

- We can omit `ref` inside depn. array as ref do not change between re-render, however if `ref` is passed from parent then include that in depn. array cuz we can't know whether the parent component always passes the same ref, or passes one of several refs conditionally

#### 3. Add cleanup if needed

```js
 useEffect(() => {
    const connection = createConnection();
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, []);
```

- React will call your cleanup function each time before the Effect runs again, and one final time when the component unmounts (gets removed).

**NOTE :** In `development` (not in prod), react remount component, React verifies that navigating away and back would not break the code. Disconnecting and then connecting again is exactly what should happen! 

**IMPORTANT NOTE :** We use useEffect when the component needs to stay in sync with something external. If you subscribe to something, you must clean it up when unmounting, otherwise you leak resources.

#### Use cleanup if your effect:

- attaches something external (event listener, subscription, connection, timer)

- allocates a resource (object, library, animation)

- runs continuously until explicitly stopped.

- If the effect is just computing a value or triggering one-time DOM/API action, cleanup isn’t needed.

### Controlling non-React widgets 

Sometimes you need to add UI widgets that aren’t written in React. e.g., let’s say you’re adding a map component to your page. It has a setZoomLevel() method, and you’d like to keep the zoom level in sync with a zoomLevel state variable in your React code. 

```js
useEffect(() => {
  const map = mapRef.current;
  map.setZoomLevel(zoomLevel);
}, [zoomLevel]);
```










-----

**Again :** If you want to use plain JS variable/array etc. inside component, make sure that is dependent on or should have some short of relation with state so that when component re-renders then the variable is in sync with state otherwise it will reset it's value on every render. OR we can declear it outside the component(that way it will be immune to component renders).


**MORE ON REACT (REACT REFERNCE)** => [https://react.dev/reference/react]













