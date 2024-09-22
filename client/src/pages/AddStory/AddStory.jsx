import classes from "./index.module.css";
import crossbtn from "../../assets/crossbtn2.svg";
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
        <p className={classes.add_slide_text}>Add upto 6 slides</p>
        <div className={classes.slideboxcont}>
          <div className={classes.slidebox + " " + classes.active}>Slide 1</div>
          <div className={classes.slidebox}>Slide 2</div>
          <div className={classes.slidebox}>Slide 3</div>
          <div className={classes.slidebox}>
            Slide 4
            <img src={crossbtn} alt="" className={classes.slide_cut_btn} />
          </div>

          <div className={classes.slidebox}>Add +</div>
        </div>

        <form action="" className={classes.form}>
          <div className={classes.inputcont}>
            <label htmlFor="heading">Heading :</label>
            <input
              name="heading"
              type="text"
              className={classes.input}
              placeholder="Your heading"
            />
          </div>
          <div className={classes.inputcont}>
            <label htmlFor="description">Description :</label>
            <textarea
              name="description"
              className={classes.description_text}
              placeholder="Story Description"
            />
          </div>
          <div className={classes.inputcont}>
            <label htmlFor="media">Image / Video : </label>
            <input
              name="media"
              type="text"
              className={classes.input}
              placeholder="Add Image/Video URL"
            />
          </div>
          <div className={classes.inputcont}>
            <label htmlFor="">Category :</label>
            <select
              name=""
              id=""
              className={classes.input + " " + classes.category_selection}
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
              <button className={classes.btn + " " + classes.greenbtn}>
                Previous
              </button>
              <button className={classes.btn + " " + classes.bluebtn}>
                Next
              </button>
            </div>
            <button className={classes.btn + " " + classes.redbtn}>Post</button>
          </div>
        </form>
      </div>
    </div>
  );
}
