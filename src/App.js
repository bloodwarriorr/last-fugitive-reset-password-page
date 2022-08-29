import logo from './logo.svg';
import './App.css';
import Form from './components/Form';

function App() {
  const queryString = window.location.search;
  const urlParms = new URLSearchParams(queryString)
  const id = urlParms.get("id");
  const token = urlParms.get("token")
  return (
    <div className="App">
     <Form id = {id} token = {token}/>
    </div>
  );
}

export default App;
