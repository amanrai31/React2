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













