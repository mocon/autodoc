[![Autodoc by @mocon](https://github.com/mocon/autodoc/blob/master/docs/logo.png)](https://dribbble.com/shots/2377274-Origami-Logo)
# Autodoc

A Node.js script that parses JSdoc-style comments from compatible source code, and uses the output to automatically generate:

* Documentation for all components, with syntax-highlighted code samples
* Autocomplete code snippets for all components, for use with Sublime Text 3, Vim, and PhpStorm

## Installation

```
$ npm install
```

## Generate documentation and code snippets

```
$ node commentParser.js
```

## View the generated documentation

Generated documentation can be seen at <a href="https://mocon.github.io/autodoc/docs/" target="_blank">mocon.github.io/autodoc/docs</a>.

## To do

#### Documentation generator

- [x] Parse .scss comments and output results as JSON
- [x] Set up React in `./docs/index.html`
- [x] Render docs UI using `./docs/scssComments.json` as state
- [x] Finish displaying tag data in documentation sections
- [x] Minimize `<GdsPageHeader />` on scroll
- [x] Add `<GdsSlideNav />` component with nested navigation
- [ ] Create and add `<GdsTableOfContents />` component with scrollspy, & offset with `<GdsPageHeader />` on scroll
- [ ] Add configuration file, required()'d by `./commentParser.js` for productName, sourceDirectory, and introductory section content
- [ ] Hook up `<SearchBar />` to live filter all components

#### Code snippet generator

- [x] Connect `./commentParser.js` to code snippet generator
- [ ] Output code snippets to `./code_snippets`
