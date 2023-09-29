import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import CodingCareer from "./components/CodingCareer";
import About from "./components/About";
import Contact from "./components/Contact";
import Services from "./components/Services";
import Threads from "./components/Threads";
import { useContext, useEffect } from "react";
import { AuthContext } from "./components/AuthContext";
import LoginOrRegister from "./components/LoginOrRegister";
import ThreadDetails from "./components/ThreadDetails";
import CreateArticle from "./components/CreateArticle";
import userEvent from "@testing-library/user-event";
import Articles from "./components/Articles";
import ArticleDetails from "./components/ArticleDetails";

function App() {
  const { isLoggedIn, loadFromCookie, user } = useContext(AuthContext);
  useEffect(() => {
    loadFromCookie();
  }, []);
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<CodingCareer />} />
          <Route
            path="/login"
            element={isLoggedIn ? <CodingCareer /> : <LoginOrRegister />}
          />
          <Route
            path="/talk"
            element={isLoggedIn ? <Threads /> : <LoginOrRegister />}
          />
          <Route
            path="/talk/details"
            element={isLoggedIn ? <ThreadDetails /> : <LoginOrRegister />}
          />
          <Route
            path="/articles/new"
            element={
              isLoggedIn && user.type === "admin" ? (
                <CreateArticle />
              ) : (
                <LoginOrRegister />
              )
            }
          />
          <Route
            path="/articles/details"
            element={isLoggedIn ? <ArticleDetails /> : <LoginOrRegister />}
          />
          <Route path="/articles" element={<Articles />} />
          {/* <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/talk" element={<Threads />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
