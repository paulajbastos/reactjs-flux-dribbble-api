import React from 'react';
import Actions from '../actions';
import NavLinks from './NavLinks.jsx';

class NavVoltar extends React.Component {
    onClick(route) {
        Actions.navigate(route);
    }

    render() {
        
        //console.log("this.props.route = " + this.props.route);
        let cssClass = ("dribbblelist" === this.props.route) ? '_navbar btn-voltar hidden' : '_navbar  btn-voltar visible';

        let handlerVoltar = event => { return this.onClick("dribbblelist", event); };
        
        return (
            <div className={cssClass}>
                <button className="btn btn-default" onClick={handlerVoltar}>Voltar</button>
            </div>
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
export default NavVoltar;
