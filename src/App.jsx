// /src/App.jsx
import './App.css'; // General App styles (can be empty)
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Layout & Page Components
import Layout from './components/Layout'; // Import the main layout
import Home from './pages/Home';
import Characters from './pages/Characters';
import Explore from './pages/Explore';
import News from './pages/News';

// Placeholder components for routes not yet built
const More = () => <div>More Page Content</div>;
const Login = () => <div style={{ padding: '50px', textAlign: 'center' }}>Login Page Content</div>; // Added padding for visibility

function App() {
  return (
    <BrowserRouter>
      {/* Routes manage which component renders based on the URL */}
      <Routes>
        {/* Routes that use the main Layout (NavBar + Page Content) */}
        <Route path="/" element={<Layout />}> {/* Parent route using Layout */}
          <Route index element={<Home />} /> {/* Default child route for '/' */}
          <Route path="news" element={<News />} />
          <Route path="characters" element={<Characters />} />
          <Route path="explore" element={<Explore />} />
          <Route path="more" element={<More />} />
          {/* Add other pages that need the NavBar here */}
        </Route>

        {/* Optional: Add a 404 Not Found route */}
        {/* <Route path="*" element={<div>404 Not Found</div>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;