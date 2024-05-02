import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { Toaster, toast } from "sonner";

const Login = () => {
  const apiUrl = import.meta.env.VITE_REACT_API_URL;

  const [data, setData] = useState({ email: "" });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = `${apiUrl}/forgot-password`;
      const res = await axios.post(url, data);
      setData({ email: "" });
      //   console.log(res);
      setLoading(false);
      navigate("/resetPassword");
    } catch (error) {
      console.log(error.response.data.error);
      setError(error.response.data.error);
      toast.error(error.response.data.error);
      setLoading(false);
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
