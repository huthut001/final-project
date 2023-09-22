import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Crud from "./components/Crud";
import Update from "./components/Update";
import Question from "./components/Question";
import Home from "./components/Home";
import Compiler from "./components/Compiler";
import Forum from "./components/Forum";
import Front from "./front";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="question" element={<Question />} />
        <Route path="profile" element={<Profile />} />
        <Route path="register" element={<Register />} />
        <Route path="crud" element={<Crud />} />
        <Route path='/update/:id' element={<Update />} />
        <Route path="compiler" element={<Compiler />}/>
        <Route path="forum" element={<Forum />}/>
        <Route path="front" element={<Front />}/>
      </Routes>
    </div>
  );
}

export default App;