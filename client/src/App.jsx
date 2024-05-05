import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./app/pages/Main";
import Signup from "./app/pages/Singup";
import Login from "./app/pages/Login";
import Emailverify from "./app/pages/Emailverify";
import ForgetPassword from "./app/pages/ForgetPassword";
import ResetPassword from "./app/pages/ResetPassword";
import Dashboard from "./app/pages/Dashboard";
import UserTable from "./app/pages/UserTable";
import AdminTable from "./app/pages/AdminTable";
function App() {
  const user = localStorage.getItem("token");

  return (
    <Routes>
      {user && <Route path="/" exact element={<Main />} />}
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/users/:id/verify/:token" element={<Emailverify />} />
      <Route path="/forgetPassword" element={<ForgetPassword />} />
      <Route path="/resetPassword" element={<ResetPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/adminTable" element={<AdminTable />} />
    </Routes>
  );
}

export default App;
