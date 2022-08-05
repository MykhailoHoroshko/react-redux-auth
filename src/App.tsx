import "./App.css";
import { Login } from "./features/login/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import { IsLoggedIn } from "./common/isLoggedIn/IsLoggedIn";
import { Home } from "./views/home/Home";

function LoginRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function LogoutRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

function App() {
  return (
    <div className="App">
      <IsLoggedIn otherwise={<LogoutRoutes />}>
        <LoginRoutes />
      </IsLoggedIn>
    </div>
  );
}

export default App;
