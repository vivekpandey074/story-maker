import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import ViewStory from "./pages/ViewStory/ViewStory";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddStory from "./pages/AddStory/AddStory";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="viewstories/:id" element={<ViewStory />} />
            <Route path="addstory" element={<AddStory />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
