# CONTENT => 

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

## State => A component's memory

Components often need to change what’s on the screen as a result of an interaction. Also Components need to “remember” things: the current input value, the current image, the shopping cart. In React, this kind of `component-specific memory` is called state.


Why regular variable is not enough =>

1. `Local variables don’t persist between renders`=> When React renders this component a second time, it renders it from scratch—it doesn’t consider any changes to the local variables.
2. `Changes to local variables won’t trigger renders`=> React doesn’t realize it needs to render the component again with the new data.










