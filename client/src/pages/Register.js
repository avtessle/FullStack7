import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

function Register({ setCurrentName }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !password) {
      alert("Missing name or password");
      return;
    }

    const url = "http://localhost:3000/register";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password, phone, email }),
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 409) {
          throw "name or password already exists";
        }
      })
      .then((user) => {
        localStorage.setItem("currentUser", JSON.stringify(user));
        setCurrentName(name);
        navigate(`/store`);
      })
      .catch((error) => {
        console.error(error);
        alert(error);
      });
  };

  return (
    <section className={styles.section}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h5>REGISTER</h5>
        <div className={styles["form-row"]}>
          <input
            type="text"
            placeholder="Name"
            className={styles["form-input"]}
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles["form-row"]}>
          <input
            type="password"
            placeholder="Password"
            className={styles["form-input"]}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles["form-row"]}>
          <input
            type="phone"
            placeholder="Phone"
            className={styles["form-input"]}
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className={styles["form-row"]}>
          <input
            type="email"
            placeholder="Email"
            className={styles["form-input"]}
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.btn}>
          REGISTER
        </button>
        <Link className={styles["btn-link"]} to="/login">
          LOGIN
        </Link>
      </form>
    </section>
  );
}

export default Register;
