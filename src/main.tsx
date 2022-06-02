import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './redux/store.js'

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <div>
        <App />
      </div>
    </Provider>
  </Router>,
  document.getElementById('root'),
)
