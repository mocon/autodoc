// Load generated JSON into variable
var json = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': 'scssComments.json',
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})();

// Main app component
var App = React.createClass({
    getInitialState: function() {
        // Use generated JSON file as state
        return {
            json: json
        }
    },
    render: function() {
        return (
            <div className="gds-text--bold">
                Hello, world!
            </div>
        );
    }
});

// Render <App /> to the DOM
ReactDOM.render(<App />, document.querySelector('[data-ui-role="content"]'));
