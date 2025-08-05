# CONTENT => EVENT, STATE, 

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

### Event propagation

Event handlers will also catch events from any children your component might have. We say that an event “bubbles” or “propagates” up the tree: it starts with where the event happened, and then goes up the tree.

```js
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();                      // Remove this & you will se the event bubbles.
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

Some browser events have default behavior associated with them. For example, a <form> submit event, which happens when a button inside of it is clicked, will reload the whole page by default. `e.preventDefault(); => use this to stop default behaviour of browser`


-----

## Hook

**Hooks =>** Hooks—functions starting with `use`—can only be called at the top level of your components or your own Hooks. You can’t call Hooks inside conditions, loops, or other nested functions. 

Hooks are special functions that are only available while React is rendering. They let you “hook into” different React features.

Internally, React holds an array of state pairs for every component. It also maintains the current pair index, which is set to 0 before rendering. Each time you call useState, React gives you the next state pair and increments the index. 

## State => A component's memory

Components often need to change what’s on the screen as a result of an interaction. Also Components need to “remember” things: the current input value, the current image, the shopping cart. In React, this kind of `component-specific memory` is called state.


Why regular variable is not enough =>

1. `Local variables don’t persist between renders`=> When React renders this component a second time, it renders it from scratch—it doesn’t consider any changes to the local variables.
2. `Changes to local variables won’t trigger renders`=> React doesn’t realize it needs to render the component again with the new data.

**To update a component with new data, two things need to happen**

1. Retain the data between renders.
2. Trigger React to render the component with new data (re-rendering).

**The `useState` Hook provides those two things**

1. A `state variable` to retain the data between renders.
2. A state setter function to update the variable and trigger React to render the component again.

```js
const [index, setIndex] = useState(0);
// index is a state variable and setIndex is the setter function.
```

**NOTE :** The `[` and `]` syntax here is called array destructuring and it lets you read values from an array. The array returned by useState always has exactly two items.

**Anatomy of `useState` =>** When you call useState, you are telling React that you want this component to remember something. `const [index, setIndex] = useState(0);` Here we want react to remember `index`.

**NOTE :** The only argument to useState is the initial value of your state variable. In above example, the index’s initial value is set to 0 with useState(0).

=> It is a good idea to have multiple state variables if their state is unrelated. But if you find that you often change two state variables together, it might be easier to combine them into one. For example, if you have a form with many fields, it’s more convenient to have a single state variable that holds an object than state variable per field.

**State is isolated and private :** State is local to a component instance on the screen. In other words, if you render the same component twice, each copy will have completely isolated state! Changing one of them will not affect the other. Unlike props, state is fully private to the component declaring it. The parent component can’t change it. This lets you add state to any component or remove it without impacting the rest of the components.

```js
import { useState } from 'react';

export default function FeedbackForm() {
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState('');
  if (isSent) {                                 // We can use ternary operator
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

### . `Triggering a render` => There are two reasons for a component to render:

1. It’s the component’s initial render.

When your app starts, you need to trigger the initial render. Frameworks and sandboxes sometimes hide this code, but it’s done by calling createRoot with the target DOM node, and then calling its render method with your component.

```js
const root = createRoot(document.getElementById('root'))
root.render(<Image />);
```

2. Re-renders when the component’s (or one of its ancestors’) state has been updated.







































