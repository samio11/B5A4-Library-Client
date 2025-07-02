import { Outlet } from "react-router-dom";
import Navbar from "./pages/HomePage/Navbar";

function App() {
  return (
    <div className="space-y-3">
      <Navbar></Navbar>

      <Outlet></Outlet>
    </div>
  );
}

export default App;
