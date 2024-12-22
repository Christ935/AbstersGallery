import './App.css';
import {BrowserRouter, Route,Routes} from 'react-router-dom';
import Home from './components/Home';
import { MemeProvider } from './components/MemeProvider';

function App() {
  return (
   <MemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
    </BrowserRouter>
    </MemeProvider>
  );
}

export default App;
