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

**Again :** If you want to use plain JS variable/array etc. inside component, make sure that is dependent on or should have some short of relation with state so that when component re-renders then the variable is in sync with state otherwise it will reset it's value on every render. OR we can declear it outside the component(that way it will be immune to component renders).


**MORE ON REACT (REACT REFERNCE)** => [https://react.dev/reference/react]













