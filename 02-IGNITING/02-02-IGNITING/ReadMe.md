Install the Dependencies

    - npm install

Start the project (Dev Build)

    - npx parcel index.html

Added React Dependecices

    - npm install react
    - npm install react-dom

Why React?

    - Everything we can do in React we can also do using HTML and JS. But React makes it easier for us to do it. Then Why React? Because React is fast, scalable and simple. Makes Development easier. React is a library for building user interfaces. React is not a framework. React is a JavaScript library for building user interfaces. React is declarative, component based and learn once write anywhere.

#Parcel

- Dev Build
- Local Server
- HMR (Hot Module Replacement)
- Caching (Fater Builds)
- Image Optimization
- Code Splitting
- Tree Shaking - Remove Unused Code
- Minification
- Production Build
- Differential Bundling - Old Browsers Support
- Better Error Logging
- Transpiling (i.e. Convert ES6 to ES5, Converting JSX to JS). Parcel uses Babel for this. Babel is JavaScript compiler

#PROD Build

npx parcel build index.html

NOTE :

- Remove main from package.json before building
- Output will be in dist folder

#browserslist

https://browserslist.dev/?q=bGFzdCAyIHZlcnNpb25z

Add to `packege.json` as

```json
"browserlist": [
    "last 2 chrome version",
    "last 2 firefox version"
]
```
