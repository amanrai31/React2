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

Try challenge 2 & 3 =>  https://react.dev/learn/separating-events-from-effects#challenges

------

**Again :** If you want to use plain JS variable/array etc. inside a component, make sure that is dependent on or should have some sort of relation with state so that when component re-renders then the variable is in sync with state otherwise, it will reset its value on every render. OR we can declare it outside the component(that way it will be immune to component renders).


**MORE ON REACT (REACT REFERENCE)** => [https://react.dev/reference/react]

Learn FORM, CSS Positioning, and Storage(local,session,redux etc)

-----
