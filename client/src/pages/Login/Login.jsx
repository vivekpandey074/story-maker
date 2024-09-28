import classes from "./index.module.css";
import eyebtn from "../../assets/eye.svg";
import crossbtn from "../../assets/crossbtn.svg";
import { useRef, useState } from "react";
import { GetCurrentUser, LoginUser, RegisterUser } from "../../api/users";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { SetUser } from "../../redux/userSlice";
import { useLocation, useNavigate } from "react-router-dom";

const initialState = {
  username: "",
  password: "",
};

const registerErrorMessage = {
  username: "Please enter valid username: must be 9-20 character long",
  password:
    "Please enter valid password: should be 8-20 characters and include at least 1  letter, 1 number and 1 special character!",
};

const usernameRegex = new RegExp("^[a-zA-Z0-9_.@#$%^&*-]{8,20}$");
const passwordRegex = new RegExp(
  "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
);

export default function Login({ headingtext }) {
  const inputref = useRef(null);
  const [error, setError] = useState("");
  const [form, setForm] = useState(initialState);
  const { username, password } = form;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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

  const toggleInputType = () => {
    if (inputref.current) {
      inputref.current.type =
        inputref.current.type === "text" ? "password" : "text";
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    if (headingtext === "Register" && !usernameRegex.test(username)) {
      setError(registerErrorMessage.username);

      return;
    }

    if (headingtext === "Register" && !passwordRegex.test(password)) {
      setError(registerErrorMessage.password);

      return;
    }

    if (headingtext === "Register") setError("");
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await LoginUser(form);
      setLoading(false);
      if (response.success) {
        localStorage.setItem("token", response.token);
        validateToken();
        toast.success(response.message);
        if (location?.state?.storyId) {
          navigate(
            `/viewstories/${location?.state?.storyId}?index=${location?.state?.index}`
          );
        } else navigate("/");
      } else {
        if (response.message === "Please enter valid username or password") {
          setError("Please enter valid username or password");
        } else throw new Error(response.message);
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.message || "Something went wrong while logging in");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await RegisterUser(form);
      setLoading(false);
      if (response.success) {
        toast.success("User registered successfully");
        setForm(initialState);
        navigate("/");
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.message || "Something went wrong while registering user");
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
            navigate("/");
          }}
        />

        <form
          className={classes.form}
          onSubmit={(e) => {
            if (headingtext === "Login") {
              handleLoginSubmit(e);
            } else {
              handleRegisterSubmit(e);
            }
          }}
        >
          <h1 className={classes.heading}>{headingtext}</h1>
          <div className={classes.inputcont}>
            <label htmlFor="username">Username</label>
            <input
              name="username"
              type="text"
              value={username}
              onChange={handleChange}
              className={classes.input}
              required
              placeholder="Enter username"
            />
          </div>
          <div className={classes.inputcont}>
            <label htmlFor="password">Password</label>
            <input
              ref={inputref}
              name="password"
              type="password"
              value={password}
              required
              onChange={handleChange}
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
          {error && <p className={classes.error_text}>{error}</p>}

          <button type="submit" className={classes.btn + " " + classes.bluebtn}>
            {loading ? "Loading..." : `${headingtext}`}
          </button>
        </form>
      </div>
    </div>
  );
}
