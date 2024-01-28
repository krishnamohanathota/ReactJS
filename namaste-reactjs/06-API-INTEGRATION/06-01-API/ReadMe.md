Install the Dependencies

    - npm install

Start the project (Dev Build)

    - npm start
    - npm run start

    Above commands are same as `npx parcel index.html`. As we have added `start` script in `package.json`

PROD Build (Production Build)

    - npm run build

# useEffect

- `useEffect` is a React Hook that lets you synchronize a component with an external system.
- Let you run some code after the component has been rendered and the DOM updated
- `useEffect` is a function that takes two arguments

  - A function that will be executed after the component has been rendered
  - An array of values that the effect depends on

    ```js
    useEffect(() => {
      // Code to run after render
    }, [dependencies]);
    ```

JavaScript statements are executed line by line. However, with effects, the order of execution is a bit different. The code inside useEffect is executed after the render is committed to the screen. Let’s see this with an example.

```js
import React, { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("useEffect");
    document.title = `You clicked ${count} times`;
  }, [count]);

  console.log("render");

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

When you run this code, you’ll see the following in the console:

```js
render;
useEffect;
```

The render is logged first, and then the useEffect. This is because the render is committed to the screen first, and then the effect runs. If you click the button, you’ll see the following in the console:

```js
render;
useEffect;

render;
useEffect;
```

This is because the render is committed to the screen again, and then the effect runs again. This is the default behavior of useEffect. It runs after every render, including the first render.

## useEffect Dependencies

- The second argument of useEffect is an array of dependencies. This is an optional argument. If you don’t pass it, the effect will run after every render. If you pass an empty array, the effect will only run after the first render. If you pass an array with one or more items, the effect will run after the first render and after every update where one of the dependencies has changed.

## useEffect Cleanup

- The function that you pass to useEffect can optionally return a cleanup function. This function will be executed before the effect runs again, or before the component is removed from the DOM. Let’s see this with an example.

```js
import React, { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("useEffect");
    document.title = `You clicked ${count} times`;

    return () => {
      console.log("cleanup");
    };
  }, [count]);

  console.log("render");

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

When you run this code, you’ll see the following in the console:

```js
render;
useEffect;
```

If you click the button, you’ll see the following in the console:

```js
render;
useEffect;

render;
cleanup;
useEffect;
```

This is because the cleanup function is executed before the effect runs again.

If-Else in JSX

- Below code will not work and throw an error as `if` is a statement and not an expression.

```js
import React from "react";

function App() {
  const isLoggedIn = true;

  return (
    <div>
      {if (isLoggedIn) {
        <p>Welcome</p>;
      } else {
        <p>Please log in</p>;
      }}
    </div>
  );
}
```

You can use the ternary operator instead:

```js
import React from "react";

function App() {
  const isLoggedIn = true;

  return <div>{isLoggedIn ? <p>Welcome</p> : <p>Please log in</p>}</div>;
}
```

## Conditional Rendering

- You can use the ternary operator to conditionally render a component. For example, the following code will render the component only if the isLoggedIn variable is true:

```js
import React from "react";

function App() {
  const isLoggedIn = true;

  return <div>{isLoggedIn && <p>Welcome</p>}</div>;
}
```
