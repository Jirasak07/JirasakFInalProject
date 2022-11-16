import logo from './logo.svg';
import './App.css';
import Login from './Component/Auth/Login';
import Navbar from './Component/Navbar/Navbar';
import Router from './Component/Router';

function App() {
  return (
   <div >
   <Navbar/>
       {/* <Login/> */}
       <Router className='app' />
   </div>
  );
}

export default App;
