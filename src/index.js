/* eslint-disable no-console */
console.log('hi test');

import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import configureStore from '../src/store/configureStore';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import routes from '../src/components/routes';
/*import {loadCourses} from '../src/actions/courseActions';
import {loadAuthors} from '../src/actions/authorActions';*/
import '../css/style.css';
import '../css/map.css';

//import Header from '../src/components/common/Header';

const store = configureStore();
/*store.dispatch(loadCourses());
store.dispatch(loadAuthors());*/

render (
<Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
</Provider>, document.getElementById('app')
);
/*
render (    
    <Router history={browserHistory} routes={routes} />
        , document.getElementById('app')
);*/

console.log('done');