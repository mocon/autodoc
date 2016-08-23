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

__Note:__ Any tags, prefaced by @, can be added. The JSX markup for the generated documentation view, in `/docs/app.js` will need to be updated to render any new tags added.

## Installation

To use Autodoc in your existing project, move the following files and directories into your project's root directory:

&nbsp;&nbsp;&nbsp;&nbsp;&#128194; &nbsp;autodocCodeSnippets  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#128194; &nbsp;phpstorm  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#128194; &nbsp;sublime  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#128194; &nbsp;vim  
&nbsp;&nbsp;&nbsp;&nbsp;&#128194; &nbsp;docs  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#128196; &nbsp;app.js  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#128196; &nbsp;favicon.ico  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#128196; &nbsp;index.html  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#128196; &nbsp;logo.png  
&nbsp;&nbsp;&nbsp;&nbsp;&#128196; &nbsp;autodocCommentParser.js  
&nbsp;&nbsp;&nbsp;&nbsp;&#128196; &nbsp;autodocSnippetConverter.js  
&nbsp;&nbsp;&nbsp;&nbsp;&#128196; &nbsp;package.json  
<br/>

After the files above have been moved into the root directory, navigate there and run:

```
$ npm install
```

## Generate documentation and code snippets

Pass in the directory containing your source code to be scanned:

```
$ npm run autodoc /scss/theme/
```

## View the generated documentation

After running the command above, documentation will be generated at `/docs/index.html`. This file currently requires a webserver to view it.

An example of the generated documentation can be seen at <a href="https://mocon.github.io/autodoc/docs/" target="_blank">mocon.github.io/autodoc/docs</a>.

## View the generated code snippets

Generated code snippets can be viewed in:

* `/autodocCodeSnippets/phpstorm`
* `/autodocCodeSnippets/sublime`
* `/autodocCodeSnippets/vim`

## Todo

- [ ] Add https://clipboardjs.com/ for copy & pasting code
