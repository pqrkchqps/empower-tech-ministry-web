import React from "react";
import rocket from "../images/spacex.jpg";
import laptop from "../images/coding-career-launch.jpg";
import online from "../images/online-presence.jpg";
import app from "../images/app-designing.jpg";
import CircleBorder from "./CircleBorder";
import ChangingSection from "./ChangingSection";

function Home() {
  return (
    <div className="home">
      <ChangingSection changeRate={4000}>
        <section className="hero" style={{ backgroundImage: `url(${rocket})` }}>
          <div className="hero-text">
            <h1>Empower Tech Ministry</h1>
            <div className="quote">
              <p className="indent-text">Giving you power to succeed</p>
            </div>
          </div>
        </section>
        <section
          className="hero hero-right"
          style={{ backgroundImage: `url(${laptop})` }}
        >
          <div className="hero-text hero-text-right">
            <h1>Coding Career Launch</h1>
            <div className="quote">
              <p className="indent-text">
                Your Path to Professional Coding Mastery
              </p>
            </div>
          </div>
        </section>
        <section className="hero" style={{ backgroundImage: `url(${app})` }}>
          <div className="hero-text dark">
            <h1>Web Services</h1>
            <div className="quote">
              <p className="indent-text">Crafting Your</p>
              <p>Digital Success Story</p>
            </div>
          </div>
        </section>
      </ChangingSection>

      <section className="text-section">
        <div className="inner-section">
          <h3>Our Vision:</h3>
          <p className="check">
            At Empower Tech Ministry, we believe in the potential of every small
            business. Our driving force is to witness your business take off and
            reach new heights of success. We understand the challenges you face
            in today's competitive digital landscape, and that's why we are
            committed to providing you with the tools and solutions you need to
            thrive.
          </p>
        </div>
      </section>
      <section className="step-section">
        <ul className="side-by-side progressbar">
          <li>
            <CircleBorder size="16vw" borderColor="black" borderWidth="2px">
              <i className="icon-lightbulb"></i>
              <h4 className="bold">Idea</h4>
              <p>
                Sed bibendum quam sem, sit amet interdum justo fringilla id.
                Praesent adipiscing ac tortor.
              </p>
            </CircleBorder>
          </li>

          <li>
            <CircleBorder size="16vw" borderColor="black" borderWidth="2px">
              <i className="icon-star-half-full"></i>
              <h4 className="bold">Design</h4>
              <p>
                Sed bibendum quam sem, sit amet interdum justo fringilla id.
                Praesent adipiscing ac tortor.
              </p>
            </CircleBorder>
          </li>

          <li>
            <CircleBorder size="16vw" borderColor="black" borderWidth="2px">
              <i className="icon-wrench"></i>
              <h4 className="bold">Development</h4>
              <p>
                Sed bibendum quam sem, sit amet interdum justo fringilla id.
                Praesent adipiscing ac tortor.
              </p>
            </CircleBorder>
          </li>

          <li>
            <CircleBorder size="16vw" borderColor="black" borderWidth="2px">
              <i className="icon-rocket"></i>
              <h4 className="bold">Deployment</h4>
              <p>
                Sed bibendum quam sem, sit amet interdum justo fringilla id.
                Praesent adipiscing ac tortor.
              </p>
            </CircleBorder>
          </li>
        </ul>
      </section>
      <section
        className="hero"
        style={{ backgroundImage: `url(${online})` }}
      ></section>
      <section className="text-section">
        <div className="inner-section">
          <h3>Our Mission:</h3>
          <p className="check">
            In this digital era, having a strong online presence is essential
            for business growth. Our primary mission is to give your business a
            robust online identity. Our expert team will work tirelessly to
            design a website that truly reflects your vision and values, leaving
            a lasting impression on your customers.
          </p>
        </div>
      </section>
      <section>
        <h1 className="section-title">How We Help You Succeed</h1>
        <div className="side-by-side">
          <div className="card">
            <h3>Strategic Design</h3>
            <p>
              We don't just create websites; we craft digital experiences. Our
              websites are not only visually appealing but also strategically
              optimized to drive traffic and convert visitors into loyal
              customers. With our innovative solutions, you'll experience an
              upsurge in leads and revenue, propelling your business towards
              unparalleled success.
            </p>
          </div>
          <div className="card">
            <h3>Collaborative Approach</h3>
            <p>
              At Legendary Software, we believe in collaboration and
              transparency. We work closely with you, understanding your unique
              needs and goals, to deliver tailor-made solutions that suit your
              business like a glove. Your success is our success, and together,
              we'll build a long-lasting partnership to help your business
              flourish.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
