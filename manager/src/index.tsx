import * as React from "react";
import * as ReactDom from 'react-dom'

import Index from './pages/Index'
import Detail from './pages/Detail'
import Log from './pages/Log'
import store from './redux/Store/index'

import {Provider} from 'react-redux'

import { Router, Route, Link,  IndexRoute, hashHistory, browserHistory } from 'react-router'

ReactDom.render(
	(
		<Provider store={store}>
			<Router history={browserHistory}>
				<Route path="/" component={Index}/>
				<Route path="/detail" component={Detail}></Route>
				<Route path='/log' component={Log}></Route>
			</Router>
		</Provider> 	
	),
	document.querySelector('#app')
)