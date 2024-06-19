import React from "react";
import Hero from "./Hero";
import InformationSection from "./InformationSection";
import TopExams from "./TopExams";
import TredingCourse from "./TredingCourse";
import TopBoards from "./TopBoards";
import Trending from "./Trending";
import AppPoster from "./AppPoster";
import QueryBox from "./QueryBox";
import UpperFooter from "./UpperFooter";


function LandingPage() {
 
  return (
    <>
      <Hero></Hero>
      <InformationSection></InformationSection>
      <TopExams></TopExams>
      <TredingCourse></TredingCourse>
      <TopBoards></TopBoards>
      <Trending></Trending>
      <AppPoster></AppPoster>
      <QueryBox></QueryBox>
      <UpperFooter></UpperFooter>
    </>
  );
}

export default LandingPage;
