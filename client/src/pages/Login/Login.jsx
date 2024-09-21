import classes from "./index.module.css";
import eyebtn from "../../assets/eye.svg";
import crossbtn from "../../assets/crossbtn.svg";
import { useRef, useState } from "react";

export default function Login({
  headingtext,
  setShowLoginModal,
  setShowRegisterModal,
}) {
  const inputref = useRef(null);
  const [error, setError] = useState(true);

  const toggleInputType = () => {
    if (inputref.current) {
      inputref.current.type =
        inputref.current.type === "text" ? "password" : "text";
    }
  };

  return (
    <div className={classes.main_div}>
      <div className={classes.overlay}></div>;
      <div className={classes.modal_cont}>
        <img
          src={crossbtn}
          alt=""
          className={classes.crossbtn}
          onClick={() => {
            if (headingtext === "Login") {
              setShowLoginModal(false);
            } else {
              setShowRegisterModal(false);
            }
          }}
        />

        <form action="" className={classes.form}>
          <h1 className={classes.heading}>{headingtext}</h1>
          <div className={classes.inputcont}>
            <label htmlFor="username">Username</label>
            <input
              name="username"
              type="text"
              className={classes.input}
              placeholder="Enter username"
            />
          </div>
          <div className={classes.inputcont}>
            <label htmlFor="password">Password</label>
            <input
              ref={inputref}
              name="password"
              type="password"
              className={classes.input}
              placeholder="Enter password"
            />
            <img
              src={eyebtn}
              alt=""
              className={classes.eyebtn}
              onClick={toggleInputType}
            />
          </div>
          {error && (
            <p className={classes.error_text}>Please enter valid username</p>
          )}
          <button className={classes.btn + " " + classes.bluebtn}>
            {headingtext}
          </button>
        </form>
      </div>
    </div>
  );
}
