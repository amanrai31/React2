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

### 2. Caching expensive calculations 

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

```js
function List({ items }) {                        // Suppose i want to change only the selection state(to null) when item prop is changed.
  const [isReverse, setIsReverse] = useState(false);
  const [selection, setSelection] = useState(null);

  const [prevItems, setPrevItems] = useState(items);
  if (items !== prevItems) {
    setPrevItems(items);
    setSelection(null);
  }
  // ...
}
```

**Simple READ :** [https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes]

### 4. Sharing logic between event handlers

`When you’re not sure whether some code should be in an Effect or in an event handler, ask yourself why this code needs to run. Use Effects only for code that should run because the component was displayed to the user.` => Suppose a notification should appear because the user pressed the button, not because the page was displayed! Delete the Effect and put the shared logic into a f/n called from event handler.

=> Suppose you have to send a POST request on page mount then it's good to call POST api inside EFFECT but if you are willing to call POST on some event like form submission then you MUST do it inside handlers.

**Initializing the application  =>** Some logic should only run once when the app loads.

#### Passing data to parent

When child components update the state of their parent components in Effects, the data flow becomes very difficult to trace. Since both the child and the parent need the same data, let the parent component fetch that data, and pass it down to the child instead

```js
 const [data, setData] = useState(null);
  // ...
  return <Child onFetched={setData} />;
}

function Child({ onFetched }) {
  const data = useSomeAPI();     // Lift it up to parent and pass data as prop to childern instead of fetching data in child & updating parent using some callback 
  //  Avoid: Passing data to the parent in an Effect
  useEffect(() => {
    if (data) {
      onFetched(data);
    }
  }, [onFetched, data]);
  
}
```
















-----


**Again :** If you want to use plain JS variable/array etc. inside a component, make sure that is dependent on or should have some sort of relation with state so that when component re-renders then the variable is in sync with state otherwise, it will reset its value on every render. OR we can declare it outside the component(that way it will be immune to component renders).


**MORE ON REACT (REACT REFERENCE)** => [https://react.dev/reference/react]

Learn FORM, CSS Positioning, Storage

-----
