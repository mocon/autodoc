# Autodoc Test

A script that parses JSdoc-style comments from Scss source code, and uses the output to automatically generate:

* Documentation for all components, with syntax-highlighted code samples
* Autocomplete code snippets for all components, for use with Sublime Text 3, Vim, and PhpStorm

## Installation

```shell
$ npm install
```

## Generate documentation and code snippets

```shell
$ node commentParser.js
```

## View the generated documentation
Generated documentation can be seen at <a href="https://mocon.github.io/autodoc-test/docs/" target="_blank">mocon.github.io/autodoc-test/docs</a>.

## To do

- [x] Parse .scss comments and output results as JSON
- [x] Set up React in `./docs/index.html`
- [x] Render docs UI using `./docs/scssComments.json` as state
- [x] Transform data into sections and items
- [x] Finish displaying tag data in documentation sections
- [ ] Connect `./commentParser.js` to code snippet generator
- [ ] Output code snippets to `./code_snippets`
