import './App.css'
import AppRouter from './routes/AppRouter';
import ErrorBoundary from './components/ErrorBoundary';


import { Provider } from 'react-redux';
import reducer from './redux/reducer';
import { createStore as createReduxStore } from 'redux';
import { applyMiddleware, compose } from 'redux';



const composeEnhancers = (typeof window !== undefined) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : null;

const store = createReduxStore(reducer, composeEnhancers(applyMiddleware()))

function App() {

  return (
    <ErrorBoundary>
      <div className='App_Route'>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </div>
    </ErrorBoundary>
  )
}

export default App
