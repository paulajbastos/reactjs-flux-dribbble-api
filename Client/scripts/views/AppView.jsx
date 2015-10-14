/*
import React from 'react';
//import assign from 'lodash/object/assign';
import NavBar from './NavBar.jsx';
import Welcome from './Welcome.jsx';
 
class AppView extends React.Component {
    constructor(props) {
        super(props);
 
        this.state = this.props;
    }
 
    render() {
        let Route;
        switch (this.state.route) {
            case 'welcome': Route = Welcome; break;
            default: Route = Welcome;
        }
 
        return (
            <div id="pagehost">
                <NavBar pages={this.state.pages} route={this.state.route}/>

                <Route/>

            </div>
        );
    }
}
 
AppView.propTypes = {
    pages: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                auth: React.PropTypes.bool,
                nav: React.PropTypes.bool,
                name: React.PropTypes.string.isRequired,
                title: React.PropTypes.string.isRequired
            })
        ).isRequired,
    route: React.PropTypes.string.isRequired
};
 
export default AppView;
*/


import React from 'react';
import appStore from '../stores/AppStore';
import NavBar from './NavBar.jsx';
import DribbbleList from './DribbbleList.jsx';
import DribbbleDetail from './DribbbleDetail.jsx';

class AppView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pages: [],
            route: 'DribbbleList'
        };
    }

    componentWillMount() {
        this.appStoreId = appStore.registerView(() => { this.updateState(); });
        this.updateState();
    }

    componentWillUnmount() {
        appStore.deregisterView(this.appStoreId);
    }

    updateState() {
        this.setState({
            route: appStore.get('route'),
            pages: appStore.get('pages')
        });
    }

    render() {
        let Route;
        switch (this.state.route) {
            case 'dribbledlist': Route = DribbbleList; break;
            case 'dribbbledetail': Route = DribbbleDetail; break;

            default: Route = DribbbleList;
        }

        return (
            <div id="pagehost">
                <NavBar pages={this.state.pages} route={this.state.route} />
                <Route/>
            </div>
        );
    }
}

export default AppView;
