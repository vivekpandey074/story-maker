import Header from "../../components/Header/Header";
import classes from "./index.module.css";
import sports from "../../assets/sports.jpg";
import defaultimage from "../../assets/defaultimage2.jpg";

const categories = [
  "All",
  "Food",
  "Travel",
  "Technology",
  "Fruits",
  "Medical",
  "World",
  "",
  "",
  "",
  "",
  "",
  "",
];

export default function Home() {
  return (
    <div className={classes.wrappercont}>
      <div className={classes.maincont}>
        <Header />
        <div className={classes.categories + " " + classes.no_scrollbar}>
          {categories.map((item) => {
            return (
              <>
                <div className={classes.cat_box + " " + classes.cat_active}>
                  <img src={sports} alt="" className={classes.cat_cover_img} />
                  <div className={classes.cat_text}>
                    <p>{item}</p>
                  </div>
                </div>
              </>
            );
          })}
        </div>

        <div className={classes.cat_stories}>
          <p className={classes.cat_heading_text}>Top Stories About food</p>
          <div className={classes.storycont}>
            <div className={classes.storybox}>
              <img src={defaultimage} alt="" className={classes.storyimage} />
              <div className={classes.story_text_cont}>
                <h1 className={classes.story_heading}>
                  Lorem ipsum dolor sit amet
                </h1>
                <p className={classes.story_subtext}>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
          </div>
          <button className={classes.btn}>See more</button>
        </div>
      </div>
    </div>
  );
}
