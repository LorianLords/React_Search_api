import "./App.css";
import Home from "./views/Home";
import NavBar from "./components/NavBar/NavBar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <NavBar />

      <Outlet />
    </div>
  );
}

export default App;
