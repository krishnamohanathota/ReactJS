## Project Setup steps

```
node --version
v21.7.1
```

```bash
mkdir directory-name

cd directory-name

npm init -y

npm install react react-dom

npm install typescript @types/react @types/react-dom -D
```

Add below content to tsconfig.json file:

```json
{
  "compilerOptions": {
    "jsx": "react",
    "module": "commonjs",
    "noImplicitAny": true,
    "outDir": "./dist/",
    "preserveConstEnums": true,
    "removeComments": true,
    "sourceMap": true,
    "target": "es5"
  },
  "include": ["./src/index.tsx"]
}
```

```bash
npm install webpack webpack-cli webpack-dev-server -D

npm install ts-loader css-loader source-map-loader -D

npm install html-webpack-plugin -D
```

Add below content to webpack.config.js file:

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
      {
        test: /\.css$/,
        loader: "css-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
    }),
  ],
};
```

Create src folder and add index.tsx file:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>React Boilerplate</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

Lets create a component `App.tsx` in src folder

```tsx
import * as React from "react";
const App = () => {
  return <h3> Welcome to React Boilerplate </h3>;
};
export default App;
```

Now let's add index.tsx in the same folder which will be the entry point of our app.

```tsx
import * as React from "react";
import { render } from "react-dom";
import App from "./App";
render(<App />, document.getElementById("root"));
```

Add the following scripts in package.json file.

```json
"scripts": {
  "start": "webpack serve --port 3000 --mode development --open --hot",
  "build": "webpack --mode production"
}
```

Run the below command to start the application:

```bash
npm start
```

Run the below command to build the application:

```bash
npm run build
```

Add Tailwind CSS to the project:

```bash
npm install tailwindcss autoprefixer postcss-cli postcss --save-dev
```

Once you have installed these dependencies, you need to configure Tailwind CSS. You can generate a Tailwind configuration file by running:

```bash
npx tailwindcss init
```

This will create a tailwind.config.js file in your project directory.

Next, you need to create a PostCSS configuration file named postcss.config.js in your project directory with the following content:

```javascript
module.exports = {
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
```

Now, you need to import Tailwind CSS into your project. In your src/index.css file, import Tailwind CSS:

```css
/* src/index.css */
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```

Update your `app.tsx` file to use the Tailwind CSS classes:

```tsx
import * as React from "react";

const App = () => {
  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <h3 className="text-3xl text-blue-600 sm:text-4xl lg:text-5xl">
        Welcome to React Boilerplate
      </h3>
    </div>
  );
};

export default App;
```

```
npm install style-loader css-loader postcss-loader
```

## Reference

https://muhammad-ata.medium.com/how-to-setup-react-typescript-project-from-scratch-with-webpack-fa45a90c7a4d

https://brandonwie.medium.com/the-complete-guide-for-setting-up-custom-react-ts-application-c33c36f92666
