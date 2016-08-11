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

// <App /> component
var App = React.createClass({
    getInitialState: function() {
        // Use generated JSON file as state
        return {
            json
        }
    },
    render: function() {
        return (
            <div>
                <GdsPageHeader />
                <div className="gds-layout__container">
                    <div className="gds-layout__row">
                        <div className="gds-layout__column--lg-9 gds-layout__column--md-12">
                            <MainSection components={this.state.json} />
                        </div>
                        <div className="gds-layout__column--lg-3 gds-layout__hidden-md-down">
                            <Sidebar components={this.state.json} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

// <MainSection /> component
var MainSection = React.createClass({
    render: function() {
        var components = this.props.components;

        return (
            <section>
                <ul>
                    {components.map((component, index) => {
                        return (
                            <MainSectionItem key={index} component={component} />
                        )
                    })}
                </ul>
            </section>
        )
    }
});

// <MainSectionItem /> component
var MainSectionItem = React.createClass({
    render: function() {
        var component = this.props.component;

        return (
            <li>
                <p>{component.description}</p>
            </li>
        )
    }
});

// <Sidebar /> component
var Sidebar = React.createClass({
    render: function() {
        return (
            <aside>
                <p>Sidebar</p>
            </aside>
        )
    }
});

// <GdsPageHeader /> component
var GdsPageHeader = React.createClass({
    render: function() {
        var headerStyle = {pointerEvents: 'none'};

        return (
            <header className="gds-page-header" style={headerStyle}>
                <div className="gds-page-header__product-bar">
                    <h6 className="gds-page-header__product-name">Product Name</h6>
                    <img className="gds-page-header__logo" src="https://ds.gumgum.com/images/svg/logo-white.svg" />
                </div>
                <div className="gds-page-header__nav-bar">
                    <div className="gds-page-header__primary-nav" id="gg-slide-nav-button">
                        <h4 className="gds-page-header__page-name gds-text__header--small">Documentation</h4>
                    </div>
                    <div className="-clear-both"></div>
                </div>
            </header>
        )
    }
});

// Render <App /> to the DOM
ReactDOM.render(<App />, document.querySelector('[data-ui-role="content"]'));
