import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { set } from "react-hook-form";

const index = () => {
  const [validUrl, setValidUrl] = useState(false);
  const params = useParams();
  useEffect(() => {
    const verifiedEmailUser = async () => {
      try {
        const url = `http://localhost:5000/api/v1/users/${params.id}/verify/${params.token}`;
        const data = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (err) {
        console.log(err.message);
        setValidUrl(false);
      }
    };
  }, [params]);
  return (
    <>
      {validUrl ? (
        <div className={styles.container}>
          <img src="/img/verify.png" alt="" className={styles.img_success} />
          <h1>Email verified successfuly</h1>
          <Link to={"/login"}>
            <button className={styles.green_btn}>Login</button>
          </Link>
        </div>
      ) : (
        <p>Not found</p>
      )}
    </>
  );
};

export default index;
