import React, { useEffect, useState } from "react";
import "./Header.scss";
// importing icons from react icons
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import logo from "../../assets/movix-logo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); //location of our current webpage
  useEffect(() => {
    // we scroll back to the top whenever we change the webpage
    window.scrollTo(0, 0);
  }, [location]);
  const openSearch = () => {
    setShowSearch(true);
    setMobileMenu(false);
  };
  const openMenu = () => {
    setShowSearch(false);
    setMobileMenu(true);
  };
  const handleSearch = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };
  const navigationHandler = (type) => {
    navigate(`/explore/${type}`);
    setMobileMenu(false);
  };
  // very imp function clear the concept behind this
  const controlHeader = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        // so that it remains hidden when we scroll down
        setShow("hide");
      } else {
        // it appears when we scoll up
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", controlHeader);
    return () => {
      window.removeEventListener("scroll", controlHeader);
    };
  }, [lastScrollY]);
  return (
    <header className={`header ${mobileMenu ? "mobileView" : null} ${show}`}>
      <ContentWrapper>
        <div
          className="logo"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={logo} alt="" />
        </div>
        <ul className="menuItems">
          <li
            className="menuItem"
            onClick={() => {
              navigationHandler("movie");
            }}
          >
            Movies
          </li>
          <li
            className="menuItem"
            onClick={() => {
              navigationHandler("tv");
            }}
          >
            Tv Shows
          </li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch}></HiOutlineSearch>
          </li>
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch}></HiOutlineSearch>
          {mobileMenu ? (
            <VscChromeClose
              onClick={() => {
                setMobileMenu(false);
              }}
            ></VscChromeClose>
          ) : (
            <SlMenu onClick={openMenu}></SlMenu>
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or tv show..."
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              onKeyDown={handleSearch}
            />
            <VscChromeClose
              onClick={() => {
                setShowSearch(false);
              }}
            ></VscChromeClose>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
