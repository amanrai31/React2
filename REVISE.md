# Revision

- component, component export
- JSX
- Passing props
- Conditional rendering, rendering list
- Pure components
- UI as tree

-----

- Event, event bubble
- Hooks
- State (component memory), why regulr variable not enough, state is local to component instance(unlike prop)
- Trigger, render & commit => SNAPSHOT
- Queueing/Batching, Updater function
- Updating object/ Updating Array in STATE

-----

- Thinking about UI declaratively(REACT way)
- Choosing the State Structure, avoid unnecessary/duplication of state, STATE MIRRORING
- Preserving and Resetting State (State is tied to a position in the render tree)
- useReducer, reducer f/n, dispatch, implement useReducer from scratch, useImmerReducer
- passing data deep with context(CSS property inheritence analogy) || createContext, useContext
- Scaling Up with Reducer and Context

-----

- ESCAPE HATCHES (step outside React and communicate with external APIs)
- useRef (state variable without setter f/n)
- useRef (store timers & manipulate DOM) || scrollIntoView(), focus()
- access other component DOM nodes using useRef (do not work during rendering => flushSync)
- useEffect (If you want to do something with a ref, but there is no particular event to do it in- SIDE EFFECT caused by rendering)
- logic inside component (1. rendering (pure)- return JSX || 2. side effects - triggered by handlers OR rendering)
- EFFECT => declare, dependencyArray, cleanup(leakage)
- In dev (react mounts, unmounts & then mounts), not in prod.
- fetching data in useEffect (n/w waterfall, no-cache, Race condition)






-----

- HOOKS => useState, useEffect, useRef, useContext, useReducer, useMemo, useCallback etc.












