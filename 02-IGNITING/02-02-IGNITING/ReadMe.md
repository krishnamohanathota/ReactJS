Install the Dependencies

    - npm install

Start the project (Dev Build)

    - npx parcel index.html

Added React Dependecices

    - npm install react
    - npm install react-dom

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
