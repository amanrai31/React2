# CONTENT => EVENT, STATE, SNAPSHOT

## Responding to Events

Event handler functions are usually defined inside your components.

**NOTE :** Functions passed to event handlers must be passed, not called. `<button onClick={handleClick}> : CORRECT`. `<button onClick={handleClick()}> : INCORRECT`. When we pass f/n then react remmembers it & only calls the f/n when user click the button. But when we call the f/n inside onClick then that f/n immediatly fires during redering (without any click)

```js
function AlertButton({ message, children }) {
  return (
    <button onClick={() => alert(message)}>
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div>
      <AlertButton message="Playing!">
        Play Movie
      </AlertButton>
    </div>
  );
}
```

We can Pass event handlers as props => it’s common for components like buttons to contain styling but not specify behavior. Instead, parent components will pass event handlers down.

**NOTE :** Event handlers are defined inside a component, so they can access props.

### Event propagation/bubbles

Event handlers will also catch events from any children your component might have. We say that an event “bubbles” or “propagates” up the tree: it starts with where the event happened, and then goes up the tree.

```js
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();                      // Remove this & you will see the event bubbles.
      onClick();
    }}>
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('You clicked on the toolbar!');
    }}>
      <Button onClick={() => alert('Playing!')}>
        Play Movie
      </Button>
      <Button onClick={() => alert('Uploading!')}>
        Upload Image
      </Button>
    </div>
  );
}
```

Some browser events have default behavior associated with them. For example, a `<form>` submit event, which happens when a button inside of it is clicked, will reload the whole page by default. `e.preventDefault(); => use this to stop default behaviour of browser`


-----

## Hook

**Hooks =>** Hooks—functions starting with `use`—can only be called at the top level of your components or your own Hooks. You can’t call Hooks inside conditions, loops, or other nested functions. 

Hooks are `special functions` that are only available `while React is rendering`. They let you “hook into” different React features.

Internally, React holds an array of state pairs for every component. It also maintains the current pair index, which is set to 0 before rendering. Each time you call useState, React gives you the next state pair and increments the index. 

## State => A component's memory

Components often need to change what’s on the screen as a result of an interaction. Also, Components need to “remember” things: the current input value, the current image, and the shopping cart. In React, this kind of `component-specific memory` is called state.


Why regular variable is not enough =>

1. `Local variables don’t persist between renders`=> When React renders this component a second time, it renders it from scratch—it doesn’t consider any changes to the local variables.
2. `Changes to local variables won’t trigger renders`=> React doesn’t realize it needs to render the component again with the new data.

**To update a component with new data, two things need to happen**

1. Retain the data between renders.
2. Trigger React to render the component with new data (re-rendering).

**The `useState` Hook provides those two things**

1. A `state variable` to retain the data between renders.
2. A `state setter function` to update the variable and trigger React to render the component again.

```js
const [index, setIndex] = useState(0);
// index is a state variable and setIndex is the setter function.
```

**NOTE :** The `[` and `]` syntax here is called array destructuring and it lets you read values from an array. The array returned by useState always has exactly two items.

**Anatomy of `useState` =>** When you call useState, you are telling React that you want this component to remember something. `const [index, setIndex] = useState(0);` Here we want react to remember `index`.

**NOTE :** The only argument to useState is the initial value of your state variable. In above example, the index’s initial value is set to 0 with useState(0).

=> It is a good idea to have multiple state variables if their state is unrelated. But if you find that you often change two state variables together, it might be easier to combine them into one. For example, if you have a form with many fields, it’s more convenient to have a single state variable that holds an object than state variable per field.

**State is isolated and private :** State is local to a `component instance` on the screen. In other words, if you render the same component twice, each copy will have a completely isolated state! Changing one of them will not affect the other. Unlike props, state is fully private to the component declaring it. The parent component can’t change it. This lets you add state to any component or remove it without impacting the rest of the components.

