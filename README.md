# React2

## 01hooks (Hooks- useState)
1. Hooks
2. REACT-FIBER
3. Reconciliation 

More on Reconciliation, React-Fiber =>  Lecture 6 of chai & react (HC)

## props_and_tailwind  (Component/cards reusability, Props)
1. Making components/card.
2. Passing props (from App.tsx to component.jsx)
3. Setting default value for the props.
4. Pass Array or object in Props.

## 03bg_color_project 
1. onClick- It expects the function only not the function reference or the return value of that function - This is a SYNTAX problem. But when we pass like this `onClick={setColor("red)}` then `setColor("red)` will return a value which is not acceptable for onClick.
2. onClick- `onClick={() => setColor("red")}` here we are just providing arrow f/n OR callback, which is calling another f/n i.e. setColor f/n. 

#### rfce - shortcut for react functional component

More about useState hook- presetcounter(callback in useState)- Lecture 8 of chai & react (HC).