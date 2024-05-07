## Components/cards, Props and A bit Tailwind

We use name className for tailwind classes.
Tailwind is automatic responsive.

React does not segregate file structure based on tech like html, css , js file, In React we make components and focus on component reusability (html,css,js all in one component). And we reuse components using *props*.

1. Making components/card.
2. Passing props (from main.tsx to component.jsx)
3. Setting default value for the props

If btnText props not passed than in - `{props.btnText || 'Click me!' }` 'Click me!' will be default value.

Want to pass object or array in Props? Wrap them in variable and then pass.