require.context('./assets', true, /^\.\//);
import './styles/index.styl';
import React, { Component }                                  from 'react';
import { render }                                            from 'react-dom';
import { Router, Route, IndexRoute, Link, useRouterHistory } from 'react-router';
import { createHashHistory }                                 from 'history';
import Nav                                                   from './components/nav/Nav';
import MiniNav                                               from './components/nav/MiniNav';
import Home                                                  from './components/Home';
import Header                                                from './components/Header';


class App extends Component {
    constructor(props) {
        super(props);

        this.handleNavToggle = this.handleNavToggle.bind(this);
        this.handleNavClose  = this.handleNavClose.bind(this);

        this.state = { nav: false };
    }

    handleNavToggle(state) {
        this.setState({ nav: state });
    }

    handleNavClose() {
        this.setState({ nav: false });
    }

    render() {
        const { location, routes } = this.props;
        const { nav }              = this.state;

        const isHome = location.pathname === '/';
        if (isHome) {
            return this.props.children;
        }

        return (
            <div>
                <Header onNavToggle={this.handleNavToggle} />
                <MiniNav routes={routes} location={location} />
                {nav && <Nav onNavClose={this.handleNavClose} />}
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}


import { getRoutes } from './SiteMap';


const appHistory = useRouterHistory(createHashHistory)({
    queryKey: false
});

render((
    <Router history={appHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            {getRoutes()}
            <Route path="*" component={Home} />
        </Route>
    </Router>
), document.getElementById('nivo'));
