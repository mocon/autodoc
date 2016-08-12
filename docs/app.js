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
                        <div className="gds-layout__column--lg-9 gds-layout__column--md-12 -p-h-3">
                            <SearchBar components={this.state.json} />
                            <MainColumn sections={this.state.sections} components={this.state.json} />
                        </div>
                        <div className="gds-layout__column--lg-3 -p-h-3 gds-layout__hidden-md-down">
                            <Sidebar sections={this.state.sections} components={this.state.json} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

// <SearchBar /> component
var SearchBar = React.createClass({
    componentDidUpdate: function() {
        var _this = this;

        ReactDOM.findDOMNode(_this.refs.searchInput).focus();
    },
    render: function() {
        return (
            <div className="gds-form-group -m-b-4">
                <label className="gds-form-group__label">Search Documentation</label>
                <input ref="searchInput" className="gds-form-group__text-input" type="text" placeholder="Search..." />
            </div>
        )
    }
});

// <MainColumn /> component
var MainColumn = React.createClass({
    render: function() {
        var sections = this.props.sections,
            components = this.props.components;

        return (
            <section>
                {sections.map((section, index) => {
                    return (
                        <MainColumnSection key={index} section={section} components={components} />
                    )
                })}
            </section>
        )
    }
});

// <MainColumnSection /> component
var MainColumnSection = React.createClass({
    render: function() {
        var section = this.props.section,
            components = this.props.components,
            componentsInSection = [],
            componentNamesInSection = [];

        // Grab components in section and their names, then sort the names for display
        components.map(function(component) {
            return component.tags.map(function(tag) {
                if (tag.tag === 'section' && tag.name === section) {
                    return component.tags.map(function(tag) {
                        if (tag.tag === 'name' && componentsInSection.indexOf(tag.name) < 0) {
                            componentsInSection.push(component);
                            componentNamesInSection.push(tag.name);
                        }
                    });
                }
            });
        });
        componentNamesInSection.sort();

        return (
            <article>
                <h1 className="gds-text--header-lg -m-b-3">{section}</h1>
                <MainColumnSectionItemsList componentNames={componentNamesInSection} components={componentsInSection} />
            </article>
        )
    }
});

// <MainColumnSectionItemsList /> component
var MainColumnSectionItemsList = React.createClass({
    render: function() {
        var componentNames = this.props.componentNames,
            components = this.props.components;

        return (
            <div className="-m-b-4">
                {componentNames.map(function(componentName, index) {
                    return components.map(function(component) {
                        return component.tags.map(function(tag) {
                            if (tag.tag === 'name' && tag.name === componentNames[index]) {
                                return (
                                    <MainColumnSectionItem component={component} />
                                )
                            }
                        })
                    })
                })}
            </div>
        )
    }
});

// <MainColumnSectionItem /> component
var MainColumnSectionItem = React.createClass({
    render: function() {
        var component = this.props.component,
            capitalized = {textTransform: capitalized};

        return (
            <div className="-m-b-4">
                {component.tags.map(function(tag, index) {
                    if (tag.tag === 'name') {
                        return (
                            <div key={index}>
                                <h3 className="gds-text--header-sm" style={capitalized}>{tag.name}</h3>
                            </div>
                        )
                    }
                })}
            </div>
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
                <a className="gds-text--header-xs gds-text--link" href={`#${slugify(section)}-section`}>{section}</a>
                <SidebarSectionItemsList section={section} components={components} />
            </li>
        )
    }
});

// <SidebarSectionItemsList /> component
var SidebarSectionItemsList = React.createClass({
    render: function() {
        var section = this.props.section,
            components = this.props.components,
            sortedComponents = [];

        // Sort components in section
        components.map(function(component) {
            return component.tags.map(function(tag) {
                if (tag.tag === 'section' && tag.name === section) {
                    return component.tags.map(function(tag) {
                        if (tag.tag === 'name' && sortedComponents.indexOf(tag.name) < 0) {
                            sortedComponents.push(tag.name);
                        }
                    });
                }
            });
        });
        sortedComponents.sort();

        return (
            <ul className="-m-b-3">
                {sortedComponents.map(function(component, index) {
                    return (
                        <li className="-m-l-2" key={index}>
                            <a className="gds-text--link" href={`#${slugify(component)}-item`}>{component}</a>
                        </li>
                    )
                })}
            </ul>
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
