# Figma Frame Duplicator 

<img src="src/screenshots/anim01.gif" width="640" />

This plugin lets you produce duplicates of the frame you selected in Figma, with modified texts contained inside a json file you selected.
I made this plugin when I had to translate several images to ten different languages with almost exactly the same design. If you find this plugin useful, please let me know what else you think this is useful for :)

There are extra features that I included:
- Adjusted typography for full-width character languages, such as Chinese, Japanese, and Korean

# Steps

## Create a JSON

I find working with google sheets to be very convenient, especially because of its collaborative nature and lightweightedness. I also made a Google scripts that lets you generate a json file from a table range you specify. Click here to check it out!

## Select the frame you want to duplicate

## Choose the json file

## Enjoy the PC

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

## Develop
npx webpack --mode=development --watch
npx webpack

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

