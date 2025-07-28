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

-----

React apps are made out of components. 
**Component =>** React components are JavaScript functions that return markup. A component is a piece of the UI that has its own logic and appearance. A component can be as small as a button, or as large as an entire page.

**NOTE :** React component names must always start with a capital letter, while HTML tags must be lowercase.

**NOTE :** In React, you specify a CSS class with className. It works the same way as the HTML class attribute

```js
// React components
function MyButton() {
  return (
    <button>
      I'm a button
    </button>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}
```

**NOTE :** The markup syntax we use in React components JSX (optional) => used by most react projects.

JSX lets you put markup into JS. Curly braces `{}` let you “escape back” into JS so that you can embed some `variable/inner content` from your code. We can also “escape into JS” from JSX attributes using `{}`.

#### Conditional rendaring

```js
<div>
  {isLoggedIn ? (                   // OR if we just want AdminPanel if loggedIn then => {isLoggedIn && <AdminPanel>}
    <AdminPanel />
  ) : (
    <LoginForm />
  )}
</div>
```

#### Rendering List
You will rely on JS features like for loop and the array map() function to render lists of components.

```js
product is an array of objects => object containing title & id.
const listItems = products.map(product =>
  <li key={product.id}>           //  For each item in a list, you should pass a string or a number that uniquely identifies that item among its siblings. Usually this key comes from DB
    {product.title}
  </li>
);

return (
  <ul>{listItems}</ul>
);
```

#### Responding to events 

You can respond to events by declaring event handler functions inside your components.

```js
return (
    <button onClick={handleClick}>         // Do not call the event handler function, just pass it.
      Click me
    </button>
  );
```

#### Updating the screen 
Often, we want our component to “remember” some information and display it.

Functions starting with use are called Hooks. `useState` is a built-in Hook provided by React. We can also write our own Hooks by combining the existing ones.

**NOTE :**  If you want to use useState in a condition or a loop, extract a new component and put it there. Beacuse React expects the order of hooks to be the same every render so if we put hooks in side some condition (if, for loop) so the order is inconsistent.

#### Pass props

```js
export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update together</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}
function MyButton({count,onClick}){
return (
<button onClick ={onClick}>
Count is {count}
</button>
)
}
```
















