import { useEffect, useState } from "react";
import classes from "./index.module.css";
import bookmarkicon from "../../assets/bookmark-icon.svg";
import hamburgericon from "../../assets/hamburger-icon.svg";
import sampleuser from "../../assets/sample_user.jpg";
import { useDispatch, useSelector } from "react-redux";
import { GetCurrentUser } from "../../api/users";
import { SetUser } from "../../redux/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import blackcross from "../../assets/blackcross.svg";

export default function Header({ bookmarkactive }) {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  const validateToken = async () => {
    try {
      const response = await GetCurrentUser();
      if (response.success) {
        dispatch(SetUser(response.currentuser));
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong while validating user");
      localStorage.removeItem("token");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setShowLogout(false);
    navigate("/");
    dispatch(SetUser(null));
  };

  useEffect(() => {
    try {
      if (localStorage.getItem("token")) validateToken();
    } catch (err) {
      toast.error(err.message);
    }
  }, []);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 600);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {" "}
      <div className={classes.header}>
        {!user ? (
          <div className={classes.btnbox}>
            <button
              className={
                classes.redbtn + " " + classes.btn + " " + classes.bookmark_btn
              }
              onClick={() => navigate("/register")}
            >
              Register Now
            </button>
            <button
              className={
                classes.bluebtn + " " + classes.bookmark_btn + " " + classes.btn
              }
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
            {isMobile && (
              <img
                src={hamburgericon}
                alt="hamburder-icon"
                className={classes.hamburger}
                onClick={() => setShowLogout((prev) => !prev)}
              />
            )}
          </div>
        ) : (
          <div className={classes.btnbox}>
            <button
              className={
                classes.btn +
                " " +
                classes.bookmark_btn +
                " " +
                classes.redbtn +
                " " +
                (bookmarkactive ? classes.bookmark_active : "")
              }
              onClick={() => navigate("/bookmarks")}
            >
              <img src={bookmarkicon} alt="" />
              Bookmarks
            </button>
            <button
              className={
                classes.btn + " " + classes.add_story_btn + " " + classes.redbtn
              }
              onClick={() => navigate("/addstory")}
            >
              Add story
            </button>
            <img
              src={sampleuser}
              alt="sample-user"
              className={classes.sampleuser + " " + classes.bookmark_btn}
            />
            <img
              src={hamburgericon}
              alt="hamburder-icon"
              className={classes.hamburger}
              onClick={() => setShowLogout((prev) => !prev)}
            />
            {showLogout && (
              <div className={classes.logout_div}>
                <p className={classes.name_text}>{user.username}</p>
                <button
                  className={classes.btn + " " + classes.redbtn}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
        {isMobile && showLogout && (
          <div className={classes.logout_div}>
            {!user ? (
              <div className={classes.mobile_btnbox}>
                <img
                  src={blackcross}
                  alt=""
                  className={classes.blackcross_btn}
                  onClick={() => setShowLogout(false)}
                />
                <button
                  className={classes.redbtn + " " + classes.btn}
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className={classes.redbtn + " " + classes.btn}
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </div>
            ) : (
              <div className={classes.mobile_btnbox}>
                <img
                  src={blackcross}
                  alt=""
                  className={classes.blackcross_btn}
                  onClick={() => setShowLogout(false)}
                />
                <div className={classes.user_div}>
                  <img
                    src={sampleuser}
                    alt="sample-user"
                    className={classes.sampleuser}
                  />
                  <p>{user?.username}</p>
                </div>
                <button
                  className={classes.btn + " " + classes.redbtn}
                  onClick={() => setShowLogout(false)}
                >
                  Your Story
                </button>
                <button
                  className={classes.btn + " " + classes.redbtn}
                  onClick={() => navigate("/addstory")}
                >
                  Add story
                </button>
                <button
                  className={
                    classes.btn +
                    " " +
                    classes.redbtn +
                    " " +
                    (bookmarkactive ? classes.bookmark_active : "")
                  }
                  onClick={() => navigate("/bookmarks")}
                >
                  <img src={bookmarkicon} alt="" />
                  Bookmarks
                </button>
                <button
                  className={classes.btn + " " + classes.redbtn}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
