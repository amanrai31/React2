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

#### 3. Are you reading some state to calculate the next state? 

```js
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    connection.on('message', (receivedMessage) => {
      setMessages([...messages, receivedMessage]);
    });
    return () => connection.disconnect();
  }, [roomId, messages]); // ✅ All dependencies declared
  // ...
```

Since this Effect now depends on messages, this will also re-synchronize the Effect. So every new message will make the chat re-connect. To fix the issue, don’t read messages inside the Effect. Instead, pass an updater function to setMessages

```js
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    connection.on('message', (receivedMessage) => {
      setMessages(msgs => [...msgs, receivedMessage]);
    });
    return () => connection.disconnect();
  }, [roomId]); // ✅ All dependencies declared
  // ...
```

Now Effect does not read the messages variable at all now. 

#### 4. Do you want to read a value without “reacting” to its changes? (useEffectEvent)

`useEffectEvent Separates reactive and non-reactive code`

```js
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  const [isMuted, setIsMuted] = useState(false);

  const onMessage = useEffectEvent(receivedMessage => {
    setMessages(msgs => [...msgs, receivedMessage]);
    if (!isMuted) {   // Moved this inside useEffectEvent otherwise we have to put this inside dependency array & would cause re-sync when changes unnecessarily
      playSound();
    }
  });

  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    connection.on('message', (receivedMessage) => {
      onMessage(receivedMessage);
    });
    return () => connection.disconnect();
  }, [roomId]); // ✅ All dependencies declared
```

`Effect Events` let you split an Effect into reactive parts (which should “react” to reactive values like roomId and their changes) and non-reactive parts (which only read their latest values, like onMessage reads isMuted). Now that you read isMuted inside an Effect Event, it doesn’t need to be a dependency of your Effect. As a result, the chat won’t re-connect when you toggle the “Muted” setting on and off, solving the original issue!

**LINK =>** https://react.dev/learn/removing-effect-dependencies#do-you-want-to-read-a-value-without-reacting-to-its-changes

#### 5. Does some reactive value change unintentionally?

`In JS, each newly created object and function is considered distinct from all the others. It doesn’t matter that the contents inside of them may be the same!`

1. Move static objects and functions outside your component
2. Move dynamic objects and functions inside your Effect
3. Calculate primitive values from objects
4. Calculate primitive values from functions

```
- Dependencies should always match the code.
- When you’re not happy with your dependencies, what you need to edit is the code.
- Suppressing the linter leads to very confusing bugs, and you should always avoid it.
- To remove a dependency, you need to “prove” to the linter that it’s not necessary.
- If some code should run in response to a specific interaction, move that code to an event handler.
- If different parts of your Effect should re-run for different reasons, split it into several Effects.
- If you want to update some state based on the previous state, pass an updater function.
- If you want to read the latest value without “reacting” it, extract an Effect Event from your Effect.
- In JavaScript, objects and functions are considered different if they were created at different times.
- Try to avoid object and function dependencies. Move them outside the component or inside the Effect.
```
Suppose you passed some object as prop to child, child's EFFECT using that prop(object) as dependency. Now every time when any state change in parent then will re-create that object and child's effct will re-run the effect. So destructure it first & then use(primitive values) it as dependency.

------

# Reusing Logic with Custom Hooks













------

**Again :** If you want to use plain JS variable/array etc. inside a component, make sure that is dependent on or should have some sort of relation with state so that when component re-renders then the variable is in sync with state otherwise, it will reset its value on every render. OR we can declare it outside the component(that way it will be immune to component renders).


**MORE ON REACT (REACT REFERENCE)** => [https://react.dev/reference/react]

Learn FORM, CSS Positioning, and Storage(local,session,redux etc)

-----
