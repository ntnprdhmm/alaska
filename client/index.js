import { Provider } from 'preact-redux'
import reducer from './reducer'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import App from './components/app'

let store = createStore(reducer, applyMiddleware(thunk))

export default () => (
	<div id="outer">
		<Provider store={store}>
			<App />
		</Provider>
	</div>
)
