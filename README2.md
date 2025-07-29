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

JSX is simply putting markup into JavaScript

**NOTE :** JSX and React are two separate things. They’re often used together, but you can use them independently of each other. JSX is a syntax extension, while React is a JS library.

Rules of JSX =>

1. To return multiple elements from a component, wrap them with a single parent tag. (Use either `<div></div>` OR just `<></>`)

**NOTE :** This empty tag`<></>` is called a Fragment. Fragments let you group things without leaving any trace in the browser HTML tree.  

**NOTE :** JSX looks like HTML, but under the hood it is transformed into plain JS objects. You can’t return two objects from a function without wrapping them into an array. This explains why you also can’t return two JSX tags without wrapping them into another tag or a Fragment.

2. Close all the tags => self-closing tags `<img />` || wrapper tags `<li></li>`













