// Load generated JSON into variable
var json = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': 'autodocComments.json',
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

// For rendering HTML strings as rendered example markup
function createRenderedMarkup(str) {
    return {__html: str};// Load generated JSON into variable
var json = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': 'autodocComments.json',
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

// For rendering HTML strings as rendered example markup
function createRenderedMarkup(str) {
    return {__html: str};
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
            sections = [],
            orderedSections = [];

        currentJson.map(function(component) {
            component.tags.map(function(tag) {
                if (tag.tag === 'section' && sections.indexOf(tag.description) < 0) {
                    sections.push(tag.description);
                }
            });
        });

        // Temporary, custom order sections
        orderedSections = [
            'Atoms',
            'Molecules',
            'Organisms',
            'Utilities'
        ];

        _this.setState({sections: orderedSections});
    },
    _getUrlHash: function() {
        var _this = this;

        if (window.location.hash) {
            var hash = window.location.hash;
        }

        setTimeout(function() {
            location.href = '#';
            location.href = hash.toString();
        }, 10);
    },
    componentWillMount: function() {
        var _this = this;

        _this._getUrlHash();
    },
    componentDidMount: function() {
        var _this = this;

        _this._getSections();
    },
    render: function() {
        var bodyBackgroundColor = {backgroundColor: '#f3f3f3'};

        if (!this.state.json) {
            var emptyStateParentStyles = {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                },
                emptyStateChildStyles = {
                    marginTop: '-100px',
                    maxWidth: '50%'
                };

            return (
                <div style={emptyStateParentStyles}>
                    <div className="-text-center" style={emptyStateChildStyles}>
                        <img src="./logo.png" alt="Autodoc" className="-m-b-2" />
                        <p><span className="gds-text--keyboard">npm run autodoc &lt;/path/to/sourcecode/&gt;</span><br/>to generate documentation.</p>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <GdsSlideNav sections={this.state.sections} components={this.state.json} />
                <GdsTableOfContents sections={this.state.sections} components={this.state.json} />
                <GdsPageHeader />
                <div className="gds-slide-content">
                    <div className="gds-layout__container -z-2" style={bodyBackgroundColor}>
                        <div className="gds-layout__column--lg-9 gds-layout__column--md-12 -p-h-3">
                            {/*<SearchBar components={this.state.json} />*/}
                            <MainColumn sections={this.state.sections} components={this.state.json} />
                            <Footer />
                        </div>
                    </div>
                </div>
                <GdsCornerContent />
            </div>
        );
    }
});

// <GdsCornerContent /> component
var GdsCornerContent = React.createClass({
    componentDidMount: function() {
        $(document).on('click', '.gds-corner-content__header', function() {
            $(this).closest('.gds-corner-content').toggleClass('gds-corner-content--shown');
        });
        Prism.highlightAll();
    },
    render: function() {
        var headerStyle = {cursor: 'pointer'},
            preStyle = {background: '#fafafa', lineHeight: 1.2, borderRadius: '2px'};

        return (
            <div className="gds-corner-content gds-corner-content--right">
                <div className="gds-corner-content__header" style={headerStyle}>
                    <h4 className="gds-corner-content__title">Getting Started</h4>
                    <div className="gds-corner-content__controls">
                        <button className="gds-corner-content__button"><i className="fa fa-arrows-v"></i></button>
                    </div>
                </div>
                <div className="gds-corner-content__block -p-a-3">
                    <p className="-m-b-3">To use the Design System, include the following code in the <span className="gds-text--code">&lt;head&gt;</span> of your document:</p>
                    <pre className="language-html" style={preStyle}>
                        <code className="gds-text--body-sm">&lt;link rel="stylesheet" href="https://ds.gumgum.com/staging/main.css"&gt;</code>
                    </pre>
                </div>
            </div>
        )
    }
});

