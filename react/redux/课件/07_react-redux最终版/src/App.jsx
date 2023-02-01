import './App.css';
import Compute from './containers/Compute';
import Title from './components/Title';
import Person from './containers/Person';
import store from './redux/store';
import { Provider } from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Title />
        <Compute />
        <hr style={{margin: '20px 0'}} />
        <Person />
      </div>
    </Provider>
  )
}
