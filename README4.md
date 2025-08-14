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

### State is tied to a position in the render tree 

State is isolated between components. React keeps track of which state belongs to which component based on their place in the UI tree. You can control when to preserve state and when to reset it between re-renders.

 => State doesn’t live inside your component’s code — it lives inside React. React keeps track of which state belongs to which component by remembering where that component is in the UI tree. Think of it like: Your component says, “I need a box to store this value.” React owns the storage boxes and puts them in the right spot in a big shelf (the render tree). When your component is rendered again, React goes to the same shelf spot and gives you your box back.

**NOTE :** In React, each component on the screen has fully isolated state. Even if you render/useInUI this component 10 times, each component will get it's own, independent state(s).

**IMPORTANT NOTE :** React will keep the state around for as long as you render the `same component` at the `same position` in the tree. When React removes a component, it destroys its state.

Link => [https://react.dev/learn/preserving-and-resetting-state#state-is-tied-to-a-position-in-the-tree]

**Same component at the same position preserves state** 

**Different components at the same position reset state** => Diff components inside some condition, switching between them will reset the state.

**NOTE :** If you want to preserve the state between re-renders, the structure of your tree needs to “match up” from one render to another. If the structure is different, the state gets destroyed because React destroys state when it removes a component from the tree.

**NOTE :** You should not nest component function definitions inside some other component.

### Resetting state at the same position

1. Render components in different positions

```js
<div>
      {isPlayerA &&
        <Counter person="Taylor" />
      }
      {!isPlayerA &&
        <Counter person="Sarah" />
      }
</div>
```

2. Give each component an explicit identity with key => Specifying a key tells React to use the key itself as part of the position, instead of their order within the parent

```js
<div>
      {isPlayerA ? (
        <Counter key="Taylor" person="Taylor" />
      ) : (
        <Counter key="Sarah" person="Sarah" />
      )}
</div>
```

-----

## Extracting State Logic into a Reducer

**reduce syntax =>** `array.reduce(function(total, currentValue, currentIndex, arr), initialValue)` => currentIndex, arr & initialValue are optional.

**NOTE :** Normally, array element 0 `(index:0)` is used as `initial value`, and the iteration starts from array element 1(index: 1). If an initial value is supplied, this is used, and the iteration starts from array element 0(index :0). ( 🇮🇳)

If a state variable is getting updated by many event handlers, as the code grows it can get complicated. Reducers are a different way to handle state. You can migrate from `useState` to `useReducer` in three steps =>

1. Move from setting state to dispatching actions.
2. Write a reducer function.
3. Use the reducer from your component.

### 1. Move from setting state to dispatching actions 

Your event handlers currently specify what to do by setting state. Remove all the state setting logic. What you are left with are three event handlers.

handleAddTask(text) is called when the user presses “Add”.
handleChangeTask(task) is called when the user toggles(checkbox - done or not) a task or presses “Save”.
handleDeleteTask(taskId) is called when the user presses “Delete”.

=> In reducer instead of telling React “what to do” by setting state (setState f/n), you specify “what the user just did” by dispatching “actions” from your event handlers. 

```js
const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task,                     // task is an element from intialTasks array => {id: 1, text: 'Watch BreakingBad show', done: false},
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  } function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

let nextId = 3;
const initialTasks = [
  {id: 0, text: 'Visit Kafka Museum', done: true},
  {id: 1, text: 'Watch a puppet show', done: false},
  {id: 2, text: 'Lennon Wall pic', done: false},
];
```

The object passes to dispatch is called `action object` => generally it should contain the minimal information about what happened.

**NOTE :** An action object can have any shape. By convention, it is common to give it a `string type` that describes what happened, and pass any additional information in other fields.

### 2. Write a reducer function

















