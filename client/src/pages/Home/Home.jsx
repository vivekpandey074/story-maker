import Categories from "../../components/Categories/Categories";
import Header from "../../components/Header/Header";
import TopStories from "../../components/TopStories/TopStories";
import classes from "./index.module.css";

export default function Home() {
  return (
    <div className={classes.wrappercont}>
      <div className={classes.maincont}>
        <Header />
        <Categories />
        <TopStories />
      </div>
    </div>
  );
}