// <GdsTableOfContents /> component
var GdsTableOfContents = React.createClass({
    componentDidMount: function() {
        $('body').scrollspy({
            target: '.gds-table-of-contents__fixed-nav',
            offset: 140
        });
    },
    render: function() {
        return (
            <div className="gds-table-of-contents__fixed-nav -pointer-events--none">
                <div className="gds-layout__container">
                    <div className="gds-layout__column--lg-push-9 gds-layout__column--lg-3 gds-layout__hidden-md-down -p-l-3 -pointer-events--auto">
                        <Sidebar sections={this.props.sections} components={this.props.components} />
                    </div>
                </div>
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
            <nav className="gds-table-of-contents">
                <ul id="sidebar" className="nav nav-stacked">
                    {sections.map(function(section, index) {
                        return (
                            <SidebarSection key={index} section={section} components={components} />
                        )
                    })}
                </ul>
            </nav>
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
                <a href={`#${slugify(section)}`} className="gds-text--header-xs gds-text--link -ellipsis -block">{section}</a>
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
                if (tag.tag === 'section' && tag.description === section) {
                    var parentComponent;

                    return component.tags.map(function(tag) {
                        if (tag.tag === 'parentComponent') {
                            parentComponent = tag.description;

                            return component.tags.map(function(tag) {
                                if (tag.tag === 'name' && tag.description === parentComponent && sortedComponents.indexOf(tag.name) < 0) {
                                    sortedComponents.push(tag.description);
                                }
                            });
                        }
                    });
                }
            });
        });
        sortedComponents.sort();

        return (
            <ul className="nav nav-stacked">
                {sortedComponents.map(function(component, index) {
                    return (
                        <li key={index}>
                            <a className="gds-text--link -ellipsis -block" href={`#${slugify(section)}-${slugify(component)}`}>{component}</a>
                        </li>
                    )
                })}
            </ul>
        )
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
                if (tag.tag === 'section' && tag.description === section) {
                    return component.tags.map(function(tag) {
                        if (tag.tag === 'name' && componentsInSection.indexOf(tag.name) < 0) {
                            componentsInSection.push(component);
                            componentNamesInSection.push(tag.description);
                        }
                    });
                }
            });
        });
        componentNamesInSection.sort();

        return (
            <article>
                <h1 id={`${slugify(section)}`} className="gds-docs__anchor-target gds-text--header-lg -m-b-4">{section}</h1>
                <MainColumnSectionItemsList section={section} componentNames={componentNamesInSection} components={componentsInSection} />
                <div className="-block -m-b-6"></div>
            </article>
        )
    }
});

