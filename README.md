[![Autodoc by @mocon](https://github.com/mocon/autodoc/blob/master/docs/logo.png)](https://dribbble.com/shots/2377274-Origami-Logo)
# Autodoc

A Node.js script that parses <a href="http://usejsdoc.org/tags-example.html" target="_blank">JSdoc-style comments</a> from any compatible source code, and uses the output to automatically generate:

* Documentation for all components, with syntax-highlighted code samples
* Autocomplete code snippets for all components, for use with Sublime Text 3, Vim, and PhpStorm

Autodoc will parse comments in any language where the following comment syntax is valid:

```js
/**
 *
 * Comment
 *
 */
```

Autodoc performs a recursive search of all files (with any varying file extensions) in a single specified directory, including all nested directories, and parses any comments found in the following format:

```html
/**
 * This is an example header component. This component is meant to be placed at the top of the page.
 *
 * @name {String} name Header
 *
 * @example {Code}
 *
 * <header class="example__header">
 * ---]<span class="example__span">Example</span>
 * </header>
 *
 * @author {String} author Myles O'Connor
 *
 */
```

__Note:__ Any `tags`, prefaced by @, can be added. The JSX markup for the generated documentation view, in `/docs/app.js` will need to be updated to render any new tags added.

## Installation

```
$ npm install
```

## Generate documentation and code snippets

```
$ node commentParser.js
```

## View the generated documentation

After running the script above, generated documentation can be viewed in `/docs/index.html`. This file currently requires a webserver to view it.

An example of the generated documentation can be seen at <a href="https://mocon.github.io/autodoc/docs/" target="_blank">mocon.github.io/autodoc/docs</a>.

## To do

#### Documentation generator

- [ ] Add configuration file, required()'d by `./commentParser.js` for productName, sourceDirectory, and introductory section content
- [ ] Hook up `<SearchBar />` to live filter all components

#### Code snippet generator

- [x] Connect `./commentParser.js` to code snippet generator
- [ ] Output code snippets to `./code_snippets`
