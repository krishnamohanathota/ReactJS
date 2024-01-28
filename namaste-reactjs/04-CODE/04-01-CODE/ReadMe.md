Install the Dependencies

    - npm install

Start the project (Dev Build)

    - npm start
    - npm run start

    Above commands are same as `npx parcel index.html`. As we have added `start` script in `package.json`

PROD Build (Production Build)

    - npm run build

#How to add inline css to JSX

    - <div style={{color: 'red'}}></div>
    - <div style={{color: 'red', fontSize: '20px'}}></div>
    - <div style={{color: 'red', fontSize: '20px', backgroundColor: 'black'}}></div>

#Props (Properties)

    - Props are immutable
    - Props are used to pass data from parent component to child component
    - Passing arguments to a function
    - Passing Dynamic data to a component

#Destructuring props in a functional component

- using {} in function parameter

```js
const Person = ({ name, age }) => {
  return (
    <h1>
      My name is {name} and my age is {age}
    </h1>
  );
};
```

- using {} in function body

```js
const Person = (props) => {
  const { name, age } = props;
  return (
    <h1>
      My name is {name} and my age is {age}
    </h1>
  );
};
```

#Config Driven UI

- We can use config driven UI to make our code more dynamic and reusable

#Optional Chainning

- Optional chaining is a newer syntax that can help with this problem in many cases.
- The optional chaining ?. stops the evaluation if the part before ?. is undefined or null and returns undefined.

```js
const person = {
  name: "John",
  age: 30,
  address: {
    city: "New York",
    country: "USA",
  },
};

console.log(person?.address?.city); // New York
console.log(person?.address?.country); // USA
console.log(person?.address?.street); // undefined
```

- Below two approaches are same.

  - Map is a recommended approach to iterate over an array and return a new array.
  - ForEach is a recommended approach to iterate over an array and perform some action on each element of the array. Here ForEach is not returning anything. So we are using push to add the element to the array

  ```js
  const BodyComponent = () => {
    return (
      <div className="body-container">
        <h2>Search</h2>
        {reslist.map((res) => (
          <RestaurantCard resData={res} />
        ))}
      </div>
    );
  };
  ```

  ```js
  const BodyComponent1 = () => {
    const resnewlist = [];

    return (
      <div className="body-container">
        <h2>Search</h2>
        {reslist.forEach((res) => {
          resnewlist.push(<RestaurantCard resData={res} />);
        })}
        {resnewlist}
      </div>
    );
  };
  ```

#Keys in React

- Keys help React identify which items have changed, are added, or are removed.
- We don’t recommend using indexes for keys if the order of items may change.
- Keys used within arrays should be unique among their siblings.
- Keys serve as a hint to React but they don’t get passed to your components.
- If no key is specified, React will present a warning and use the array index as a key by default.
- Index as a key is an anti-pattern:
  - https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318
  - https://robinpokorny.com/blog/index-as-a-key-is-an-anti-pattern/
