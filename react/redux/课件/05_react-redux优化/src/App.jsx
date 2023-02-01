import './App.css';
import Compute from './containers/Compute';
import Title from './components/Title';
import store from './redux/store';
import { Provider } from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Title />
        <Compute />
      </div>
    </Provider>
  )
}
