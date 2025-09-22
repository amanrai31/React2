# Separating Events from Effects

Effect Events (useEffectEvent) => Effect Events let you “break the chain” between the reactivity of Effects and code that should not be reactive.

Sometimes we have secnario where we have use effect & event both. Consider below example, on the very 1st render we added eventListner(pointerMove) which will call handleMove, and on every click on `checkBox` we want sync/un-sync the `window & eventListner` which is event based(on click on checkbox). So we can move the logic (which is event based) to useEffectEvent.

```js

// Without useEffectEvent

import { useState, useEffect } from 'react';

export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [canMove, setCanMove] = useState(true);

  function handleMove(e) {
    if (canMove) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
  }

  useEffect(() => {
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, [canMove]);

 // return JSX;
 
```

```js

// Using useEffectEvent

import { useState, useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';

export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [canMove, setCanMove] = useState(true);

  const onMove = useEffectEvent(e => {
    if (canMove) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
  });

  useEffect(() => {
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);
```

Try challenges =>  https://react.dev/learn/separating-events-from-effects#challenges

-----

# Removing Effect Dependencies

Dependencies should match the code  => When you write an Effect, you first specify how to start and stop whatever you want your Effect to be doing. Then, if you leave the Effect dependencies empty ([]), the linter will suggest the correct dependencies

1. To remove a dependency, prove that it’s not a dependency
2. To change the dependencies, change the code

**Reactive values include props and all variables(including state) and functions declared directly inside of your component. **

### Removing unnecessary dependencies

Look at the dependency list. Does it make sense for the Effect to re-run when any of these dependencies change? Sometimes, the answer is “no”

- You might want to re-execute different parts of your Effect under different conditions.
- You might want to only read the latest value of some dependency instead of “reacting” to its changes.
- A dependency may change too often unintentionally because it’s an object or a function.

#### 1. Should this code move to an event handler?

Like hitting POST request on form submission - Put it in event handler

#### 2. Is your Effect doing several unrelated things?

Avoid: A single Effect synchronizes two or more independent processes

```js
const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  	// ...
}
```







------

**Again :** If you want to use plain JS variable/array etc. inside a component, make sure that is dependent on or should have some sort of relation with state so that when component re-renders then the variable is in sync with state otherwise, it will reset its value on every render. OR we can declare it outside the component(that way it will be immune to component renders).


**MORE ON REACT (REACT REFERENCE)** => [https://react.dev/reference/react]

Learn FORM, CSS Positioning, and Storage(local,session,redux etc)

-----
