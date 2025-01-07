import Navbar from "./components/Navbar/Navbar";
import Siderbar from "./components/Siderbar/Siderbar";
import {Routes,Route} from 'react-router-dom';
import Add from './pages/Add/Add';
import List  from './pages/List/List';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


function App() {
  const url = "http://localhost:4000";
  return (
    <div className="App">
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Siderbar/>
        <Routes>
          <Route path = "/add" element = {<Add url={url}/>}/>
          <Route path = "/list" element = {<List url={url}/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
