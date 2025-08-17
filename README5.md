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
























