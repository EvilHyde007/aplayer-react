import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Player from './components/Player';
import Layout from './components/Layout';
import './styles/Home.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/playlist/:id" element={<Player />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
