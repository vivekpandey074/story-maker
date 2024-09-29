import React, { useState, useEffect } from "react";
import classes from "./index.module.css";
import Header from "../../components/Header/Header";
import { useSelector } from "react-redux";
import defaultimage from "../../assets/defaultimage2.jpg";
import downgradient from "../../assets/down-gradient.png";
import upgradient from "../../assets/upgradient.png";
import { toast } from "react-toastify";
import { GetBookmarks } from "../../api/story";
import { isImageUrl } from "../../utils/checkUrl";

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.users);

  const FetchBookmarks = async () => {
    try {
      setLoading(true);
      const response = await GetBookmarks();
      setLoading(false);
      if (response.success) {
        setBookmarks(response.bookmarks);
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
    FetchBookmarks();
  }, []);

  return (
    <div className={classes.main_div}>
      {loading ? (
        <h1 className={classes.no_stories_text}>Loading...</h1>
      ) : (
        <>
          <Header bookmarkactive={true} />
          {user && (
            <>
              <div className={classes.cat_stories}>
                <p className={classes.cat_heading_text}>Your Bookmarks</p>
                <div className={classes.storycont}>
                  {!bookmarks.length && (
                    <p className={classes.no_stories_text}>
                      No bookmarks Available
                    </p>
                  )}

                  {bookmarks.map((slide) => (
                    <>
                      <div className={classes.storybox}>
                        <img
                          src={upgradient}
                          alt=""
                          className={classes.gradientimg}
                        />
                        {/* <img
                          src={slide?.url || defaultimage}
                          alt=""
                          className={classes.storyimage}
                        /> */}
                        {!isImageUrl(slide?.url) ? (
                          <video
                            className={classes.storyimage}
                            src={slide?.url || defaultimage}
                            autoPlay
                            loop
                          ></video>
                        ) : (
                          <img
                            src={slide?.url || defaultimage}
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
                            {slide?.heading}
                          </h1>
                          <p className={classes.story_subtext}>
                            {slide?.description}
                          </p>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
