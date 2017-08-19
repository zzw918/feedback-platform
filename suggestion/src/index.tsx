import * as React from 'react'
import * as ReactDom from 'react-dom'
import Index from './pages/Index'
import AllSug from './pages/Allsug'
import Detail from './pages/Detail'
import Log from './pages/Log'

import {Provider} from 'react-redux'
import store from './redux/Store/index'

import { Router, Route, Link,  IndexRoute, hashHistory, browserHistory } from 'react-router'

ReactDom.render(
	(
		<Provider store={store}> 
			<Router history={browserHistory}>
				<Route path="/" component={Index}/>
				<Route path="/allSuggestions" component={AllSug} />
				<Route path="/detail" component={Detail} /> 
				<Route path="/log" component={Log}/>
			</Router>
		</Provider>
	),
	document.querySelector('#app')
)