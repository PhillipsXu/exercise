import './App.css';
import Compute from './containers/Compute';
import Title from './components/Title';
import store from './redux/store';

export default function App() {
  return (
    <div className="App">
      <Title />
      <Compute store={store}/>
    </div>
  )
}
