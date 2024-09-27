import Header from "../../components/Header/Header";
import classes from "./index.module.css";
import sports from "../../assets/sports.jpg";
import defaultimage from "../../assets/defaultimage2.jpg";
import downgradient from "../../assets/down-gradient.png";
import upgradient from "../../assets/upgradient.png";
import { toast } from "react-toastify";
import { GetCurrentUser } from "../../api/users.js";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SetUser } from "../../redux/userSlice.js";
import { GetHomeFeed } from "../../api/story.js";

const categories = [
  "ALL",
  "Food",
  "Travel",
  "Technology",
  "Fruits",
  "Medical",
  "World",
  "Others",
];

export default function Home() {
  const dispatch = useDispatch();
  const [filterArray, setFilterArray] = useState(["ALL"]);
  const [feedArray, setFeedArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toggleCategory = (category) => {
    if (filterArray.includes(category)) {
      setFilterArray((prev) => prev.filter((item) => item !== category));
      return;
    } else setFilterArray((prev) => [...prev, category]);
  };

  const validateToken = async () => {
    try {
      const response = await GetCurrentUser();
      if (response.success) {
        dispatch(SetUser(response.currentuser));
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      toast.error(err.message || "Error occured while validating user");
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    }
  }, []);

  const FetchHomeFeed = async (filterArray) => {
    console.log(filterArray);
    try {
      setLoading(true);
      const response = await GetHomeFeed(filterArray);
      setLoading(false);
      if (response.success) {
        setFeedArray(response.feedarray);
        console.log(response.feedarray);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      setLoading(false);
      toast.error(
        err.message || "Something went wrong while fetching home feed"
      );
    }
  };

  useEffect(() => {
    FetchHomeFeed(filterArray);
  }, [filterArray]);

  return (
    <div className={classes.wrappercont}>
      <div className={classes.maincont}>
        <Outlet />
        <Header />
        <div className={classes.categories + " " + classes.no_scrollbar}>
          {categories.map((item) => {
            return (
              <>
                <div
                  className={
                    classes.cat_box +
                    " " +
                    (filterArray.includes(item) ? classes.cat_active : "")
                  }
                >
                  <img src={sports} alt="" className={classes.cat_cover_img} />
                  <div
                    className={classes.cat_text}
                    onClick={() => toggleCategory(item)}
                  >
                    <p>{item}</p>
                  </div>
                </div>
              </>
            );
          })}
        </div>

        {feedArray.map((item) => (
          <>
            <div className={classes.cat_stories}>
              <p className={classes.cat_heading_text}>
                Top Stories About {item.category}
              </p>
              <div className={classes.storycont}>
                {!item.feed.length && (
                  <p className={classes.no_stories_text}>
                    No stories Available
                  </p>
                )}

                {item.feed.map((story) => (
                  <>
                    <div
                      className={classes.storybox}
                      onClick={() => {
                        navigate(`/viewstories/${story._id}?index`);
                        window.scrollTo({
                          top: 0,
                        });
                      }}
                    >
                      <img
                        src={upgradient}
                        alt=""
                        className={classes.gradientimg}
                      />
                      <img
                        src={story.slides[0].url || defaultimage}
                        alt=""
                        className={classes.storyimage}
                      />
                      <img
                        src={downgradient}
                        alt=""
                        className={classes.gradientimg}
                      />
                      <div className={classes.story_text_cont}>
                        <h1 className={classes.story_heading}>
                          {story.slides[0].heading}
                        </h1>
                        <p className={classes.story_subtext}>
                          {story.slides[0].description}
                        </p>
                      </div>
                    </div>
                  </>
                ))}
              </div>
              {item.feed.length >= 5 && (
                <button className={classes.btn}>See more</button>
              )}
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
