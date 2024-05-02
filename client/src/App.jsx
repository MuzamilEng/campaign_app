import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./app/components/Main";
import Signup from "./app/components/Singup";
import Login from "./app/components/Login";
import Emailverify from "./app/components/Emailverify";
import ForgetPassword from "./app/components/ForgetPassword";
import ResetPassword from "./app/components/ResetPassword";
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
    </Routes>
  );
}

export default App;
