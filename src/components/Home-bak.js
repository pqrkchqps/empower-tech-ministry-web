import React from "react";
import styled from "styled-components";

// Styled components
const Container = styled.div`
  flex: 1;
  background-color: #ffffff;
  padding: 20px;
`;

const Brand = styled.div`
  align-items: center;
  margin-top: 20px;
`;

const Logo = styled.img`
  width: 150px;
  height: 150px;
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-top: 10px;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #666;
  margin-top: 5px;
`;

const Section = styled.div`
  margin-top: 30px;
`;

const SectionTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

const SectionDescription = styled.p`
  font-size: 16px;
  color: #555;
  margin-top: 10px;
`;

// Homepage Component
const Home = () => {
  return (
    <Container>
      <Brand>
        <Title>Empower Tech Ministry</Title>
        <Subtitle>Igniting Your Digital Potential</Subtitle>
      </Brand>

      <Section>
        <SectionTitle>Why Choose Empower Tech Ministry?</SectionTitle>
        <SectionDescription>
          We believe that technology has the power to revolutionize businesses
          and drive exponential growth. Our team of visionary experts is
          dedicated to crafting tech solutions that are not only cutting-edge
          but also tailored to your unique needs and goals.
        </SectionDescription>
      </Section>

      <Section>
        <SectionTitle>Experience the Power of Empowerment</SectionTitle>
        <SectionDescription>
          At Empower Tech Ministry, we don't just create software; we create
          opportunities. We understand the challenges businesses face in the
          digital landscape, and that's why we are committed to providing you
          with the tools and knowledge you need to thrive.
        </SectionDescription>
      </Section>

      <Section>
        <SectionTitle>Our Services</SectionTitle>
        <SectionDescription>
          - Innovative Web Apps: Experience the future of web applications with
          our innovative and dynamic solutions, designed to engage users and
          deliver seamless experiences.
          {"\n"}- Mobile Apps that Wow: Stand out in the app market with our
          striking and feature-rich mobile applications, built for various
          platforms to reach a broader audience.
          {"\n"}- Web Development with Purpose: Our websites are not just
          visually appealing; they are strategically optimized to drive traffic,
          generate leads, and convert visitors into loyal customers.
          {"\n"}- Data-driven Solutions: Harness the power of data with our
          analytics and business intelligence solutions, enabling you to make
          informed decisions and stay ahead of the competition.
          {"\n"}- Digital Marketing Mastery: Elevate your online presence with
          our expert digital marketing strategies, including targeted ads on
          platforms like Google and Facebook.
        </SectionDescription>
      </Section>
    </Container>
  );
};

export default Home;
