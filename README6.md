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

**NOTE :** The function you wrap in useMemo runs during rendering, so this only works for `pure calculations`. So, if you declare some function which calculates something during rendering then we should memoize that function.

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
  const data = useSomeAPI();     // Lift it up to parent and pass data as prop to children instead of fetching data in child & updating parent using some callback 
  //  Avoid: Passing data to the parent in an Effect
  useEffect(() => {
    if (data) {
      onFetched(data);
    }
  }, [onFetched, data]);
  
}
```

### Fetching Data

```js
function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // 🔴 Avoid: Fetching without cleanup logic => will cause RACE CONDITION
    fetchResults(query, page).then(json => {
      setResults(json);
    });
  }, [query, page]);

  function handleNextPageClick() {
    setPage(page + 1);
  }
  // ...
}
```

Here we can not put the logic into the event handlers as typing event is not only the main reason to fetch. Search inputs are often prepopulated from the URL, and the user might navigate Back and Forward without touching the input. `It doesn’t matter where page and query come from. While this component is visible, you want to keep results synchronized with data from the network for the current page and query. This is why it’s an Effect.`


Imagine you type "hello" fast. Then the query will change from "h", to "he", "hel", "hell", and "hello". This will kick off separate fetches, but there is no guarantee about which order the responses will arrive in. `This is called a “race condition”: two different requests “raced” against each other and came in a different order than you expected.` => To fix the race condition, we need to add a cleanup function to ignore stale responses:

**NOTE :** `React render creates a closure: useEffect works with closures, and every render gets its own snapshot of variables and state. i.e. every fetch has it's own boolean flag`

```js
function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    let ignore = false;
    fetchResults(query, page).then(json => {
      if (!ignore) {
        setResults(json);
      }
    });
    return () => {
      ignore = true;
    };
  }, [query, page]);

  function handleNextPageClick() {
    setPage(page + 1);
  }
  // ...
}
```

### Cache

```
function SearchResults({ query }) {
  const [page, setPage] = useState(1);
  const params = new URLSearchParams({ query, page });
  const results = useData(`/api/search?${params}`);

  function handleNextPageClick() {
    setPage(page + 1);
  }
  // ...
}

const cache = {};

function useData(url) {                                  // CUSTOM HOOK
  const [data, setData] = useState(cache[url] ?? null);

  useEffect(() => {
    let ignore = false;

    if (cache[url]) {
      // ✅ use cached data immediately
      setData(cache[url]);
      return;
    }

    fetch(url)
      .then(res => res.json())
      .then(json => {
        if (!ignore) {
          cache[url] = json; // ✅ store in cache
          setData(json);
        }
      });

    return () => {
      ignore = true;
    };
  }, [url]);

  return data;
}

```

You’ll likely also want to add some logic for error handling and to track whether the content is loading. In general, whenever you have to resort to writing Effects, keep an eye out for when you can extract a piece of functionality into a custom Hook with a more declarative and purpose-built API like useData above. 

-----


