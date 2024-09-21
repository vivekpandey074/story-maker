import classes from "./index.module.css";
import crossbtn from "../../assets/crossbtn.svg";
export default function AddStory({ setShowLoginModal }) {
  return (
    <div className={classes.main_div}>
      <div className={classes.overlay}></div>;
      <div className={classes.modal_cont}>
        <img
          src={crossbtn}
          alt=""
          className={classes.crossbtn}
          onClick={() => {
            setShowLoginModal(false);
          }}
        />
        <div className={classes.slideboxcont}>
          <div className={classes.slidebox}>Slide 1</div>
          <div className={classes.slidebox}>Slide 2</div>
          <div className={classes.slidebox}>Slide 3</div>
          <div className={classes.slidebox}>Add +</div>
        </div>

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
          </div>

          <button className={classes.btn + " " + classes.bluebtn}>Post</button>
        </form>
      </div>
    </div>
  );
}