```js
import { useState } from 'react';

export default function FeedbackForm() {
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState('');
  if (isSent) {                                 // We can use ternary operator OR &&
    return <h1>Thank you!</h1>;
  } else {
    return (
      <form onSubmit={e => {
        e.preventDefault();
        alert(`Sending: "${message}"`);       // Alert is async, pause the whole execution
        setIsSent(true);
      }}>
        <textarea
          placeholder="Message"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <br />
        <button type="submit">Send</button>
      </form>
    );
  }
}

```


-----

## Render & Commit

1. `Triggering a render` (delivering the guest’s order to the kitchen)
2. `Rendering the component` (preparing the order in the kitchen)
3. `Committing to the DOM` (placing the order on the table)

### STEP 1 => `Triggering a render` => There are two reasons for a component to render

1. It’s the component’s initial render.

When your app starts, you need to trigger the initial render. Frameworks and sandboxes sometimes hide this code, but it’s done by calling createRoot with the target DOM node, and then calling its render method with your component.

```js
const root = createRoot(document.getElementById('root'))
root.render(<Image />);
```

2. Re-renders when the component’s (or one of its ancestors’) state has been updated.

### STEP 2 =>  React renders your components

After you trigger a render, React calls your components to figure out what to display on screen. `Rendering is React calling your components`.

- On initial render, React will call the root component.
- For subsequent renders, React will call the function component whose state update triggered the render.

**NOTE :** This process is recursive: if the updated component returns some other component, React will render that component next, and if that component also returns something, it will render that component next, and so on(until no more nested components). 

**NOTE :** Rendering must be pure. i.e. Same input-same output (component should always return the same JSX) AND It should mind its own business (should not change any objects or variables that existed before rendering).

**IMPORTANT NOTE :** The default behavior of rendering all components nested within the updated component is not optimal for performance if the updated component is very high in the tree(We wil see).


### Step 3: React commits changes to the DOM

After rendering (calling) components, React will modify the DOM.

- For the initial render, React will use the appendChild() DOM API to put all the DOM nodes it has created on screen.
- For re-renders, React will apply the minimal necessary operations (calculated while rendering- if there is diff b/w renders) to make the DOM match the latest rendering output.

**IMPORTANT NOTE :** After rendering is done and React updates the DOM, the browser will repaint the screen. Although this process is known as `browser rendering`, we’ll refer to it as “painting” to avoid confusion throughout the docs.

**IMPORTANT NOTE :** The child will re-render by default when the parent’s state changes, `even` if that state isn’t passed as a prop. If you don’t want that, wrap the child in `React.memo`.

-----

## State as a snapshot

`A state variable’s value never changes within a render, even if its event handler’s code is asynchronous. React stores state outside of your component, as if on a shelf.
When you call useState, React gives you a snapshot of the state for that render. Variables and event handlers don’t “survive” re-renders. Every render has its own event handlers. Event handlers created in the past have the state values from the render in which they were created.`

