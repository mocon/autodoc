// Load generated JSON into variable
var json = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': 'scssComments.json',
        'dataType': 'json',
        'success': function (data) {
            json = data;
        }
    });
    return json;
})();

// Slugify text for use in anchor tags
function slugify(text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
}

// <App /> component
var App = React.createClass({
    getInitialState: function() {
        // Use generated JSON file as state
        return {
            json,
            sections : []
        }
    },
    _getSections: function() {
        var _this = this,
            currentJson = _this.state.json,
            sections = [];

        currentJson.map(function(component) {
            component.tags.map(function(tag) {
                if (tag.tag === 'section' && sections.indexOf(tag.name) < 0) {
                    sections.push(tag.name);
                }
            });
        });

        sections.sort();

        _this.setState({sections: sections});
    },
    componentDidMount: function() {
        var _this = this;

        _this._getSections();
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
                            <Sidebar sections={this.state.sections} components={this.state.json} />
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
        var sections = this.props.sections,
            components = this.props.components;

        return (
            <aside>
                <ul>
                    {sections.map(function(section, index) {
                        return (
                            <SidebarSection key={index} section={section} components={components} />
                        )
                    })}
                </ul>
            </aside>
        )
    }
});

// <SidebarSection /> component
var SidebarSection = React.createClass({
    render: function() {
        var section = this.props.section,
            components = this.props.components;

        return (
            <li>
                <a className="gds-text--header-xs gds-text--bold gds-text--link" href={`#${slugify(section)}-section`}>{section}</a>
                <SidebarSectionItemsList section={section} components={components} />
            </li>
        )
    }
});

// <SidebarSectionItemsList /> component
var SidebarSectionItemsList = React.createClass({
    render: function() {
        var section = this.props.section,
            components = this.props.components;

        return (
            <ul className="-m-b-3">
                {components.map(function(component) {
                    return component.tags.map(function(tag) {
                        if (tag.tag === 'section' && tag.name === section) {
                            return (
                                <SidebarSectionItem component={component} />
                            )
                        }
                    })
                })}
            </ul>
        )
    }
});

// <SidebarSectionItem /> component
var SidebarSectionItem = React.createClass({
    render: function() {
        var component = this.props.component;

        return (
            <li>
                {component.tags.map(function(tag) {
                    if (tag.tag === 'name') {
                        return (
                            <a className="gds-text--link" href={`#${slugify(tag.name)}-item`}>{tag.name}</a>
                        )
                    }
                })}
            </li>
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
                        <button className="gds-page-header__menu">
                            <span className="gds-page-header__menu-line"></span>
                            <span className="gds-page-header__menu-line"></span>
                            <span className="gds-page-header__menu-line"></span>
                            <span className="gds-page-header__menu-line"></span>
                        </button>
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
