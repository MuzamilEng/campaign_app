import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { set } from "react-hook-form";

const index = () => {
  const apiUrl = import.meta.env.VITE_REACT_API_URL;
  const [validUrl, setValidUrl] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    const verifiedEmailUser = async () => {
      try {
        const url = `${apiUrl}/auth/${params.id}/verify/${params.token}`;
        const data = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (err) {
        console.log(err.message);
        setValidUrl(false);
      }
    };
    verifiedEmailUser();
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  }, [params]);
  return (
    <>
      {validUrl ? (
        <div
          className={styles.container}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <div className="" style={{ width: "15vw" }}>
            <img
              src="/img/verify.png"
              alt=""
              className={styles.img_success}
              style={{ width: "100%" }}
            />
          </div>
          <h1>Email verified successfuly</h1>
        </div>
      ) : (
        <p style={{ color: "red" }}>Not found</p>
      )}
    </>
  );
};

export default index;
