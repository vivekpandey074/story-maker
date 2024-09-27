import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import ViewStory from "./pages/ViewStory/ViewStory";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddStory from "./pages/AddStory/AddStory";
import Login from "./pages/Login/Login";
import Bookmarks from "./pages/Bookmarks/Bookmarks";
import UpdateStory from "./pages/UpdateStory/UpdateStory";
import Sample from "./pages/sample";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="login" element={<Login headingtext={"Login"} />} />
            <Route
              path="register"
              element={<Login headingtext={"Register"} />}
            />
            <Route path="viewstories/:id" element={<ViewStory />} />

            <Route path="addstory" element={<AddStory />} />
            <Route path="updatestory" element={<UpdateStory />} />
          </Route>
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/test" element={<Sample />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
