# EASCAPE HATCHES

## You Might Not Need an Effect

- Why and how to remove unnecessary Effects from your components
- How to cache expensive computations without Effects
- How to reset and adjust component state without Effects
- How to share logic between event handlers
- Which logic should be moved to event handlers
- How to notify parent components about changes

**Removing unnecessary Effects will make your code easier to follow, faster to run, and less error-prone.**









-----


**Again :** If you want to use plain JS variable/array etc. inside a component, make sure that is dependent on or should have some sort of relation with state so that when component re-renders then the variable is in sync with state otherwise, it will reset its value on every render. OR we can declare it outside the component(that way it will be immune to component renders).


**MORE ON REACT (REACT REFERENCE)** => [https://react.dev/reference/react]

Learn FORM, CSS Positioning, Storage

-----
