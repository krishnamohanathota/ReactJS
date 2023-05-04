Install the Dependencies

    - npm install

Start the project (Dev Build)

    - npm start
    - npm run start

    Above commands are same as `npx parcel index.html`. As we have added `start` script in `package.json`

PROD Build (Production Build)

    - npm run build

#React Components:

- React Component is a function or a class which optionally accepts input and returns a ReactElement
- React Compoent is just a normal JavaScript function
- Everyting in React is a component
- React Component name should always start with a capital letter
- There are two types of components in React

  - Functional Component (NEW way of writing components)

    - It is just a normal JavaScript function which accepts props as an argument and returns some JSX (ReactElement)

    ```javascript
    const HeadingComponent = () => {
      return <h1 className="heading">Hello World - JSX</h1>;
    };
    ```

    - When there is a single line of JSX, we can remove the curly braces and return keyword. Below 3 ways are same

    ```javascript
    const HeadingComponent = () => {
      return <h1 className="heading">Hello World - JSX</h1>;
    };
    ```

    ```
    const HeadingComponent1 = () => <h1 className="heading">Hello World - JSX</h1>;
    ```

    ```javascript
    const HeadingComponent2 = () => (
      <h1 className="heading">Hello World - JSX</h1>
    );
    ```

  - Class based Components (OLD way of writing components)
    - It is a class which extends React.Component class and returns a ReactElement.
    - Why we need to extend `React.Component` class? Because `React.Component` class has all the methods which are required to create a React Component.

- How Functional Component is rendered?

  - Functional Component is rendered by calling it as a function. Below are the 3 ways of calling a Functional Component

    ```javascript
    const HeadingComponent = () => {
      return <h1 className="heading">Hello World - JSX</h1>;
    };

    // 1. Calling as a function
    HeadingComponent();

    // 2. Calling as a JSX
    <HeadingComponent />;

    // 3. Calling as a ReactElement
    React.createElement(HeadingComponent);
    ```

- What is Functional Composition?

  - Functional Composition is a way of combining multiple functions to create a new function.
  - In React, we can combine multiple components to create a new component. This is called as Functional Composition.

- How to write JavaScript inside JSX?

  - We can write JavaScript inside JSX by wrapping it inside curly braces `{}`.
  - We can write any valid JavaScript inside JSX. Below are the few examples

    ```javascript
    const HeadingComponent = () => {
      const name = "John";
      const age = 30;
      const isLoggedIn = true;
      const numbers = [1, 2, 3, 4, 5];
      const user = {
        name: "John",
        age: 30,
      };
      const greet = () => {
        return "Hello World";
      };
      return (
        <div>
          <h1 className="heading">Hello World - JSX</h1>
          <h2>{name}</h2>
          <h2>{age}</h2>
          <h2>{isLoggedIn}</h2>
          <h2>{numbers}</h2>
          <h2>{user}</h2>
          <h2>{greet()}</h2>
        </div>
      );
    };
    ```

- How to write ReactElements inside JSX

  - We can write ReactElements inside JSX by wrapping it inside curly braces `{}`.
  - We can write any valid ReactElement inside JSX. Below are the few examples

    ```javascript
    const heading = <h1 className="heading">Hello World - React Element</h1>;
    const HeadingComponent = () => {
      return (
        <div>
          <h1>{heading}</h1>
        </div>
      );
    };
    ```

- How JSX handles cross site scripting (XSS)?

  - By default, JSX prevents cross site scripting (XSS) attacks.
  - It escapes all the values embedded in JSX before rendering them.
  - It ensures that you can never inject anything that’s not explicitly written in your application.
  - Below is an example of XSS attack

    ```javascript
    const name = "<script>alert('Hello World')</script>";
    const HeadingComponent = () => {
      return (
        <div>
          <h1>{name}</h1>
        </div>
      );
    };
    ```

    when using this HeadingComponent, you'll see the text "<script>alert('Hello World')</script>" displayed inside the h1 element, without any alert popping up.

  - It is important to note that this is safe in React. By default, React DOM escapes any values embedded in JSX before rendering them. Thus it ensures that you can never inject anything that’s not explicitly written in your application. Everything is converted to a string before being rendered. This helps prevent XSS (cross-site-scripting) attacks.

- JSX expression should have only one parent element

  - JSX expression should have only one parent element. Below are the examples of valid and invalid JSX expressions

    ```javascript
    // Valid JSX expression
    const HeadingComponent = () => {
      return (
        <div>
          <h1>Hello World</h1>
          <h2>Hello World</h2>
        </div>
      );
    };

    // Invalid JSX expression
    const HeadingComponent = () => {
      return (
        <h1>Hello World</h1>
        <h2>Hello World</h2>
      );
    };
    ```

  - What is the solution for this? We can wrap the JSX expression inside a `React.Fragment`. `React.Fragment` is a built-in component in React which is used to wrap multiple elements. React.Fragment is not rendered in the DOM. It is just used to wrap multiple elements.
    ```javascript
    // Valid JSX expression
    const HeadingComponent = () => {
      return (
        <React.Fragment>
          <h1>Hello World</h1>
          <h2>Hello World</h2>
        </React.Fragment>
      );
    };
    ```
  - React Fragement can be written in short form as `<> </>`. Below is the example

    ```javascript
    // Valid JSX expression
    const HeadingComponent = () => {
      return (
        <>
          <h1>Hello World</h1>
          <h2>Hello World</h2>
        </>
      );
    };
    ```

  - Instead of React.Fragment, we can also use `div` tag to wrap multiple elements. But the problem with this approach is, it will add an extra `div` tag in the DOM. So, it is better to use `React.Fragment` or `<> </>` to wrap multiple elements.

- Your react code is readble as your are using JSX. But the browser doesn't understand JSX. So, we need to convert JSX to JavaScript. This is done by using Babel. Babel is a JavaScript compiler which converts JSX to JavaScript.