- MUST READ => [https://react.dev/learn/state-as-a-snapshot]

-----

## Queueing a Series of State Updates

Sometimes we have to perform multiple operations on the value before queueing the next render.

### Batching => React batches state updates

```js
// clicking the button(+3) will not increase count by 3. It only increases by 1.
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
        setNumber(number + 1);
        setNumber(number + 1);
      }}>+3</button>
    </>
  )
}
// If i add updater f/n inside setter like [ setNumber(()=>number + 1) ], you can assume like React is executing 1st updater f/n then
// (value of n changed from n to n+1) set the state || execute 2nd updater f/n then set the state and so on
```

- 2 main reasons =>
1. As we have discussed before, each render’s state values are fixed, so the value of number inside the first render’s event handler is always 0
2.  React waits until all code in the event handlers has run before processing your state updates. Re-render only happens after all these setNumber() calls. (waiter taking orders analogy). This behaviour is called **Batching** (Put all setter f/n in queue )

**NOTE :** React does not batch across multiple intentional events like clicks—each click is handled separately.

### Updater function => Function inside state setter f/n. (Should be pure)

- React queues this function to be processed after all the other code in the event handler has run.
- During the next render, React goes through the queue and gives you the final updated state.
  
**Then React takes the return value of your previous updater function and passes it to the next updater as n, and so on:**

**NOTE :** After the event handler completes, React will trigger a re-render. During the re-render, React will process the queue.

```js
// Run on sandBox
import { useState } from 'react';

export default function RequestTracker() {
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);

  async function handleClick() {
    setPending(pending + 1);
    await delay(3000);
    setPending(pending => pending - 1);
    setCompleted(completed => completed + 1);
  }

  return (
    <>
      <h3>
        Pending: {pending}
      </h3>
      <h3>
        Completed: {completed}
      </h3>
      <button onClick={handleClick}>
        Buy     
      </button>
    </>
  );
}

function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

```

**IMPORATANT NOTE :** If i add updater f/n inside setter, you can assume like React is executing 1st updater f/n then set the state || execute 2nd updater f/n then set the state and so on... 

- MUST READ [https://react.dev/learn/queueing-a-series-of-state-updates#challenges]

-----

## Updating objects in state

We shouldn’t change objects that is hold in the React state directly. Create a new one(or make a copy of an existing one) & then set the state to use that copy.

```js
const [x, setX] = useState(0);
setX(5)
```

- The x state changed from 0 to 5, but the number 0 itself did not change. It’s not possible to make any changes to the built-in primitive values like numbers, strings, and booleans in JS because they are immutable(read-only). But object are mutable that is why we should not directly mutate them (We should treat them as READ-ONLY(IMMUTABLE)).

**NOTE :** We should treat any JS object `that you put into state` as `read-only`.

```js
Red dot move with pointer/cursor

import { useState } from 'react';

export default function MovingDot() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  return (
    <div
      onPointerMove={e => {
        newPosition = {...position}                  
        newPosition.x = e.clientX;
        newPosition.y = e.clientY;
        setPosition(newPosition);
      }}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}>
      <div style={{
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: `translate(${position.x}px, ${position.y}px)`,
        left: -10,
        top: -10,
        width: 20,
        height: 20,
      }} />
    </div>
  );
}
```

```js
function handleFirstNameChange(e) { setPerson({ ...person, firstName: e.target.value}); } // Ya we can do like const newPerson = {...person}; newPerson.firstName: e.target.value; setPerson(newPerson)
```
**Immer :** We can use immer library to flat & update nested objects.
```js
const [person, updatePerson] = useImmer({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });
function handleCityChange(e) {
    updatePerson(draft => {
      draft.artwork.city = e.target.value;         //updates even nested object's props.
    });
  }
```

**IMPORTANT NOTE :** Mutating an object directly will not cause a re-render, it stores the updated value in previous render state.

-----

## Updating Array in State

Just like objects Arrays are mutable in JS, but you should treat them as immutable when you store them in state.

- Do changes on array using non-mutating methods like filter() and map(), concat, [...array], slice, toSpliced, toSort, toReverse
- DO NOT to use => splice, push, pop || unshift, shift, reverse, sort

**NOTE :** The array spread syntax[...arr] also lets you prepend(unshift) & postpend(push) an item by placing it before/after the original. If you spread 1st the add something => will act like `push`, if you add something & then spread ["aman", ...arr] => this will act like `unshift`.

- use filter to delete an item from array as it creates new array.

Transform/Replace item in array => use new array then make change then set/change the setter function.

**IMPORTANT NOTE :** If array is nested we cann't mutated even the `copy array` after spread [...] because spread creates shalow copy. => `useImmer` or other `raw JS concepts`

MORE READ ON updating object inside array => [https://react.dev/learn/updating-arrays-in-state#updating-objects-inside-arrays]

-----










































































































































































































