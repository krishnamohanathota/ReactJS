## useState argument

In React, the `argument passed` to useState() is only evaluated during the initial rendering of the component. This means that the logic used to determine the initial state value is executed only once, when the component is first rendered.

we shouldn't use like this.

```jsx
const [isTop, setIsTop] = useState(imdbRating > 8);
```

Instead, we should use a function to determine the initial state value.

```jsx
const [isTop, setIsTop] = useState(false);

useEffect(() => {
  setIsTop(imdbRating > 8);
}, [imdbRating]);
```

or use the derived state pattern.

```jsx
const isTop = imdbRating > 8;
```

## useRef

`useRef` returns a mutable object whose `.current` property is initialized to the passed argument (`initialValue`). The returned object will persist for the full lifetime of the component.

```jsx
const refContainer = useRef(initialValue);
// refContainer.current will be equal to initialValue
```
