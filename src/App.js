import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar  from "./components/Navbar/index";
import Footer from "./components/Footer/index";
import Home from "./components/Home/index";
import Community from "./components/Community/index";
import Lexibot from "./components/Lexibot/index";
import Translate from "./components/Translate/index";
import Wordlist from "./components/Wordlist/index";
function App() {
  return (
    <div className="App">
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/translate" element={<Translate />} />
        <Route path="/wordlist" element={<Wordlist />} />
        <Route path="/community" element={<Community />} />
        <Route path="/lexibot" element={<Lexibot />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
