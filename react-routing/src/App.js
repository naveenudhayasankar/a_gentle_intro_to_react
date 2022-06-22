import logo from './logo.svg';
import './App.css';
import {Link, Route, Navigate} from 'react-router-dom'
import { Routes } from 'react-router';
import Home from './Components/Home';
import Messages from './Components/Messages';
import About from './Components/About';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className='menu'>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/messages'>Messages</Link></li>
            <li><Link to='/about'>About</Link></li>
          </ul>
          <a href='/messages'>Messages a tag</a>
        </div>
        <div className='App-intro'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/messages' element={<Messages/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='*' element={<Navigate to='/' replace/>}/>
          </Routes>
        </div>
    </div>
  );
}

export default App;
