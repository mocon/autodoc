/*
 * This file is require()'d by `./autodocCommentParser.js`.
*/
var fs = require('fs'),
    Entities = require('html-entities').AllHtmlEntities,
    entities = new Entities(),
    formattedComponents = [];

module.exports = {
    _formatComments: function(json) {
        console.log('Formatting comments for snippet conversion...');

        // Restructure JSON output from autodocCommentParser into formattedComponents [{component}, {component}, {component}] etc...
        json.map(function(component, index) {
            var currentComponent = {};

            currentComponent.index = index;
            currentComponent.description = component.description;

            component.tags.map(function(tag) {
                var key = tag.tag,
                    value = tag.description;

                currentComponent[key] = value;
            });

            formattedComponents.push(currentComponent);
        });
        console.log('Formatting complete.');

        // Convert formattedComponents to code snippets and save the snippet files
        this._convert(formattedComponents);
    },
    _convert: function(json) {
        console.log('Converting code snippets...');

        // Loop through all components, passed into convert() as json
        json.map(function(component) {
            var numberOfOptionalClasses = component.optionalClasses.length,
                sublimeSnippet = '',
                vimSnippet = '',
                phpStormSnippet = '',
                phpStormBaseHtml = '',
                phpStormEncodedHtml = '';

            // If this component has a tabTrigger, create snippets for it
            if (component.tabTrigger) {

                // Assemble Sublime snippet
                sublimeSnippet += '<!-- ' + component.name + ' -->\n<snippet><content><![CDATA[\n';
                sublimeSnippet += component.example.replace(/---]/g, '    ') + '\n';
                sublimeSnippet += ']]></content><tabTrigger>' + component.tabTrigger + '</tabTrigger>';
                sublimeSnippet += '<scope>text.html</scope></snippet>';

                // Write the Sublime Text 3 code snippet file
                fs.writeFile('./autodocCodeSnippets/sublime/' + component.tabTrigger + '.sublime-snippet', sublimeSnippet, function(err) {
                    if (err) {
                        return console.log(err);
                    }
                });

                // Assemble Vim snippet
                vimSnippet += 'snippet ' + component.tabTrigger + ' "' + component.name + '" b' + '\n';
                vimSnippet += component.example.replace(/---]/g, '    ') + '\n';
                vimSnippet += 'endsnippet';

                // Write the Vim code snippet file
                fs.writeFile('./autodocCodeSnippets/vim/' + component.tabTrigger + '.snippets', vimSnippet, function(err) {
                    if (err) {
                        return console.log(err);
                    }
                });

                // Assemble PhpStorm snippet
                phpStormBaseHtml = component.example;
                phpStormEncodedHtml = entities.encode(phpStormBaseHtml);
                phpStormSnippet += '<template name="' + component.tabTrigger + '" value="' + phpStormEncodedHtml.replace(/---]/g, '\t').replace(/\r?\n|\r/g, '&#13;') + '" description="' + component.name + '" toReformat="false" toShortenFQNames="true">';
                phpStormSnippet += '\n\t<context>\n\t\t<option name="HTML" value="true" />\n\t</context>\n</template>';

                // Write the PhpStorm code snippet file
                fs.writeFile('./autodocCodeSnippets/phpstorm/' + component.tabTrigger + '.xml', phpStormSnippet, function(err) {
                    if (err) {
                        return console.log(err);
                    }
                });
            }
        });

        console.log('Code snippets converted and saved.');
    }
}
