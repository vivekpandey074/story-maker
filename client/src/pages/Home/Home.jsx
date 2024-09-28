import Header from "../../components/Header/Header";
import classes from "./index.module.css";

import defaultimage from "../../assets/defaultimage2.jpg";
import downgradient from "../../assets/down-gradient.png";
import upgradient from "../../assets/upgradient.png";
import { toast } from "react-toastify";
import { GetCurrentUser } from "../../api/users.js";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SetUser } from "../../redux/userSlice.js";
import { GetHomeFeed, GetMyStories } from "../../api/story.js";
import all from "../../assets/allnews.jpg";
import food from "../../assets/food.jpg";
import travel from "../../assets/travel.jpg";
import technology from "../../assets/technology.jpg";
import fruits from "../../assets/fruits.jpg";
import medical from "../../assets/medical.jpg";
import world from "../../assets/world.jpeg";
import others from "../../assets/others.jpg";
import edit from "../../assets/edit.svg";
import { isImageUrl } from "../../utils/checkUrl.js";

const categories = [
  { type: "ALL", path: all },
  { type: "Food", path: food },
  { type: "Travel", path: travel },
  { type: "Technology", path: technology },
  { type: "Fruits", path: fruits },
  { type: "Medical", path: medical },
  { type: "World", path: world },
  { type: "Others", path: others },
];

const expandedstate = {
  Food: false,
  Travel: false,
  Fruits: false,
  Technology: false,
  Medical: false,
  World: false,
  Others: false,
  MyStories: false,
};
export default function Home() {
  const dispatch = useDispatch();
  const [filterArray, setFilterArray] = useState(["ALL"]);
  const [mystories, setMyStories] = useState([]);
  const [expanded, setExpanded] = useState(expandedstate);
  const [feedArray, setFeedArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);

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
    try {
      setLoading(true);
      const response = await GetHomeFeed(filterArray);
      setLoading(false);
      if (response.success) {
        setFeedArray(response.feedarray);
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
  const FetchMyStories = async () => {
    try {
      setLoading(true);
      const response = await GetMyStories();
      setLoading(false);
      if (response.success) {
        setMyStories(response.mystories);
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

  const filterArrayIncludes = (filterArray, category) => {
    for (let i = 0; i < filterArray.length; i++) {
      if (filterArray[i] === category) return true;
    }

    return false;
  };

  const visibleLength = (arr, category) => {
    if (expanded[category] || arr.length <= 4) {
      return arr;
    } else {
      return arr.slice(0, 4);
    }
  };

  const handleSeeMore = (category) => {
    setExpanded((prev) => ({ ...prev, [category]: true }));
  };

  const handleEdit = (e, story) => {
    e.stopPropagation();
    navigate("/updatestory", { state: { story } });
    window.scrollTo({
      top: 0,
    });
  };
  useEffect(() => {
    FetchHomeFeed(filterArray);
  }, [filterArray]);

  useEffect(() => {
    FetchMyStories();
  }, []);

  return (
    <div className={classes.wrappercont}>
      {loading ? (
        <h1 className={classes.no_stories_text}>Loading...</h1>
      ) : (
        <>
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
                        (filterArrayIncludes(filterArray, item.type)
                          ? classes.cat_active
                          : "")
                      }
                    >
                      <img
                        src={item.path}
                        alt=""
                        className={classes.cat_cover_img}
                      />
                      <div
                        className={classes.cat_text}
                        onClick={() => toggleCategory(item.type)}
                      >
                        <p>{item.type}</p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>

            {/* YOUR STORIES */}
            {user && (
              <>
                <div className={classes.cat_stories}>
                  <p className={classes.cat_heading_text}>Your Stories</p>
                  <div className={classes.storycont}>
                    {!mystories.length && (
                      <p className={classes.no_stories_text}>
                        No stories Available
                      </p>
                    )}

                    {visibleLength(mystories, "MyStories").map((story) => (
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
                          {/* <img
                            src={story.slides[0].url || defaultimage}
                            alt=""
                            className={classes.storyimage}
                          /> */}
                          {!isImageUrl(story?.slides[0].url) ? (
                            <video
                              className={classes.storyimage}
                              src={story?.slides[0].url || defaultimage}
                              autoPlay
                              loop
                            ></video>
                          ) : (
                            <img
                              src={story?.slides[0].url || defaultimage}
                              alt=""
                              className={classes.storyimage}
                            />
                          )}

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
                          <div
                            className={classes.edit_div}
                            onClick={(e) => handleEdit(e, story)}
                          >
                            <img
                              src={edit}
                              alt=""
                              className={classes.edit_logo}
                            />
                            <p className={classes.edit_text}>Edit</p>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                  {mystories.length >= 5 && !expanded["MyStories"] && (
                    <button
                      className={classes.btn}
                      onClick={() => handleSeeMore("MyStories")}
                    >
                      See more
                    </button>
                  )}
                </div>
              </>
            )}

            {/* HOME FEED */}

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

                    {visibleLength(item.feed, item.category).map((story) => (
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
                          {!isImageUrl(story?.slides[0].url) ? (
                            <video
                              className={classes.storyimage}
                              src={story?.slides[0].url || defaultimage}
                              autoPlay
                              loop
                            ></video>
                          ) : (
                            <img
                              src={story?.slides[0].url || defaultimage}
                              alt=""
                              className={classes.storyimage}
                            />
                          )}
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
                          {story?.creator === user?._id ? (
                            <>
                              <div
                                className={classes.edit_div}
                                onClick={(e) => handleEdit(e, story)}
                              >
                                <img
                                  src={edit}
                                  alt=""
                                  className={classes.edit_logo}
                                />
                                <p className={classes.edit_text}>Edit</p>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </>
                    ))}
                  </div>
                  {item.feed.length >= 5 && !expanded[item.category] && (
                    <button
                      className={classes.btn}
                      onClick={() => handleSeeMore(item.category)}
                    >
                      See more
                    </button>
                  )}
                </div>
              </>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
