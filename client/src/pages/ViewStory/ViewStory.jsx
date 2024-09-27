import classes from "./index.module.css";
import defaultimage from "../../assets/defaultimage2.jpg";
import downgradient from "../../assets/down-gradient.png";
import upgradient from "../../assets/upgradient.png";
import leftArrow from "../../assets/leftArrow.svg";
import rightArrow from "../../assets/rightArrow.svg";
import likebtn from "../../assets/likebtn.svg";
import redlikebtn from "../../assets/redlikebtn.svg";
import bookmarkbtn from "../../assets/bookmarkbtn.svg";
import downloadbtn from "../../assets/downloadbtn.svg";
import sharebtn from "../../assets/sharebnt.svg";
import bluebookmarkbtn from "../../assets/bluebookmarkbtn.svg";
import storyclosebtn from "../../assets/storyclosebtn.svg";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GetCurrentStory, ToggleBookmark, ToggleLike } from "../../api/story";

export default function ViewStory() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryindex = searchParams.get("index");

  const { user } = useSelector((state) => state.users);

  const [currentIndex, setCurrentIndex] = useState(queryindex || 0);
  const [toastTimer, setToastTimer] = useState(false);
  const [story, setStory] = useState();
  const navigate = useNavigate();

  const GetStory = async () => {
    try {
      setLoading(true);
      const response = await GetCurrentStory(id);
      setLoading(false);
      if (response.success) {
        setStory(response.story);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.message || "Something went wrong while fetching story ");
    }
  };

  useEffect(() => {
    GetStory();
  }, []);

  const handleShare = () => {
    const shareurl = window.location.href;
    navigator.clipboard.writeText(shareurl);

    setToastTimer(true);
    setTimeout(() => {
      setToastTimer(false);
    }, 2000);
  };

  const handleNextIndex = () => {
    setCurrentIndex((prev) =>
      prev === story?.slides.length - 1 ? story.slides.length - 1 : prev + 1
    );

    setSearchParams({
      index:
        currentIndex === story?.slides.length - 1
          ? story.slides.length - 1
          : currentIndex + 1,
    });
  };

  const handlePrevIndex = () => {
    setCurrentIndex((prev) => (prev === 0 ? 0 : prev - 1));
    setSearchParams({ index: currentIndex === 0 ? 0 : currentIndex - 1 });
  };

  const handleBookmark = async () => {
    if (!user) {
      navigate("/login", { state: { storyId: id, index: currentIndex } });
    } else {
      try {
        setLoading(true);
        const response = await ToggleBookmark(story?.slides[currentIndex]._id);
        setLoading(false);
        if (response.success) {
          setStory(response.updatedStory);
        } else throw new Error(response.message);
      } catch (err) {
        setLoading(false);
        toast.error(
          err.message || "something went wrong while toggling bookmark"
        );
      }
    }
  };

  const handleLike = async () => {
    if (!user) {
      navigate("/login", { state: { storyId: id, index: currentIndex } });
    } else {
      try {
        setLoading(true);
        const response = await ToggleLike(story?.slides[currentIndex]._id);
        setLoading(false);
        if (response.success) {
          setStory(response.updatedStory);
        } else throw new Error(response.message);
      } catch (err) {
        setLoading(false);
        toast.error(err.message || "something went wrong while toggling like");
      }
    }
  };

  const handleDownloadSlide = () => {};

  return (
    <div className={classes.main_div}>
      <div className={classes.overlay}></div>;
      {loading ? (
        <h1 className={classes.loading_text}>Loading...</h1>
      ) : (
        <div className={classes.modal_cont}>
          <img
            src={leftArrow}
            alt=""
            className={classes.arrow + " " + classes.btn}
            onClick={handlePrevIndex}
          />
          <div className={classes.storybox}>
            <img src={upgradient} alt="" className={classes.gradientimg} />
            <img
              src={story?.slides[currentIndex].url || defaultimage}
              alt=""
              className={classes.storyimage}
            />
            <img src={downgradient} alt="" className={classes.gradientimg} />
            <div className={classes.upper_cont}>
              <div className={classes.slide_array_cont}>
                {story?.slides.map((item, j) => (
                  <>
                    {" "}
                    <div
                      className={
                        classes.slide_array_box +
                        " " +
                        (j <= currentIndex ? classes.active_slide : "")
                      }
                    ></div>
                  </>
                ))}
              </div>
              <div className={classes.upper_btn_panel}>
                <img
                  src={storyclosebtn}
                  alt=""
                  onClick={() => navigate("/")}
                  className={classes.btn}
                />
                <img
                  src={sharebtn}
                  alt=""
                  className={classes.btn}
                  onClick={handleShare}
                />
              </div>
            </div>
            <div className={classes.story_text_cont}>
              {toastTimer && (
                <div className={classes.custom_toast_message}>
                  Link copied to clipboard
                </div>
              )}
              <h1 className={classes.story_heading}>
                {story?.slides[currentIndex].heading}
              </h1>
              <p className={classes.story_subtext}>
                {story?.slides[currentIndex].description}
              </p>
              <div className={classes.btn_panel}>
                <img
                  src={
                    story &&
                    story.slides[currentIndex].bookmarks.includes(user?._id)
                      ? bluebookmarkbtn
                      : bookmarkbtn
                  }
                  alt=""
                  className={classes.btn}
                  onClick={handleBookmark}
                />
                <img
                  src={downloadbtn}
                  alt=""
                  className={classes.btn}
                  onClick={handleDownloadSlide}
                />
                <div className={classes.likes_div}>
                  <img
                    src={
                      story &&
                      story.slides[currentIndex].likes.includes(user?._id)
                        ? redlikebtn
                        : likebtn
                    }
                    alt=""
                    className={classes.btn}
                    onClick={handleLike}
                  />
                  <p className={classes.likes_count}>
                    {story?.slides[currentIndex].likes.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <img
            src={rightArrow}
            alt=""
            className={classes.arrow + " " + classes.btn}
            onClick={handleNextIndex}
          />
        </div>
      )}
    </div>
  );
}
