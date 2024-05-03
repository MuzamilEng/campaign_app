import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { Toaster, toast } from "sonner";

const Signup = () => {
  const apiUrl = import.meta.env.VITE_REACT_API_URL;

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = `${apiUrl}/auth/signup`;
      const { data: res } = await axios.post(url, data);
      setMessage(res.message);
      setData({ firstName: "", lastName: "", email: "", password: "" });
      toast.success(res.message);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.error);
      // setError(error.response.data.error);
      toast.error(error.response.data.error);
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log(apiUrl);
  }, []);
  return (
    <div className={styles.signup_container}>
      <Toaster position="top-center" />
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sing in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Phone Number"
              name="phoneNumber"
              onChange={handleChange}
              value={data.phoneNumber}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            {message && <div className={styles.success_msg}>{message}</div>}
            <button type="submit" className={styles.green_btn}>
              {loading ? "loading...." : "Sign up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;