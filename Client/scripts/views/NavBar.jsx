import React from 'react';
import Actions from '../actions';
import NavBrand from './NavBrand.jsx';
import NavLinks from './NavLinks.jsx';
import NavVoltar from './NavVoltar.jsx';

class NavBar extends React.Component {
    
    onClick(route) {
        Actions.navigate(route);
    }

    render() {

        //let handlerVoltar = event => { return this.onClick("dribbblelist", event); };
        //<div onClick={handlerVoltar}>Voltar</div>

        return (
            <header>
                
                <NavVoltar pages={this.props.pages} route={this.props.route}/>
                <div className="_navbar">
                    <NavBrand/>
                </div>
                <div className="_navbar _navbar_grow">
                    <NavLinks pages={this.props.pages} route={this.props.route}/>
                </div>
            </header>
        );
    }
}

NavLinks.propTypes = {
    pages: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                nav: React.PropTypes.bool,
                name: React.PropTypes.string.isRequired,
                title: React.PropTypes.string.isRequired
            })
        ).isRequired,
    route: React.PropTypes.string.isRequired
};

export default NavBar;
