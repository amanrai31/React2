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
- useReducer, reducer f/n, USE of REDUCER, dispatch, implement useReducer from scratch, useImmerReducer
- passing data deep with context(CSS property inheritence analogy) || createContext, useContext, USE of CONTEXT
- Scaling Up with Reducer and Context

-----

- ESCAPE HATCHES (step outside React and communicate with external APIs)
- useRef (state variable without setter f/n), USE of REF
- useRef => stepOutside react(external APIs, store timers & manipulate DOM) || scrollIntoView(), focus()
- access other component DOM nodes using useRef (do not work during rendering => flushSync)
- useEffect, USE || (SIDE EFFECT caused by rendering)
- logic inside component (1. rendering (pure)- return JSX || 2. side effects - triggered by handlers OR rendering)
- EFFECT => declare, dependencyArray, cleanup(leakage) => when cleanUp needed & when not
- In dev (react mounts, unmounts & then mounts), not in prod.
- fetching data in useEffect || DOWNSIDES => n/w waterfall, no-cache, RACE CONDITION

-----

- Remove unnecessary Effects (Calculate during rendering iff possible)
- Cache/memoize function (if it calculates something during rendering) || All memoization is caching, but not all caching is memoization.
- Resetting "all" state when a prop changes || Resetting "some" state when a prop changes
- Put/share Effect logic in event handlers (iff possible)
- Fetching data inside EFFECT, avoid RACE CONDITION (using boolean flag), cache, memoization

-----

- HOOKS => useState, useReducer, useContext, useRef, useEffect, useMemo, useCallback etc.












