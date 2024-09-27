import classes from "./index.module.css";
import crossbtn from "../../assets/crossbtn2.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { UpdateStoryApi } from "../../api/story";

const initialSlide = {
  heading: "",
  description: "",
  url: "",
  likes: [],
  bookmarks: [],
};

export default function UpdateStory() {
  const location = useLocation();
  const navigate = useNavigate();
  const [slidesArray, setSlidesArray] = useState(location.state.story.slides);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [category, setCategory] = useState(location.state.story.category);
  const [loading, setLoading] = useState(false);

  const handleRemoveSlide = () => {
    toast.info("Cannot remove slide in edit mode");
  };

  const handleAddSlide = () => {
    toast.info("Cannot add new slide in edit mode");
  };

  const handleChange = (e) => {
    setSlidesArray((prev) => {
      return prev.map((item, index) => {
        if (index === currentSlideIndex) {
          return { ...item, [e.target.name]: e.target.value };
        } else {
          return item;
        }
      });
    });
  };
  const handleSelectChange = (e) => {
    setCategory(e.target.value);
  };
  const checkAllfieldRequired = (slidesArray, category) => {
    if (!category) return false;

    for (let i = 0; i < slidesArray.length; i++) {
      const { heading, description, url } = slidesArray[i];

      if (!heading || !description || !url) {
        return false;
      }
    }

    return true;
  };
  const handlePostStory = async (e) => {
    e.preventDefault();

    if (!checkAllfieldRequired(slidesArray, category)) {
      toast.error("All field of slides are required");
      return;
    }

    try {
      setLoading(true);
      const response = await UpdateStoryApi({
        id: location.state.story._id,
        slides: slidesArray,
        category: category,
      });
      setLoading(false);
      if (response.success) {
        toast.success(response.message);
        navigate("/");
        window.location.reload();
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.message || "something went wrong while posting story");
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
        <p className={classes.add_slide_text}>Add upto 6 slides</p>
        <div className={classes.slideboxcont}>
          {slidesArray.map((item, index) => (
            <div
              key={index}
              className={
                classes.slidebox +
                " " +
                (currentSlideIndex === index ? classes.active : "")
              }
            >
              Slide {index + 1}
              {index >= 3 && (
                <img
                  src={crossbtn}
                  alt=""
                  className={classes.slide_cut_btn}
                  onClick={handleRemoveSlide}
                />
              )}
            </div>
          ))}
          {slidesArray.length <= 5 && (
            <div
              className={classes.slidebox + " " + classes.add_btn}
              onClick={handleAddSlide}
            >
              Add +
            </div>
          )}
        </div>

        <form className={classes.form} onSubmit={handlePostStory}>
          <div className={classes.inputcont}>
            <label htmlFor="heading">Heading :</label>
            <input
              name="heading"
              type="text"
              value={slidesArray[currentSlideIndex].heading}
              onChange={handleChange}
              className={classes.input}
              placeholder="Your heading"
              required
            />
          </div>
          <div className={classes.inputcont}>
            <label htmlFor="description">Description :</label>
            <textarea
              name="description"
              value={slidesArray[currentSlideIndex].description}
              onChange={handleChange}
              className={classes.description_text}
              placeholder="Story Description"
              required
            />
          </div>
          <div className={classes.inputcont}>
            <label htmlFor="media">Image / Video : </label>
            <input
              name="url"
              type="text"
              value={slidesArray[currentSlideIndex].url}
              onChange={handleChange}
              className={classes.input}
              placeholder="Add Image/Video URL"
              required
            />
          </div>
          <div className={classes.inputcont}>
            <label htmlFor="">Category :</label>
            <select
              name="category"
              id=""
              onChange={handleSelectChange}
              value={category}
              className={classes.input + " " + classes.category_selection}
              required
            >
              <option value="">Select Category</option>
              <option value="Medical" className={classes.option_text}>
                Medical
              </option>
              <option value="Fruits" className={classes.option_text}>
                Fruits
              </option>
              <option value="Food" className={classes.option_text}>
                Food
              </option>
              <option value="Travel" className={classes.option_text}>
                Travel
              </option>
              <option value="Technology" className={classes.option_text}>
                Technology
              </option>
              <option value="World" className={classes.option_text}>
                World
              </option>
              <option value="Sports" className={classes.option_text}>
                Sports
              </option>
              <option value="Others" className={classes.option_text}>
                Others
              </option>
            </select>
            <p className={classes.common_category_text}>
              This field will be common for all slides
            </p>
          </div>
          <div className={classes.btn_panel}>
            <div className={classes.nav_btns}>
              <button
                className={classes.btn + " " + classes.greenbtn}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentSlideIndex((prev) => (prev === 0 ? 0 : prev - 1));
                }}
              >
                Previous
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentSlideIndex((prev) =>
                    prev === slidesArray.length - 1
                      ? slidesArray.length - 1
                      : prev + 1
                  );
                }}
                className={classes.btn + " " + classes.bluebtn}
              >
                Next
              </button>
            </div>
            <button
              type="submit"
              className={classes.btn + " " + classes.redbtn}
            >
              {loading ? "Editing..." : "Edit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
