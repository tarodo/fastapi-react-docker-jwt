import './App.css';
import LoginForm from "./components/login";

import MainPage from "./components/mainPage";
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="" element={<LoginForm />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="home" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
