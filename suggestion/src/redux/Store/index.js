import Redux from 'redux'

// 引入createStore创建store，引入applyMiddleware 来使用中间件
import {createStore, applyMiddleware} from 'redux'

// 引入所有的reducer
import storeReducer from '../Reducer/index.js'

// 利用redux-logger打印日志
import {createLogger} from 'redux-logger'

// 安装redux-devtools-extension的可视化工具。
import { composeWithDevTools } from 'redux-devtools-extension'


// 使用日志打印方法， collapsed让action折叠，看着舒服。
const loggerMiddleware = createLogger({collapsed: true});

export default  createStore(
	storeReducer,
	composeWithDevTools(
	)
)