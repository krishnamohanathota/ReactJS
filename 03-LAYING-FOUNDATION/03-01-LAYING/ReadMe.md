Install the Dependencies

    - npm install

Start the project (Dev Build)

    - npm start
    - npm run start

    Above commands are same as `npx parcel index.html`. As we have added `start` script in `package.json`

PROD Build (Production Build)

    - npm run build

#Notes:

- ReactElement is not an HTML element
- ReactElement is a plain object. When we render it, React will create the corresponding HTML element
- ReactElement is a description of what you want to see on the screen
- ReactElement is a lightweight description of what to render

#JSX

- JSX is a JavaScript syntax extension
- JSX is not a necessity to write React applications. It is just a convenient tool that helps to write React code faster
- We can write React without JSX, but JSX makes React a lot more elegant
- JSX is closer to JavaScript than to HTML
- JSX is not part of React. It is a separate project called Babel
- JSX is a convention to merge HTML and JavaScript together
- JSX is HTML like syntax that gets transformed to lightweight JavaScript objects
- JSX produces ReactElements
- How to create h1 element using JSX ?

  - `const element = <h1>Hello World</h1>`

  This is NOT writing HTML inside a JavaScript. This is JSX.

- Below two are same

  ```
  React approach: const heading = React.createElement("h1", { id: "heading" }, "Hello World");
  JSX approach : const element = <h1 id="heading">Hello World</h1>;
  ```

  #Transpiling

  - Parcel will transform JSX to React.createElement.
  - Parcel use `Babel` to transform JSX to React.createElement
  - `Babel` is a JavaScript compiler

- If you have to give attributes, you have to use `className` instead of `class` as `class` is a reserved keyword in JavaScript. In HTML we use `class` but in JSX we use `className`

  ```
  const jsxHeading = <h1 className="heading">Hello World - JSX</h1>;

  above will be converted to below by Babel

  <h1 class="heading">Hello World - JSX</h1>;
  ```

- If we want to write JSX in multiple lines, we have to wrap it in parenthesis

  ```
  const jsxHeading = (
    <h1 className="heading">
      Hello World - JSX
    </h1>
  );
  ```
