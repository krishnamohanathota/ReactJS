## Install dependencies

```bash
npm install
```

## Start the application

```bash
npm start
```

This application was bootstrapped with [Create React App]

```sh
npx create-react-app@5 example6-pizza-menu
```

## React Components

- React Application is entirely made out of components.
- Buliding blocks of user interface in React.
- Piece of UI that has its own data, logic, and appearance.
- We build complex UI by building small components and combining them together.
- Components can be reused, nested, and pass data between them.
- Components can be reused using props by passing data to them.
- Components return JSX, which ultimately gets translated into HTML elements in the browser. However, it's important to note that JSX is not directly HTML. It's a syntax extension that allows you to write code that resembles HTML but with additional capabilities like embedding JavaScript expressions and working with component state.

## JSX

- JSX is a syntax extension for JavaScript which allows us to embed Javascript, CSS and React components into HTML.
- It's a syntax that allows us to write code that resembles HTML but with additional capabilities like embedding JavaScript expressions and working with component state.
- Components must return a block of JSX.
- Each JSX will be translated into a React.createElement() function call. This will be done by Babel.

```jsx
//JSX
const element = <h1>Hello, world!</h1>;

// It converts to
const element = React.createElement("h1", null, "Hello, world!");
```

- JSX shouldn't contain the statements, only expressions.

```jsx
//JSX
const element = <h1>Hello, {name}</h1>;

// It converts to
const element = React.createElement("h1", null, "Hello, ", name);
```

```jsx
//Inavlid JSX
const element = (
  if (name) {
    <h1>
      Hello, {name}
    </h1>
  }
);
```

You can't use if statements or any other JavaScript statements directly within the JSX markup. Instead, you should use JavaScript expressions and conditional rendering to conditionally include JSX elements.

```jsx
//Valid JSX
const element = <div>{name && <h1>Hello, {name}</h1>}</div>;
```

## Props

- Props are a way to pass data from parent to child components.
- Props are read-only and cannot be modified by the child component.
- Props are passed as attributes to the component.
- With props, parent component control how the child component look and work.

![](../images/props.png)

### ONE WAY DATA FLOW

- In React, data flows in one direction, from parent to child.
- This means that a child component can't change the data it receives from the parent.
- This is why props are read-only.
- This is called one-way data flow.
- This makes it easier to understand how data is passed around the application.
- It also makes it easier to understand how changes to the data will affect the application's state.
- This is a core concept in React.
