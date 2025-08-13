# CONTENT => Managing state

## Thinking about UI declaratively 

1. Identify your component’s different visual states
2. Determine what triggers those state changes (HumanInput, computerInput) => Draw the flow.
3. Represent the state in memory using useState
4. Remove any non-essential state variables (to avoid bugs and paradoxes)
5. Connect the event handlers to set the state

- `Imperatively` vs `Declaratively`

4. Remove any non-essential state variables

Suppose we have a form that can be in `empty`, `typing`, `submitting`, `success`, `error`. => `Goal is to prevent the cases where the state in memory doesn’t represent any valid UI that you’d want a user to see.`

- Does this state cause a paradox? =>isTyping and isSubmitting can’t both be true, similarly 
isEmpty and isTyping can’t be true at the same time.

- Can you get the same information from the inverse of another state variable? isError is not needed because you can check error !== null instead.


-----

## Choosing the State Structure 

Make choices about how many state variables to use and what the shape of their data should be in the component.

1. Group related state => If you always update two or more state variables at the same time, consider merging them into a single state variable.
2. Avoid contradictions in state
3. Avoid redundant state(mirroring) => If you can calculate some information from the component’s props or its existing state variables during rendering, you should not put that information into that component’s state.
4. Avoid duplication in state
5. Avoid deeply nested state

**Point =>** This is similar to how a database engineer might want to `normalize` the database structure to reduce the chance of bugs.

`Mirroring props into state **only** makes sense when you want to ignore all updates for a specific prop. =>`

```js
function Message({ initialColor }) {
  // The `color` state variable holds the *first* value of `initialColor`.
  // Further changes to the `initialColor` prop are ignored.
  const [color, setColor] = useState(initialColor); }
```

**Single source of truth =>** `For each unique piece of state, you will choose the component that “owns” it. This principle is also known as having a “single source of truth”. It doesn’t mean that all state lives in one place—but that for each piece of state, there is a specific component that holds that piece of information. Instead of duplicating shared state between components, lift it up to their common shared parent, and pass it down to the children that need it.`

**Thinking in react =>** [https://react.dev/learn/thinking-in-react]

**NOTE :** When you want to coordinate two components(coordination could be in same fashion on exactly different fashion), move their state to their common parent.



-----

## Preserving and Resetting State

State is isolated between components. React keeps track of which state belongs to which component based on their place in the UI tree. You can control when to preserve state and when to reset it between re-renders.

 => State doesn’t live inside your component’s code — it lives inside React. React keeps track of which state belongs to which component by remembering where that component is in the UI tree. Think of it like: Your component says, “I need a box to store this value.” React owns the storage boxes and puts them in the right spot in a big shelf (the render tree). When your component is rendered again, React goes to the same shelf spot and gives you your box back.

**NOTE :** In React, each component on the screen has fully isolated state. Even if you render/useInUI this component 10 times, each component will get it's own, independent state(s).

























