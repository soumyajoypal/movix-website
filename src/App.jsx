import React, { useEffect } from "react";
import "./App.css";
import { fetchData } from "./utils/api";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/Home/Home";
import Error from "./pages/404/Error";
import SearchResult from "./pages/SearchResult/SearchResult";
import Details from "./pages/Details/Details";
import Explore from "./pages/Explore/Explore";
import Footer from "./components/footer/Footer";
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import { useDispatch, useSelector } from "react-redux";
function App() {
  const { url } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchApiConfig();
    fetchGenres();
  }, []);

  const fetchApiConfig = async () => {
    try {
      // this endpoint is imp for generating images and many thinks(read the documentation of the api if possible)
      const res = await fetchData("/configuration");
      console.log(res);
      // configuring the images to be displayed(Very imp since this api works a bit differently)
      // object of urls for different types(image generation)
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // imp piece of code
  const fetchGenres = async () => {
    const promises = [];
    const endPoints = ["tv", "movie"];
    const allGenres = {};
    endPoints.forEach((url) => {
      promises.push(fetchData(`/genre/${url}/list`));
    });
    const data = await Promise.all(promises);
    // console.log(data);
    // generating an all genres object for the each id
    data.map(({ genres }) => {
      // we are using bracket for the objects since dynamic properties
      return genres.map((item) => (allGenres[item.id] = item));
    });
    dispatch(getGenres(allGenres));
  };
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/:mediaType/:id" element={<Details></Details>}></Route>
        {/* dynamic routes using params */}
        <Route
          path="/search/:query"
          element={<SearchResult></SearchResult>}
        ></Route>
        <Route path="/explore/:mediaType" element={<Explore></Explore>}></Route>
        <Route path="*" element={<Error></Error>}></Route>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
