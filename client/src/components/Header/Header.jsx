import { useState } from "react";
import classes from "./index.module.css";
import bookmarkicon from "../../assets/bookmark-icon.svg";
import hamburgericon from "../../assets/hamburger-icon.svg";
import sampleuser from "../../assets/sample_user.jpg";

export default function Header() {
  const [user, setUser] = useState(null);

  return (
    <div className={classes.header}>
      {!user ? (
        <div className={classes.btnbox}>
          <button className={classes.redbtn + " " + classes.btn}>
            Register Now
          </button>
          <button className={classes.bluebtn + " " + classes.btn}>
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
  );
}
