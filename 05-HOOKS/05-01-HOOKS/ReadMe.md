Install the Dependencies

    - npm install

Start the project (Dev Build)

    - npm start
    - npm run start

    Above commands are same as `npx parcel index.html`. As we have added `start` script in `package.json`

PROD Build (Production Build)

    - npm run build

# Exports

- Default Export

  Used when you want to export **only one** thing from a file.
  Module can have only one default export.

  - `export default App;`
  - `import App from './App';`

- Named Export

  - Used when you want to export **multiple** things from a file.
  - Example
    `export const App = () => {};`

  - `export const App = () => {};`
  - `import { App } from './App';`

# React Hooks

- Hooks are the functions which lets you hook into React state and lifecycle features from function components.
- Functions whose name starts with `use` are called hooks.
- Don't call hooks inside loops, conditions or nested functions. Instead always use hooks at the top level of your React function.
- Call them at the top level in the body of a function component.

```js
function Counter() {
  // ✅ Good: top-level in a function component
  const [count, setCount] = useState(0);
  // ...
}
```

# useState

- `useState` is a Hook that lets you add React state to function components.
- In classes, the state is always an object.
- With the `useState` hook, the state doesn't have to be an object.
- The `useState` hook returns an **array** with 2 elements.

  - The first element is the current value of the state.
  - The second element is a state setter function.

  ```js
  const [count, setCount] = useState(0);
  ```

  This is array destructuring. Without array destructuring, the above code would look like this:

  ```js
  const state = useState(0);
  const count = state[0];
  const setCount = state[1];
  ```

- New state value depends on the previous state value? You can pass a function to the setter function.
- `useState` is a Hook, which means you can use it only inside a function component and not inside regular JavaScript functions.
- `useState` is a named export from the `react` package.

# Reconscialiation

- React keeps two copies of the DOM. The first copy is the real DOM shown on the screen. The second copy is the virtual DOM. The virtual DOM is a copy of the real DOM. React uses the virtual DOM to find out what changes need to be made in the real DOM to make it look like the desired result. React then updates the real DOM to make it look like the virtual DOM. This process is called **reconciliation**.
- Unique key is required for each element in the list. This helps React to identify which items have changed, are added or are removed. This helps in efficient reconciliation.

# Virtaul DOM

- Virtaul DOM is a representation of the real DOM in the form of a JavaScript object.
- Virtaul DOM is those React elements
- React keeps two copies of the DOM. The first copy is the real DOM shown on the screen. The second copy is the virtual DOM.
- The virtual DOM is a copy of the real DOM. React uses the virtual DOM to find out what changes need to be made in the real DOM to make it look like the desired result. React then updates the real DOM to make it look like the virtual DOM. This process is called **reconciliation**.

# Diff Algorithm

- React uses the diffing algorithm to find out what changes need to be made in the real DOM to make it look like the desired result. React then updates the real DOM to make it look like the virtual DOM. This process is called **reconciliation**.

# React Fiber (Fiber reconciler)

- React Fiber is a new reconciliation engine in React 16.
- React Fiber is a new virtual DOM algorithm.
- React Fiber is a tree reconciliation process.
- React Fiber is not a reimplementation of React.
- This new reconciliation algorithm from React is called Fiber reconciler.
