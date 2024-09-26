import { useEffect, useState } from "react";
import classes from "./index.module.css";
import bookmarkicon from "../../assets/bookmark-icon.svg";
import hamburgericon from "../../assets/hamburger-icon.svg";
import sampleuser from "../../assets/sample_user.jpg";
import Login from "../../pages/Login/Login";
import AddStory from "../../pages/AddStory/AddStory";
import { useDispatch, useSelector } from "react-redux";
import { GetCurrentUser } from "../../api/users";
import { SetUser } from "../../redux/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

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
    dispatch(SetUser(null));
  };

  useEffect(() => {
    try {
      if (localStorage.getItem("token")) validateToken();
    } catch (err) {
      toast.error(err.message);
    }
  }, []);

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
            <button
              className={classes.btn + " " + classes.redbtn}
              onClick={() => navigate("/addstory")}
            >
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
      </div>
      {showLoginModal ? (
        <Login headingtext={"Login"} setShowLoginModal={setShowLoginModal} />
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
