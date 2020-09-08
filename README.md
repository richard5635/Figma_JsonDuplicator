# React 

<img src="../_screenshots/webpack.png" width="400" />

Creates rectangles (same as the [Webpack sample plugin][webpack]).

This demonstrates:

- bundling plugin code using Webpack, and
- using React with TSX.

The main plugin code is in `src/code.ts`. The HTML for the UI is in
`src/ui.html`, while the embedded JavaScript is in `src/ui.tsx`.

These are compiled to files in `dist/`, which are what Figma will use to run
your plugin.

To build:

    $ npm install
    $ npx webpack

[webpack]: ../webpack/

# Richard Note

## Rename Project

Got to manifect.json and change the project name there.

## Add typings for VSCode Coding

https://www.figma.com/plugin-docs/api/typings/#docsNav

## Main difference in ui.ts
In vanilla JS, the UI functions connecting to figma is contained inside window.onmessage = async event => {}
In React, all the function is done inside a react component. Maybe React component also handles async functions.

# Log

### 2020-09-07
Finished copying the code except for ui.ts. I used DOM scripting for vanilla JS. Now I need to code it based on React framework.