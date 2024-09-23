import classes from "./index.module.css";
import defaultimage from "../../assets/defaultimage2.jpg";
import downgradient from "../../assets/down-gradient.png";
import upgradient from "../../assets/upgradient.png";
import leftArrow from "../../assets/leftArrow.svg";
import rightArrow from "../../assets/rightArrow.svg";
import likebtn from "../../assets/likebtn.svg";
import bookmarkbtn from "../../assets/bookmarkbtn.svg";
import downloadbtn from "../../assets/downloadbtn.svg";
import sharebtn from "../../assets/sharebnt.svg";
import storyclosebtn from "../../assets/storyclosebtn.svg";

export default function ViewStory() {
  return (
    <div className={classes.main_div}>
      <div className={classes.overlay}></div>;
      <div className={classes.modal_cont}>
        <img src={leftArrow} alt="" className={classes.arrow} />
        <div className={classes.storybox}>
          <img src={upgradient} alt="" className={classes.gradientimg} />
          <img src={defaultimage} alt="" className={classes.storyimage} />
          <img src={downgradient} alt="" className={classes.gradientimg} />
          <div className={classes.upper_cont}>
            <div className={classes.slide_array_cont}>
              <div className={classes.slide_array_box}></div>
              <div className={classes.slide_array_box}></div>
              <div className={classes.slide_array_box}></div>
              <div className={classes.slide_array_box}></div>
              <div className={classes.slide_array_box}></div>
              <div className={classes.slide_array_box}></div>
            </div>
            <div className={classes.upper_btn_panel}>
              <img src={storyclosebtn} alt="" />
              <img src={sharebtn} alt="" />
            </div>
          </div>
          <div className={classes.story_text_cont}>
            <h1 className={classes.story_heading}>
              Lorem ipsum dolor sit amet
            </h1>
            <p className={classes.story_subtext}>
              Inspirational designs, illustrations, and graphic elements from
              the world’s best designers.
            </p>
            <div className={classes.btn_panel}>
              <img src={bookmarkbtn} alt="" />
              <img src={downloadbtn} alt="" />
              <img src={likebtn} alt="" />
            </div>
          </div>
        </div>
        <img src={rightArrow} alt="" className={classes.arrow} />
      </div>
    </div>
  );
}
