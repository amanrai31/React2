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




































