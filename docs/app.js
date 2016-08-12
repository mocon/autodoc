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
                            <Footer />
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
        var searchBarStyle = {marginTop: '3px'};

        return (
            <div className="gds-form-group -m-b-4" style={searchBarStyle}>
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
                <h1 className="gds-text--header-lg -m-t-6 -m-b-4">{section}</h1>
                <MainColumnSectionItemsList section={section} componentNames={componentNamesInSection} components={componentsInSection} />
            </article>
        )
    }
});

// <MainColumnSectionItemsList /> component
var MainColumnSectionItemsList = React.createClass({
    render: function() {
        var section = this.props.section,
            componentNames = this.props.componentNames,
            components = this.props.components;

        return (
            <div className="-m-b-4">
                {componentNames.map(function(componentName, index) {
                    return components.map(function(component) {
                        return component.tags.map(function(tag) {
                            if (tag.tag === 'name' && tag.name === componentNames[index]) {
                                return (
                                    <MainColumnSectionItem section={section} component={component} />
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
    componentDidMount: function() {
        Prism.highlightAll();
    },
    render: function() {
        var section = this.props.section,
            component = this.props.component,
            capitalized = {textTransform: capitalized};

        return (
            <div className="gds-card gds-card--white gds-card--underlined -p-a-3 -m-b-4">
                {component.tags.map(function(tag, index) {

                    {/* Display component's name */}
                    if (tag.tag === 'name') {
                        return (
                            <div key={index}>
                                <label className="gds-form-group__label -m-a-0">{tag.tag}</label>
                                <h3 id={`${slugify(section)}-${slugify(tag.name)}`} className="gds-text--header-sm gds-text--primary -m-b-3" style={capitalized}>{tag.name}</h3>

                                {/* Display component's description */}
                                <label className="gds-form-group__label -m-a-0">Description</label>
                                <h3 className="gds-text--body-md -m-b-3" style={capitalized}>{component.description}</h3>
                            </div>
                        )
                    }

                    {/* Display component's code sample, syntax highlight it with Prism.js */}
                    if (tag.tag === 'example') {
                        var sampleCode = tag.description.replace(/---]/g, '    '),
                            preStyle = {background: '#f3f3f3', lineHeight: 1.2, borderRadius: '2px'};

                        return (
                            <div key={index} className="-m-b-3">
                                <label className="gds-form-group__label -m-b-2">{tag.tag}</label>
                                <pre className="-m-a-0" style={preStyle}>
                                    <code className="language-html gds-text--body-sm">
                                        {sampleCode}
                                    </code>
                                </pre>
                            </div>
                        )
                    }

                    {/* Display component's author */}
                    if (tag.tag === 'author') {
                        return (
                            <div key={index}>
                                <label className="gds-form-group__label -m-a-0">{tag.tag}</label>
                                <h3 className="gds-text--body-md">{tag.description}</h3>
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
                <h2 className="gds-text--header-xs">{section}</h2>
                <hr />
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
            <ul className="-m-t-2 -m-b-3">
                {sortedComponents.map(function(component, index) {
                    return (
                        <li key={index}>
                            <a className="gds-text--link" href={`#${slugify(section)}-${slugify(component)}`}>{component}</a>
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

// <Footer /> component
var Footer = React.createClass({
    render: function() {
        var currentYear = new Date().getFullYear(),
            copyrightStyle = {opacity: 0.54};

        return (
            <p className="gds-text--body-sm -m-v-6" style={copyrightStyle}>&copy; Copyright {currentYear} GumGum, All Rights Reserved</p>
        )
    }
});

// Render <App /> to the DOM
ReactDOM.render(<App />, document.querySelector('[data-ui-role="content"]'));