// <MainColumnSectionItemsList /> component
var MainColumnSectionItemsList = React.createClass({
    render: function() {
        var section = this.props.section,
            componentNames = this.props.componentNames,
            components = this.props.components,
            parentComponentsOnly = [];

        componentNames.map(function(name) {
            return components.map(function(component) {
                var parentComponent;

                return component.tags.map(function(tag) {
                    if (tag.tag === 'parentComponent') {
                        parentComponent = tag.description;

                        return component.tags.map(function(tag) {
                            if (tag.tag === 'name' && tag.description === parentComponent && parentComponentsOnly.indexOf(tag.description) < 0) {
                                parentComponentsOnly.push(tag.description);
                            }
                        });
                    }
                });
            });
        });
        parentComponentsOnly.sort();

        return (
            <div className="-m-b-4">
                {componentNames.map(function(componentName, index) {
                    return components.map(function(component) {
                        return component.tags.map(function(tag) {
                            if (tag.tag === 'name' && tag.description === componentNames[index]) {
                                return (
                                    <div className="gds-card gds-card--white gds-card--underlined -p-a-3 -m-b-4">
                                        <MainColumnSectionItem section={section} component={component} />
                                    </div>
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
            capitalized = {textTransform: capitalized},
            parentComponent,
            headerClass = 'gds-text--header-md',
            isChildComponent = '',
            renderedMarkupStyle = {},
            autocompleteTrigger,
            componentOptions,
            componentLanguage,
            labelStyle = {color: 'rgb(200,200,200)'};

        // Determine if this component is a parentComponent
        component.tags.map(function(tag) {
            if (tag.tag === 'parentComponent') {
                parentComponent = tag.description;

                return component.tags.map(function(tag) {
                    if (tag.tag === 'name') {
                        if (tag.description !== parentComponent) {
                            isChildComponent = 'gds-docs__child-component';
                            headerClass = 'gds-text--header-sm';
                        }
                    }
                });
            }

            // Only render markup if component.renderMarkup === true
            if (tag.tag === 'renderMarkup') {
                tag.description === 'false' ? renderedMarkupStyle.display = 'none' : renderedMarkupStyle.display = 'block';
            }

            // Autocomplete trigger
            if (tag.tag === 'tabTrigger') {
                autocompleteTrigger = tag.description;
            }

            // Optional classes
            if (tag.tag === 'optionalClasses') {
                componentOptions = tag.description.split(',');
            }

            // Language
            if (tag.tag === 'language' && tag.description) {
                componentLanguage = tag.description;
            }
        });

        return (
            <div className={isChildComponent}>
                {component.tags.map(function(tag, index) {

                    {/* Display component's name */}
                    if (tag.tag === 'name') {
                        return (
                            <div key={index}>
                                <label className="gds-form-group__label -m-a-0" style={labelStyle}>Name</label>
                                <h3 id={`${slugify(section)}-${slugify(tag.description)}`} className={`${headerClass} gds-text--primary gds-docs__anchor-target -m-b-3`} style={capitalized}>{tag.description}</h3>

                                {/* Display component's description */}
                                <label className="gds-form-group__label -m-a-0" style={labelStyle}>Description</label>
                                <h3 className="gds-text--body-md -m-b-3" dangerouslySetInnerHTML={createRenderedMarkup(component.description)}></h3>
                            </div>
                        )
                    }

                    {/* Display component's code sample, syntax highlight it with Prism.js */}
                    if (tag.tag === 'example') {
                        var sampleCode = tag.description.replace(/---]/g, '    '),
                            preStyle = {background: '#fafafa', lineHeight: 1.2, borderRadius: '2px'};

                        return (
                            <div key={index} className="-m-b-3">
                                {/* Show rendered example */}
                                <div style={renderedMarkupStyle}>
                                    <label className="gds-form-group__label -m-a-0" style={labelStyle}>Example</label>
                                    <div className="-m-b-3" dangerouslySetInnerHTML={createRenderedMarkup(sampleCode)}></div>
                                </div>

                                {/* Show code sample */}
                                <label className="gds-form-group__label -m-b-1" style={labelStyle}>Code</label>
                                <pre className="-m-a-0" style={preStyle}>
                                    <code className={`language-${componentLanguage || 'html'} gds-text--body-sm`}>
                                        {sampleCode}
                                    </code>
                                </pre>
                            </div>
                        )
                    }

                    {/* Show autocomplete trigger, if component has one */}
                    if (tag.tag === 'tabTrigger' && tag.description) {
                        return (
                            <div key={index}>
                                <label className="gds-form-group__label -m-a-0" style={labelStyle}>Autocomplete trigger</label>
                                <h3 className="gds-text--body-md -m-b-3"><span className="gds-text--keyboard gds-text--body-sm">{autocompleteTrigger}</span></h3>
                            </div>
                        )
                    }

                    {/* Display component's author */}
                    if (tag.tag === 'author') {
                        var authorValue = tag.description,
                            comma = ',',
                            authorLabelValue;

                        // Plural if author contains a comma
                        authorValue.indexOf(comma) > -1 ? authorLabelValue = 'authors' : authorLabelValue = 'author';

                        return (
                            <div key={index} className="-m-b-3">
                                <label className="gds-form-group__label -m-a-0" style={labelStyle}>{authorLabelValue}</label>
                                <h3 className="gds-text--body-md">{tag.description}</h3>
                            </div>
                        )
                    }

                    {/* Display component options */}
                    if (tag.tag === 'optionalClasses') {
                        var optionsStyle = {fontSize: '0.8rem'};

                        if (componentOptions.toString().length !== 0) {
                            return (
                                <div key={index} className="-m-t-3">
                                    <label className="gds-form-group__label -m-a-0" style={labelStyle}>Options</label>
                                    {componentOptions.map(function(name, index) {
                                        return (
                                            <p key={index}><span style={optionsStyle} className="gds-text--code">{name}</span></p>
                                        )
                                    })}
                                </div>
                            )
                        } else {
                            return (
                                <div key={index} className="-m-t-3">
                                    <label className="gds-form-group__label -m-a-0" style={labelStyle}>Options</label>
                                    <p>None</p>
                                </div>
                            )
                        }
                    }

                })}
            </div>
        )
    }
});

// <GdsSlideNav /> component
var GdsSlideNav = React.createClass({
    componentDidMount: function() {
        // Off-canvas module
        (function($) {
            var element = $('[gg-slide-nav]'),
                html = $('[gg-slide-nav-html]'),
                menuOpen = false;

            function toggleMenu(e) {
                $('#gg-slide-nav-button').toggleClass('gds-page-header__menu--open');

                if (menuOpen) {
                    closeMenu();
                } else {
                    openMenu(e);
                }
            }

            function openMenu(e) {
                e.stopPropagation();
                element.addClass("gds-slide-out");
                html.addClass('hide-overflow');
                menuOpen = true;
            }

            function closeMenu(e) {
                element.removeClass("gds-slide-out");
                html.removeClass('hide-overflow');
                menuOpen = false;
            }

            $('body').on('click', '#gg-slide-nav-button', toggleMenu).on('click','[gg-nav-closer]', closeMenu);

            $('body').on('click', '.gds-slide-nav__list--expanded .gds-slide-nav__link', toggleMenu);
            $('body').on('click', '.gds-slide-nav__link.gds-slide-nav__link--expandable.gds-slide-nav__link--expanded', openMenu);

            // Toggle .gds-slide-nav menu with "a" key
            $(document).keypress(function(e) {
                // If any inputs or textareas are being typed in, disable "a" hotkey for showing .gds-slide-nav menu
                if ($('input[type="text"]:focus').length === 0 && $('input[type="email"]:focus').length === 0 && $('input[type="url"]:focus').length === 0 && $('input[type="password"]:focus').length === 0 && $('textarea:focus').length === 0 && e.which === 97) {
                    toggleMenu(e);
                }
            });

            // Hide .gds-slide-nav menu with esc
            $(document).on('keydown', function(e) {
                if (menuOpen && $('input[type="text"]:focus').length === 0 && $('input[type="email"]:focus').length === 0 && $('input[type="url"]:focus').length === 0 && $('input[type="password"]:focus').length === 0 && $('textarea:focus').length === 0 && e.which == 27) {
                    toggleMenu();
                }
            });
        }(jQuery));

        // Mobile-nav module
        (function($) {
            $('body').on('click', '.gg-expandable', function(e) {
                e.stopPropagation();

                var ea = 'gds-slide-nav__link--expanded',
                    el = 'gds-slide-nav__list--expanded';

                if ($(this).hasClass(ea)) {
                    $(this).parent().removeClass(el).children('.gg-expand-list').removeClass(el).parent().find('a').first().removeClass(ea);
                } else {
                    $(this).parent().siblings().removeClass(el).find('.gg-expand-list').removeClass(el).parent().find('a').removeClass(ea);
                    $(this).parent().addClass(el).children('.gg-expand-list').addClass(el).parent().find('a').first().addClass(ea);
                }
                return false;
            });
        }(jQuery));
    },
    render: function() {
        var sections = this.props.sections,
            components = this.props.components;

        return (
            <nav className="gds-slide-nav">
                <div className="gds-slide-nav__group">
                    <label className='gds-slide-nav__label'>Main Menu</label>
                    <ul className="gds-slide-nav__list">
                        {sections.map(function(section, index) {
                            return (
                                <GdsSlideNavSection key={index} section={section} components={components} />
                            )
                        })}
                    </ul>
                </div>
            </nav>
        )
    }
});

// <GdsSlideNavSection /> component
var GdsSlideNavSection = React.createClass({
    render: function() {
        var section = this.props.section,
            components = this.props.components;

        return (
            <li className="gds-slide-nav__list-item gds-slide-nav__list-item--primary gds-slide-nav__list-item--has-children">
                <a className="gds-slide-nav__link gds-slide-nav__link--expandable gg-expandable" href="#">{section}</a>
                <GdsSlideNavSectionList section={section} components={components} />
            </li>
        )
    }
});

// <GdsSlideNavSectionList /> component
var GdsSlideNavSectionList = React.createClass({
    render: function() {
        var section = this.props.section,
            components = this.props.components,
            sortedComponents = [];

        // Sort components in section
        components.map(function(component) {
            return component.tags.map(function(tag) {
                if (tag.tag === 'section' && tag.description === section) {
                    var parentComponent;

                    return component.tags.map(function(tag) {
                        if (tag.tag === 'parentComponent') {
                            parentComponent = tag.description;

                            return component.tags.map(function(tag) {
                                if (tag.tag === 'name' && tag.description === parentComponent && sortedComponents.indexOf(tag.name) < 0) {
                                    sortedComponents.push(tag.description);
                                }
                            });
                        }
                    });
                }
            });
        });
        sortedComponents.sort();

        return (
            <ul className="gds-slide-nav__list gds-slide-nav__list--nested gg-expand-list">
                {sortedComponents.map(function(component, index) {
                    return (
                        <li key={index}><a href={`#${slugify(section)}-${slugify(component)}`} className="gds-slide-nav__link">{component}</a></li>
                    )
                })}
            </ul>
        )
    }
});

// <GdsPageHeader /> component
var GdsPageHeader = React.createClass({
    componentDidMount: function() {
        $(window).bind('scroll', function() {
            if ($(window).scrollTop() >= 5) {
                $('.gds-page-header__product-bar').addClass('gds-page-header__product-bar--collapsed');
                $('.gds-table-of-contents__fixed-nav').addClass('gds-table-of-contents__fixed-nav--scrolled');
            }
            else {
                $('.gds-page-header__product-bar').removeClass('gds-page-header__product-bar--collapsed');
                $('.gds-table-of-contents__fixed-nav').removeClass('gds-table-of-contents__fixed-nav--scrolled');
            }
        });
    },
    render: function() {
        return (
            <header className="gds-page-header">
                <div className="gds-page-header__product-bar">
                    <h6 className="gds-page-header__product-name">Design System</h6>
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
            sections = [],
            orderedSections = [];

        currentJson.map(function(component) {
            component.tags.map(function(tag) {
                if (tag.tag === 'section' && sections.indexOf(tag.description) < 0) {
                    sections.push(tag.description);
                }
            });
        });

        // Temporary, custom order sections
        orderedSections = [
            'Atoms',
            'Molecules',
            'Organisms',
            'Utilities'
        ];

        _this.setState({sections: orderedSections});
    },
    _getUrlHash: function() {
        var _this = this;

        if (window.location.hash) {
            var hash = window.location.hash;
        }

        setTimeout(function() {
            location.href = '#';
            location.href = hash.toString();
        }, 10);
    },
    componentWillMount: function() {
        var _this = this;

        _this._getUrlHash();
    },
    componentDidMount: function() {
        var _this = this;

        _this._getSections();
    },
    render: function() {
        if (!this.state.json) {
            var emptyStateParentStyles = {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                },
                emptyStateChildStyles = {
                    marginTop: '-100px',
                    maxWidth: '50%'
                };

            return (
                <div style={emptyStateParentStyles}>
                    <div className="-text-center" style={emptyStateChildStyles}>
                        <img src="./logo.png" alt="Autodoc" className="-m-b-2" />
                        <p><span className="gds-text--keyboard">npm run autodoc &lt;/path/to/sourcecode/&gt;</span><br/>to generate documentation.</p>
                    </div>
                </div>
            )
        }

        if (this.state.isLoading) {
            var loadingStyles = {
                    position: 'fixed',
                    marginLeft: '1rem'
                };

            return (
                <div className="gds-loading" style={loadingStyles}>
                    <div className="gds-loading__dot"></div>
                </div>
            )
        }

        return (
            <div>
                <GdsSlideNav sections={this.state.sections} components={this.state.json} />
                <GdsTableOfContents sections={this.state.sections} components={this.state.json} />
                <GdsPageHeader />
                <div className="gds-slide-content">
                    <div className="gds-layout__container">
                        <div className="gds-layout__column--lg-9 gds-layout__column--md-12 -p-h-3">
                            {/*<SearchBar components={this.state.json} />*/}
                            <MainColumn sections={this.state.sections} components={this.state.json} />
                            <Footer />
                        </div>
                    </div>
                </div>
                <GdsCornerContent />
            </div>
        );
    }
});

// <GdsCornerContent /> component
var GdsCornerContent = React.createClass({
    componentDidMount: function() {
        $(document).on('click', '.gds-corner-content__header', function() {
            $(this).closest('.gds-corner-content').toggleClass('gds-corner-content--shown');
        });
        Prism.highlightAll();
    },
    render: function() {
        var headerStyle = {cursor: 'pointer'},
            preStyle = {background: '#fafafa', lineHeight: 1.2, borderRadius: '2px'};

        return (
            <div className="gds-corner-content gds-corner-content--right">
                <div className="gds-corner-content__header" style={headerStyle}>
                    <h4 className="gds-corner-content__title">Getting Started</h4>
                    <div className="gds-corner-content__controls">
                        <button className="gds-corner-content__button"><i className="fa fa-arrows-v"></i></button>
                    </div>
                </div>
                <div className="gds-corner-content__block -p-a-3">
                    <p className="-m-b-3">To use the Design System, include the following code in the <span className="gds-text--code">&lt;head&gt;</span> of your document:</p>
                    <pre className="language-html" style={preStyle}>
                        <code className="gds-text--body-sm">&lt;link rel="stylesheet" href="https://ds.gumgum.com/staging/main.css"&gt;</code>
                    </pre>
                </div>
            </div>
        )
    }
});

// <GdsTableOfContents /> component
var GdsTableOfContents = React.createClass({
    componentDidMount: function() {
        $('body').scrollspy({
            target: '.gds-table-of-contents__fixed-nav',
            offset: 140
        });
    },
    render: function() {
        return (
            <div className="gds-table-of-contents__fixed-nav -pointer-events--none">
                <div className="gds-layout__container">
                    <div className="gds-layout__column--lg-push-9 gds-layout__column--lg-3 gds-layout__hidden-md-down -p-l-3 -pointer-events--auto">
                        <Sidebar sections={this.props.sections} components={this.props.components} />
                    </div>
                </div>
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
            <nav className="gds-table-of-contents">
                <ul id="sidebar" className="nav nav-stacked">
                    {sections.map(function(section, index) {
                        return (
                            <SidebarSection key={index} section={section} components={components} />
                        )
                    })}
                </ul>
            </nav>
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
                <a href={`#${slugify(section)}`} className="gds-text--header-xs gds-text--link -ellipsis -block">{section}</a>
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
                if (tag.tag === 'section' && tag.description === section) {
                    var parentComponent;

                    return component.tags.map(function(tag) {
                        if (tag.tag === 'parentComponent') {
                            parentComponent = tag.description;

                            return component.tags.map(function(tag) {
                                if (tag.tag === 'name' && tag.description === parentComponent && sortedComponents.indexOf(tag.name) < 0) {
                                    sortedComponents.push(tag.description);
                                }
                            });
                        }
                    });
                }
            });
        });
        sortedComponents.sort();

        return (
            <ul className="nav nav-stacked">
                {sortedComponents.map(function(component, index) {
                    return (
                        <li key={index}>
                            <a className="gds-text--link -ellipsis -block" href={`#${slugify(section)}-${slugify(component)}`}>{component}</a>
                        </li>
                    )
                })}
            </ul>
        )
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
                if (tag.tag === 'section' && tag.description === section) {
                    return component.tags.map(function(tag) {
                        if (tag.tag === 'name' && componentsInSection.indexOf(tag.name) < 0) {
                            componentsInSection.push(component);
                            componentNamesInSection.push(tag.description);
                        }
                    });
                }
            });
        });
        componentNamesInSection.sort();

        return (
            <article>
                <h1 id={`${slugify(section)}`} className="gds-docs__anchor-target gds-text--header-lg -m-b-4">{section}</h1>
                <MainColumnSectionItemsList section={section} componentNames={componentNamesInSection} components={componentsInSection} />
                <div className="-block -m-b-6"></div>
            </article>
        )
    }
});

// <MainColumnSectionItemsList /> component
var MainColumnSectionItemsList = React.createClass({
    render: function() {
        var section = this.props.section,
            componentNames = this.props.componentNames,
            components = this.props.components,
            parentComponentsOnly = [];

        componentNames.map(function(name) {
            return components.map(function(component) {
                var parentComponent;

                return component.tags.map(function(tag) {
                    if (tag.tag === 'parentComponent') {
                        parentComponent = tag.description;

                        return component.tags.map(function(tag) {
                            if (tag.tag === 'name' && tag.description === parentComponent && parentComponentsOnly.indexOf(tag.description) < 0) {
                                parentComponentsOnly.push(tag.description);
                            }
                        });
                    }
                });
            });
        });
        parentComponentsOnly.sort();

        return (
            <div className="-m-b-4">
                {componentNames.map(function(componentName, index) {
                    return components.map(function(component) {
                        return component.tags.map(function(tag) {
                            if (tag.tag === 'name' && tag.description === componentNames[index]) {
                                return (
                                    <div className="gds-card gds-card--white gds-card--underlined -p-a-3 -m-b-4">
                                        <MainColumnSectionItem section={section} component={component} />
                                    </div>
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
            capitalized = {textTransform: capitalized},
            parentComponent,
            headerClass = 'gds-text--header-md',
            isChildComponent = '',
            renderedMarkupStyle = {},
            autocompleteTrigger,
            componentOptions,
            componentLanguage,
            labelStyle = {color: 'rgb(200,200,200)'};

        // Determine if this component is a parentComponent
        component.tags.map(function(tag) {
            if (tag.tag === 'parentComponent') {
                parentComponent = tag.description;

                return component.tags.map(function(tag) {
                    if (tag.tag === 'name') {
                        if (tag.description !== parentComponent) {
                            isChildComponent = 'gds-docs__child-component';
                            headerClass = 'gds-text--header-sm';
                        }
                    }
                });
            }

            // Only render markup if component.renderMarkup === true
            if (tag.tag === 'renderMarkup') {
                tag.description === 'false' ? renderedMarkupStyle.display = 'none' : renderedMarkupStyle.display = 'block';
            }

            // Autocomplete trigger
            if (tag.tag === 'tabTrigger') {
                autocompleteTrigger = tag.description;
            }

            // Optional classes
            if (tag.tag === 'optionalClasses') {
                componentOptions = tag.description.split(',');
            }

            // Language
            if (tag.tag === 'language' && tag.description) {
                componentLanguage = tag.description;
            }
        });

        return (
            <div className={isChildComponent}>
                {component.tags.map(function(tag, index) {

                    {/* Display component's name */}
                    if (tag.tag === 'name') {
                        return (
                            <div key={index}>
                                <label className="gds-form-group__label -m-a-0" style={labelStyle}>Name</label>
                                <h3 id={`${slugify(section)}-${slugify(tag.description)}`} className={`${headerClass} gds-text--primary gds-docs__anchor-target -m-b-3`} style={capitalized}>{tag.description}</h3>

                                {/* Display component's description */}
                                <label className="gds-form-group__label -m-a-0" style={labelStyle}>Description</label>
                                <h3 className="gds-text--body-md -m-b-3" dangerouslySetInnerHTML={createRenderedMarkup(component.description)}></h3>
                            </div>
                        )
                    }

                    {/* Display component's code sample, syntax highlight it with Prism.js */}
                    if (tag.tag === 'example') {
                        var sampleCode = tag.description.replace(/---]/g, '    '),
                            preStyle = {background: '#fafafa', lineHeight: 1.2, borderRadius: '2px'};

                        return (
                            <div key={index} className="-m-b-3">
                                {/* Show rendered example */}
                                <div style={renderedMarkupStyle}>
                                    <label className="gds-form-group__label -m-a-0" style={labelStyle}>Example</label>
                                    <div className="-m-b-3" dangerouslySetInnerHTML={createRenderedMarkup(sampleCode)}></div>
                                </div>

                                {/* Show code sample */}
                                <label className="gds-form-group__label -m-b-1" style={labelStyle}>Code</label>
                                <pre className="-m-a-0" style={preStyle}>
                                    <code className={`language-${componentLanguage || 'html'} gds-text--body-sm`}>
                                        {sampleCode}
                                    </code>
                                </pre>
                            </div>
                        )
                    }

                    {/* Show autocomplete trigger, if component has one */}
                    if (tag.tag === 'tabTrigger' && tag.description) {
                        return (
                            <div key={index}>
                                <label className="gds-form-group__label -m-a-0" style={labelStyle}>Autocomplete trigger</label>
                                <h3 className="gds-text--body-md -m-b-3"><span className="gds-text--keyboard gds-text--body-sm">{autocompleteTrigger}</span></h3>
                            </div>
                        )
                    }

                    {/* Display component's author */}
                    if (tag.tag === 'author') {
                        var authorValue = tag.description,
                            comma = ',',
                            authorLabelValue;

                        // Plural if author contains a comma
                        authorValue.indexOf(comma) > -1 ? authorLabelValue = 'authors' : authorLabelValue = 'author';

                        return (
                            <div key={index} className="-m-b-3">
                                <label className="gds-form-group__label -m-a-0" style={labelStyle}>{authorLabelValue}</label>
                                <h3 className="gds-text--body-md">{tag.description}</h3>
                            </div>
                        )
                    }

                    {/* Display component options */}
                    if (tag.tag === 'optionalClasses') {
                        var optionsStyle = {fontSize: '0.8rem'};

                        if (componentOptions.toString().length !== 0) {
                            return (
                                <div key={index} className="-m-t-3">
                                    <label className="gds-form-group__label -m-a-0" style={labelStyle}>Options</label>
                                    {componentOptions.map(function(name, index) {
                                        return (
                                            <p key={index}><span style={optionsStyle} className="gds-text--code">{name}</span></p>
                                        )
                                    })}
                                </div>
                            )
                        } else {
                            return (
                                <div key={index} className="-m-t-3">
                                    <label className="gds-form-group__label -m-a-0" style={labelStyle}>Options</label>
                                    <p>None</p>
                                </div>
                            )
                        }
                    }

                })}
            </div>
        )
    }
});

// <GdsSlideNav /> component
var GdsSlideNav = React.createClass({
    componentDidMount: function() {
        // Off-canvas module
        (function($) {
            var element = $('[gg-slide-nav]'),
                html = $('[gg-slide-nav-html]'),
                menuOpen = false;

            function toggleMenu(e) {
                $('#gg-slide-nav-button').toggleClass('gds-page-header__menu--open');

                if (menuOpen) {
                    closeMenu();
                } else {
                    openMenu(e);
                }
            }

            function openMenu(e) {
                e.stopPropagation();
                element.addClass("gds-slide-out");
                html.addClass('hide-overflow');
                menuOpen = true;
            }

            function closeMenu(e) {
                element.removeClass("gds-slide-out");
                html.removeClass('hide-overflow');
                menuOpen = false;
            }

            $('body').on('click', '#gg-slide-nav-button', toggleMenu).on('click','[gg-nav-closer]', closeMenu);

            $('body').on('click', '.gds-slide-nav__list--expanded .gds-slide-nav__link', toggleMenu);
            $('body').on('click', '.gds-slide-nav__link.gds-slide-nav__link--expandable.gds-slide-nav__link--expanded', openMenu);

            // Toggle .gds-slide-nav menu with "a" key
            $(document).keypress(function(e) {
                // If any inputs or textareas are being typed in, disable "a" hotkey for showing .gds-slide-nav menu
                if ($('input[type="text"]:focus').length === 0 && $('input[type="email"]:focus').length === 0 && $('input[type="url"]:focus').length === 0 && $('input[type="password"]:focus').length === 0 && $('textarea:focus').length === 0 && e.which === 97) {
                    toggleMenu(e);
                }
            });

            // Hide .gds-slide-nav menu with esc
            $(document).on('keydown', function(e) {
                if (menuOpen && $('input[type="text"]:focus').length === 0 && $('input[type="email"]:focus').length === 0 && $('input[type="url"]:focus').length === 0 && $('input[type="password"]:focus').length === 0 && $('textarea:focus').length === 0 && e.which == 27) {
                    toggleMenu();
                }
            });
        }(jQuery));

        // Mobile-nav module
        (function($) {
            $('body').on('click', '.gg-expandable', function(e) {
                e.stopPropagation();

                var ea = 'gds-slide-nav__link--expanded',
                    el = 'gds-slide-nav__list--expanded';

                if ($(this).hasClass(ea)) {
                    $(this).parent().removeClass(el).children('.gg-expand-list').removeClass(el).parent().find('a').first().removeClass(ea);
                } else {
                    $(this).parent().siblings().removeClass(el).find('.gg-expand-list').removeClass(el).parent().find('a').removeClass(ea);
                    $(this).parent().addClass(el).children('.gg-expand-list').addClass(el).parent().find('a').first().addClass(ea);
                }
                return false;
            });
        }(jQuery));
    },
    render: function() {
        var sections = this.props.sections,
            components = this.props.components;

        return (
            <nav className="gds-slide-nav">
                <div className="gds-slide-nav__group">
                    <label className='gds-slide-nav__label'>Main Menu</label>
                    <ul className="gds-slide-nav__list">
                        {sections.map(function(section, index) {
                            return (
                                <GdsSlideNavSection key={index} section={section} components={components} />
                            )
                        })}
                    </ul>
                </div>
            </nav>
        )
    }
});

// <GdsSlideNavSection /> component
var GdsSlideNavSection = React.createClass({
    render: function() {
        var section = this.props.section,
            components = this.props.components;

        return (
            <li className="gds-slide-nav__list-item gds-slide-nav__list-item--primary gds-slide-nav__list-item--has-children">
                <a className="gds-slide-nav__link gds-slide-nav__link--expandable gg-expandable" href="#">{section}</a>
                <GdsSlideNavSectionList section={section} components={components} />
            </li>
        )
    }
});

// <GdsSlideNavSectionList /> component
var GdsSlideNavSectionList = React.createClass({
    render: function() {
        var section = this.props.section,
            components = this.props.components,
            sortedComponents = [];

        // Sort components in section
        components.map(function(component) {
            return component.tags.map(function(tag) {
                if (tag.tag === 'section' && tag.description === section) {
                    var parentComponent;

                    return component.tags.map(function(tag) {
                        if (tag.tag === 'parentComponent') {
                            parentComponent = tag.description;

                            return component.tags.map(function(tag) {
                                if (tag.tag === 'name' && tag.description === parentComponent && sortedComponents.indexOf(tag.name) < 0) {
                                    sortedComponents.push(tag.description);
                                }
                            });
                        }
                    });
                }
            });
        });
        sortedComponents.sort();

        return (
            <ul className="gds-slide-nav__list gds-slide-nav__list--nested gg-expand-list">
                {sortedComponents.map(function(component, index) {
                    return (
                        <li key={index}><a href={`#${slugify(section)}-${slugify(component)}`} className="gds-slide-nav__link">{component}</a></li>
                    )
                })}
            </ul>
        )
    }
});

// <GdsPageHeader /> component
var GdsPageHeader = React.createClass({
    componentDidMount: function() {
        $(window).bind('scroll', function() {
            if ($(window).scrollTop() >= 5) {
                $('.gds-page-header__product-bar').addClass('gds-page-header__product-bar--collapsed');
                $('.gds-table-of-contents__fixed-nav').addClass('gds-table-of-contents__fixed-nav--scrolled');
            }
            else {
                $('.gds-page-header__product-bar').removeClass('gds-page-header__product-bar--collapsed');
                $('.gds-table-of-contents__fixed-nav').removeClass('gds-table-of-contents__fixed-nav--scrolled');
            }
        });
    },
    render: function() {
        return (
            <header className="gds-page-header">
                <div className="gds-page-header__product-bar">
                    <h6 className="gds-page-header__product-name">Design System</h6>
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
