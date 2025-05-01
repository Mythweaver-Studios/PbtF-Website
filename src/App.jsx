// /src/App.jsx
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Characters from './pages/Characters';
import Explore from './pages/Explore';
import Home from './pages/Home';
import News from './pages/News';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/characters" element={<Characters />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;