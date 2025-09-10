# EASCAPE HATCHES

## You Might Not Need an Effect

- Why and how to remove unnecessary Effects from your components
- How to cache expensive computations without Effects
- How to reset and adjust component state without Effects
- How to share logic between event handlers
- Which logic should be moved to event handlers
- How to notify parent components about changes

**Removing unnecessary Effects will make your code easier to follow, faster to run, and less error-prone.**

### 1. How to remove unnecessary Effects

- You don’t need Effects to transform data for rendering. (like if change in firstName OR lastName will re-render fullName - we do not need effect for this)
- You don’t need Effects to handle user events. (If we have some handler to perform some side effect then we do not need EFFECT) 

**IMPORTANT NOTE :** When something can be calculated from the existing props or state, don’t put it in state. Instead, calculate it during rendering. This makes your code faster.

### Caching expensive calculations 

```js
function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');
  // ✅ This is fine if getFilteredTodos() is not slow.
  const visibleTodos = getFilteredTodos(todos, filter);
  // ...
}
```

Suppose getFilteredTodos() is slow or you have a lot of todos. It runs every time if any state in component gets changed. You can cache (or “memoize”) an expensive calculation by wrapping it in a useMemo Hook.

**NOTE :** React Compiler can automatically memoize expensive calculations for you, eliminating the need for manual useMemo in many cases.

```js
function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');
  const visibleTodos = useMemo(() => getFilteredTodos(todos, filter), [todos, filter]); // Only runs when todos OR filter get changed
  // ...
}
```

**NOTE :** The function you wrap in useMemo runs during rendering, so this only works for `pure calculations`.

### 3a. Resetting all state when a prop changes 

Suppose we have a comment section but when you navigate from one profile to another(PASSING userId as prop), the comment state does not get reset. Instead of using EFFECT, you can tell React that each user’s profile is conceptually a different profile by giving it an explicit `key`. 

**NOTE :** Normally, React preserves the state when the same component is rendered in the same spot. By passing `userId as a key` to the Profile component, you’re asking React to treat two Profile components with different userId as two different components that should not share any state


### 3b. Adjusting some state when a prop changes 

**Simple READ :** [https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes]

### 4. Sharing logic between event handlers
























-----


**Again :** If you want to use plain JS variable/array etc. inside a component, make sure that is dependent on or should have some sort of relation with state so that when component re-renders then the variable is in sync with state otherwise, it will reset its value on every render. OR we can declare it outside the component(that way it will be immune to component renders).


**MORE ON REACT (REACT REFERENCE)** => [https://react.dev/reference/react]

Learn FORM, CSS Positioning, Storage

-----
