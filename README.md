# Autodoc Test

An experiment to parse comments from Scss source code, and use the output to automatically generate:

* Documentation with syntax-highlighted code samples
* Autocomplete code snippets for Sublime Text 3, Vim, and PhpStorm

## Installation

```shell
$ npm install
```

## Generate documentation and code snippets

```shell
$ node commentParser.js
```

## To do

- [x] Parse .scss comments and output results as JSON
- [x] Set up React in `./docs/index.html`
- [ ] Render docs UI using `./docs/scssComments.json` as state
- [ ] Connect `./commentParser.js` to code snippet generator
- [ ] Output code snippets to `./code_snippets`
