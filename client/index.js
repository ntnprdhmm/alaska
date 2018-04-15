import { Provider } from 'preact-redux'
import reducer from './reducer'
import { createStore } from 'redux'
import App from './components/app'

let store = createStore(reducer)

export default () => (
	<div id="outer">
		<Provider store={store}>
			<App />
		</Provider>
	</div>
)
