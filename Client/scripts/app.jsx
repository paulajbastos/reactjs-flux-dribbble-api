'use strict';

/* TESTE
//import React from 'react';
//import NavBrand from './views/NavBrand.jsx';
//import Check from './CheckboxWithLabel.js';

//React.render(<NavBrand/>, document.getElementById('root'));
//React.render(<Check/>, document.getElementById('root'));
*/


import React from 'react';
import AppView from './views/AppView.jsx';

import dispatcher from './dispatcher';

dispatcher.dispatch('APPINIT');

//var pages = [
//      { name: 'dribbble', title: 'Dribbble', nav: true, default: true }
//];
//var route = 'dribbble';

React.render(<AppView/>, document.getElementById('root'));

//React.render(<AppView pages={pages} route={route}/>, document.getElementById('root'));
//React.render(<NavBar pages={pages} route={route}/>, document.getElementById('root'));