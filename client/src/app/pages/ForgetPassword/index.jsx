import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { Toaster, toast } from "sonner";
import { useGlobalContext } from "../../context/GlobalStateProvider";

const Login = () => {
  const apiUrl = import.meta.env.VITE_REACT_API_URL;
  const [data, setData] = useState({ email: "" });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { forgetEmail, setForgetEmail } = useGlobalContext();
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = `${apiUrl}/forgot-password`;
      setForgetEmail({ ...forgetEmail, email: data.email });
      // Send the email as part of the request body
      const res = await axios.post(url, { email: data.email });
      setData({ email: "" });
      setLoading(false);
      navigate("/resetPassword");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className={styles.login_container}>
      <Toaster />
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Forget password</h1>
            <input
              type="text"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />

            {error && <div className={styles.error_msg}>{error}</div>}
            <Link to={"/login"}>Login</Link>
            <button type="submit" className={styles.green_btn}>
              {loading ? "Loading..." : "Forget password"}
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>New Here ?</h1>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
