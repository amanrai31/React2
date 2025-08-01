# CONTENT => REACT Component

## Component

Component => React components are JS functions that return JSX markup. A component is a piece of the UI that has its own logic and appearance. A component can be as small as a button, or as large as an entire page.

**NOTE :** React component names must always start with a capital letter, while HTML tags must be lowercase.

```js
export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```
What browser sees => <section> is lowercase, so React knows we refer to an HTML tag. <Profile /> starts with a capital P, so React knows that we want to use our component called Profile

```html
<section>
  <h1>Amazing scientists</h1>
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
</section>
```

-----

## Importing & exporting components

There are two primary ways to export values with JS: `default exports` and `named exports`. So far, our examples have only used default exports. 
But you can use `default exports` OR `named exports` OR `both of them(MIXED)` in the same file. A file can have `no more than one default export`, but it can have as many named exports as you like.


- Default => Export statement => `export default function Button() {}` || Import statement => `import Button from './Button.js';` (While importing we can use any name instead of Button)

- Named => Export statement => `export function Button() {}` || Import statement => `import {Button} from './Button.js';` (While importing we must have to give Exact name which is exported, that's why they are `named export`)


**NOTE :** In your project, try to stick with one way => either `default export` or `named export`. Though we can use the mixed export too.

-----

## JSX

JSX is simply putting markup into JS. Tt's just a plain JS object representing a virtual DOM node.

JSX elements aren’t “instances” because they don’t hold any internal state and aren’t real DOM nodes. They’re lightweight descriptions, like blueprints(Virtual-DOM).

**NOTE :** JSX and React are two separate things. They’re often used together, but you can use them independently of each other. JSX is a syntax extension, while React is a JS library.

Rules of JSX =>

1. To return multiple elements from a component, wrap them with a single parent tag. (Use either `<div></div>` OR just `<></>`)

**NOTE :** This empty tag`<></>` is called a Fragment. Fragments let you group things without leaving any trace in the browser HTML tree.  

**NOTE :** JSX looks like HTML, but under the hood it is transformed into plain JS objects. You can’t return two objects from a function without wrapping them into an array. This explains why you also can’t return two JSX tags without wrapping them into another tag or a Fragment.

2. Close all the tags => self-closing tags `<img />` || wrapper tags `<li></li>`

3. All things in camalCase

JSX turns into JS and `attributes` written in JSX become `keys of JS objects`. But JS has limitations on variable names. For example, their names can’t contain dashes or be reserved words like class. That is why we use `className` instead of `class` & `strokeWidth` instead of `stroke-width`

**NOTE :** For historical reasons, `aria-*` and `data-*` attributes are written as in HTML with dashes.  

### JS in JSX with curly Braces

- When you want to pass a string attribute to JSX, you put it in single or double quotes. But what if you want to dynamically specify the src or alt text => Curly beace `{}` is the key & A window into the JS world 

- In addition to strings, numbers, and other JavaScript expressions, you can even pass objects in JSX. We often see this in style attribute. So the next time you see `{{` and `}}` in JSX, know that it’s nothing more than an object inside the JSX curlies!

**NOTE :** Inline style properties are written in camelCase. For example, HTML <ul style="background-color: black"> would be written as <ul style={{ backgroundColor: 'black' }}>  in your component.

-----

## Passing prop to a component

React components use props to communicate with each other. Every parent component can pass some information to its child components by giving them props. We can pass any JS value through them including object, array & function

**NOTE :**  React component functions accept a single argument, a props object.

```js
function Avatar({ person, size =100 }) {    // This syntax is “destructuring”(same as below) and is equivalent to reading properties from a f/n parameter. Also we can give default value for a prop.
  // ...
}

function Avatar(props) {   
  let person = props.person;
  let size = props.size;
  // ...
}

// NOTE => The default value is only used if the size prop is missing or if you pass size={undefined}. But if you pass size={null} or size={0}, the default value will not be used.

```

#### Passing JSX as childern

```js
function Card({ children }) {     // Will recive Avatar in a prop called children
  return (
    <div className="card">
      {children}
    </div>
  );
}
```
```js
<Card>
  <Avatar />                     // equivalent to <div> <img/> </div>. Also we can pass any arbitary text instead of Avatar, Card component will wrap this too. Means they are very flexible
</Card>

```

**NOTE :**  props are immutable. When a component needs to change its props (for example, in response to a user interaction or new data), it will have to “ask” its parent component to pass it different props—a new object! Its old props will then be cast aside, and eventually the JS engine will reclaim the memory taken by them.



-----

## Conditional redering

- use `if-else` || `ternary` || `&&` => depends on use case OR We can conditionally save some JSX to a variable and then include it inside other JSX by using the curly braces.

**NOTE :** a common mistake is to write code like messageCount && <p>New messages</p>. It’s easy to assume that it renders nothing when messageCount is 0, but it really renders the 0 itself! To fix it, make the left side a boolean: messageCount > 0 && <p>New messages</p>.


-----

## Rendaring Lists

We often want to display multiple similar components from a collection of data. Use JS array methods to manipulate array of DATA like `map()`, `forEach()`, `filter()` etc.

```js
const listItems = chemists.map(person =>
  <li>...</li> // Implicit return!
);
```

**NOTE :** Arrow functions implicitly return the expression right after =>, so you didn’t need a return statement. However, you must write return explicitly if your => is followed by a `{ }` curly brace!

**IMPORTANT NOTE :** JSX elements directly inside a map() call always need keys.

**IMPORTANT NOTE :** Keys tell React which array item each component corresponds to, so that it can match them up later. This becomes important if your array items can move (e.g. due to sorting), get inserted, or get deleted. A well-chosen key helps React infer what exactly has happened, and make the correct updates to the DOM tree. So include key in DATA/DB

For more clarity => [https://codesandbox.io/p/devbox/uniquekey-j8m9py?file=%2Fsrc%2FApp.tsx]

----- 

## Keeping components pure

Pure function has 2 main characteristics:

- It minds its own business. It does not change any objects or variables that existed before it was called.
- Same inputs, same output. Given the same inputs, a pure function should always return the same result. (like x = 3y => for y=2, it always return 6)

React is designed around this concept. React assumes that every component you write is a pure function. This means that React components you write must always return the same JSX given the same inputs.

```js
// Pure f/n => for same input it will always give same output
function Recipe({ drinkers }) {
  return (
    <ol>    
      <li>Boil {drinkers} cups of water.</li>
      <li>Add {drinkers} spoons of tea and {0.5 * drinkers} spoons of spice.</li>
      <li>Add {0.5 * drinkers} cups of milk to boil and sugar to taste.</li>
    </ol>
  );
}

export default function App() {
  return (
    <section>
      <h1>Spiced Chai Recipe</h1>
      <h2>For two</h2>
      <Recipe drinkers={2} />
      <h2>For a gathering</h2>
      <Recipe drinkers={4} />
    </section>
  );
}
```

```js
// Impure f/n => Can produce diffrent JSX even for the same input

let guest = 0;

function Cup() {
  // Bad: changing a preexisting variable!
  guest = guest + 1;
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup />
      <Cup />
      <Cup />
    </>
  );
}

```

React offers a “Strict Mode” in which it calls each component’s function twice during development. By calling the component functions twice, Strict Mode helps find components that break these rules. You can wrap your root component into <React.StrictMode>. Some frameworks do this by default.

**NOTE :** However, it’s completely fine to change variables and objects that you’ve just created while rendering(inside the function itself).

**NOTE :** Even though event handlers are defined inside your component, they don’t run during rendering! So event handlers don’t need to be pure.(They have to change something which is out of thier scope)

**NOTE :** You should not mutate any of the inputs that your components use for rendering. That includes `props`, `state`, and `context`. To update the screen, “set” state instead of mutating preexisting objects.

**NOTE :** Strive to express your component’s logic in the JSX you return. When you need to “change things”, you’ll usually want to do it in an event handler. As a last resort, you can useEffect
