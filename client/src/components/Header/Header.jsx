import { useState } from "react";
import classes from "./index.module.css";
import bookmarkicon from "../../assets/bookmark-icon.svg";
import hamburgericon from "../../assets/hamburger-icon.svg";
import sampleuser from "../../assets/sample_user.jpg";
import Login from "../../pages/Login/Login";
import AddStory from "../../pages/AddStory/AddStory";

export default function Header() {
  const [user, setUser] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  return (
    <>
      {" "}
      <div className={classes.header}>
        {!user ? (
          <div className={classes.btnbox}>
            <button
              className={classes.redbtn + " " + classes.btn}
              onClick={() => setShowRegisterModal(true)}
            >
              Register Now
            </button>
            <button
              className={classes.bluebtn + " " + classes.btn}
              onClick={() => setShowLoginModal(true)}
            >
              Sign In
            </button>
          </div>
        ) : (
          <div className={classes.btnbox}>
            <button className={classes.btn + " " + classes.redbtn}>
              <img src={bookmarkicon} alt="" />
              Bookmarks
            </button>
            <button className={classes.btn + " " + classes.redbtn}>
              Add story
            </button>
            <img
              src={sampleuser}
              alt="sample-user"
              className={classes.sampleuser}
            />
            <img
              src={hamburgericon}
              alt="hamburder-icon"
              className={classes.hamburger}
            />
          </div>
        )}
      </div>
      {showLoginModal ? (
        <AddStory headingtext={"Login"} setShowLoginModal={setShowLoginModal} />
      ) : (
        <></>
      )}
      {showRegisterModal ? (
        <Login
          headingtext={"Register"}
          setShowRegisterModal={setShowRegisterModal}
        />
      ) : (
        <></>
      )}
    </>
  );
}
