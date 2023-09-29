import React from "react";
import styled from "styled-components";

import rocket from "../images/spacex.jpg";
import laptop from "../images/coding-career-launch.jpg";

import react from "../images/reactjs.svg";
import nodejs from "../images/nodejs.svg";
import expressjs from "../images/expressjs.svg";
import mongodb from "../images/mongodb.svg";

const Container = styled.div`
  color: #fff;
`;

const Section = styled.section`
  padding: 40px;
  background: rgba(0, 0, 0, 0.8);
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 20px;
`;

const Subtitle = styled.h2`
  font-size: 24px;
  margin-bottom: 15px;
`;

const Image = styled.img`
  width: 100%;
  max-width: 200px;
  margin: 0 auto;
  display: block;
`;

const ProgramDetails = () => {
  return (
    <Container>
      <section className="hero" style={{ backgroundImage: `url(${rocket})` }}>
        <div className="hero-text">
          <h1>Empower Tech Ministry</h1>
          <div className="quote">
            <p className="indent-text">Giving you power to succeed</p>
          </div>
        </div>
      </section>

      <Section>
        <Subtitle>Tech Stack: MERN Stack or PERN Stack</Subtitle>
        <div className="row">
          <Image src={react} />
          <Image src={nodejs} />
          <Image src={expressjs} />
          <Image src={mongodb} />
        </div>
        <p>
          Are you ready to kickstart your journey in web development? Our
          comprehensive coding program offers you the opportunity to master the
          art of full-stack development using the latest technologies.
        </p>
      </Section>

      <section className="hero" style={{ backgroundImage: `url(${laptop})` }}>
        <div className="hero-text">
          <h2>Exciting Projects,</h2>
          <h2>Endless Possibilities</h2>
          <p>
            Throughout this program, you'll be working on exciting projects
            similar to Reddit and Facebook. Build user-generated content
            platforms, implement authentication systems, and create interactive
            user interfaces.
          </p>
        </div>
      </section>

      <Section>
        <Subtitle>Guaranteed Career Path</Subtitle>
        <p>
          Your dream job in web development is just around the corner! Our
          personalized one-on-one mentoring ensures you're equipped with the
          skills needed to create outstanding full-stack applications that stand
          out in the industry.
        </p>
        <p>
          We're so confident in our program that we guarantee a job offer if you
          stick with the program and diligently pursue your job search. We're
          with you every step of the way.
        </p>
      </Section>

      <Section>
        <Subtitle>Sponsorship Opportunity</Subtitle>
        <p>
          We're excited to offer a unique sponsorship opportunity for select
          students. No upfront tuition is required until you secure a job
          earning $45,000 or more annually. After that, a nominal fee of $500
          per month for 18 months will be deducted as you continue to benefit
          from our guidance and support.
        </p>
      </Section>

      <Section>
        <Subtitle>Choose Your Plan</Subtitle>
        <p>
          Our regular pricing plans are just as attractive. Choose between $750
          per month for 12 months with three weekly sessions, or $500 per month
          for 12 months with two weekly sessions. Whichever plan you choose,
          you'll receive top-notch training and mentorship to become a skilled
          and sought-after full-stack developer.
        </p>
        <p>
          Embark on this exciting journey with us and transform your coding
          passion into a lucrative and fulfilling career. Join the ranks of
          successful developers who are shaping the digital landscape today!
        </p>
      </Section>
    </Container>
  );
};

export default ProgramDetails;
