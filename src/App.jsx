import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import "./output.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./FrontEnd/UserUI/Landing Pages/LandingPage";
import LandingPageAdmin from "./FrontEnd/AdminUI/LandingPageAdmin";
import GrandCategory from "./FrontEnd/AdminUI/Category add panel/GrandCategory";
import CreateArticle from "./FrontEnd/AdminUI/Article Panel/CreateArticle";
import axios from "axios";
import AllBlogs from "./FrontEnd/UserUI/Blogs/AllBlogs";
import SingleBlogTemplate from "./FrontEnd/UserUI/Blogs/SingleBlogTemplate";
import AuthPage from "./FrontEnd/UserUI/AuthPages/AuthPage";
import SearchResult from "./FrontEnd/UserUI/SearchPage/SearchResult";
import CollegeInfo from "./FrontEnd/AdminUI/Article Panel/CollegeInfo";
import AddCourse from "./FrontEnd/AdminUI/Category add panel/AddCourse";
import AddSubCourse from "./FrontEnd/AdminUI/Category add panel/AddSubCourse";
// import SingleCollegeInfo from './FrontEnd/UserUI/Blogs/SingleCollegeInfo';
import InformativaNavAdmin from "./FrontEnd/AdminUI/Category add panel/InformativaNavAdmin";
import CategoryLandingPage from "./FrontEnd/AdminUI/Category add panel/CategoryLandingPage";
import BandEArticle from "./FrontEnd/AdminUI/Article Panel/BandEArticle";
import TrendingCollegeList from "./FrontEnd/AdminUI/Category add panel/TrendingCollegeList";
import ScrollToTop from "./ScrollToTop";
import VerificationToken from "./VerificationToken";
import UserDashboard from "./FrontEnd/UserDashboard/UserDashboard";
import Header from "./FrontEnd/UserUI/Landing Pages/Header";
import LowerFooter from "./FrontEnd/UserUI/Landing Pages/LowerFooter";
import PrivateRoute from "./PrivateRoute";
import PrivateAdminRoute from "./PrivateAdminRoute";
import Aboutus from "./FrontEnd/UserUI/ExtraPages/Aboutus";
import PagesAndImages from "./FrontEnd/AdminUI/PagesAndImages/PagesAndImages";
import CreateAboutUs from "./FrontEnd/AdminUI/PagesAndImages/CreateAboutUs";
import CreatePolicy from "./FrontEnd/AdminUI/PagesAndImages/CreatePolicy";
import Policy from "./FrontEnd/UserUI/ExtraPages/Policy";
import NotFound from "./FrontEnd/UserUI/ExtraPages/NotFound";
import AllPages from "./FrontEnd/AdminUI/EditAllPages/AllPages";



export const ContextData = createContext();

function App() {
  // State variables
  const [datas, setDatas] = useState([]);
  const [parentdatas, setParentdatas] = useState([]);
  const [SingleBlog, setSingleBlog] = useState([]);
  const [allBlogs, setAllBlogs] = useState([]);
  const [subCatData, setSubCatData] = useState([]);
  const [searchSub, setSearchSub] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subParentTemp, setSubParentTemp] = useState("");
  const [SearchQuery, setSearchQuery] = useState("");
  const [tempSubHeading, setTempSubHeading] = useState([]);
  const [SearchResultdata, setSearchResultdata] = useState([]);
  const [showbar, setShowbar] = useState(false);
  const [courseList, setCourseList] = useState([]);
  const [allcollegeinfo, setAllcollegeinfo] = useState([]);
  const [cousenameforblog, setCousenameforblog] = useState([]);
  const [refreshPage, setRefreshPage] = useState("");
  const [examitems, setexamitems] = useState([]);
  const [boarditems, setboarditems] = useState([]);
  const [warning, setWarning] = useState("");
  const [trutoken, setTrutoken] = useState(null);
  const [loginemail, setLoginemail] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showArrow, setShowArrow] = useState({});

  const examcallingNav = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:3000/boardexam/examnames");
      setexamitems(res.data.data);
    } catch (error) {
      console.log("error in getting exam names", error);
    }
  };

  // useEffect(() => {
  //   examcallingNav();
  // }, []);

  const boardcallingNav = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:3000/boardexam/boardnames");
      setboarditems(res.data.data);
      // setNamewithoutdata(res.data.Navdata[0].name);
    } catch (error) {
      console.log("error in getting Board Names", error);
    }
  };

  // useEffect(() => {
  //   boardcallingNav();
  //   examcallingNav();
  // }, []);

  const gettallcollegefunc = async () => {
    try {
      axios
        .get("http://127.0.0.1:3000/createArticle")
        .then((res) => setAllcollegeinfo(res.data));
    } catch (error) {
      console.log("found error to getting all college data", error);
    }
  };

  useEffect(() => {
    gettallcollegefunc();
  }, []);

  const listcourseName = async () => {
    try {
      await axios
        .get("http://127.0.0.1:3000/categoryapi/addcourse")
        .then((res) => setCourseList(res.data.courseList));
    } catch (error) {
      console.log("frontend axios error creating course", error);
    }
  };

  useEffect(() => {
    listcourseName();
    boardcallingNav();
    examcallingNav();
  }, [refreshPage]);

  const endpoints = [
    "http://127.0.0.1:3000/grandcategorys",
    "http://127.0.0.1:3000/parentcategorys",
    "http://127.0.0.1:3000/createArticles",
  ];

  // Clears temporary subheading data
  function changingdata() {
    setTempSubHeading("");
  }

  // Verifies user token
  const myVerificationFunc = async () => {
    let token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.post("http://127.0.0.1:3000/auth/protected", { token });
      } catch (error) {
        console.error("Error in frontend axios to send token", error);
      }
    } else {
      console.log("Empty token");
      localStorage.removeItem("mail");
    }
  };



  // Fetches initial data from endpoints
  const fetchInitialData = async () => {
    try {
      const data = await Promise.all(
        endpoints.map((endpoint) => axios.post(endpoint))
      );
      setDatas(data[0].data);
      setParentdatas(data[1].data);
      setAllBlogs(data[2].data);
    } catch (error) {
      console.error("Error in fetching initial data:", error);
    }
  };

  // Assuming SearchQuery is defined elsewhere

  function filteredpop(product, SearchQuery) {
    if (product.ArticleParentCategory) {
      return product.ArticleParentCategory.toLowerCase().includes(
        SearchQuery.toLowerCase()
      );
    }
  }

  function filteredpop2(product, SearchQuery) {
    if (product.ArticleTags) {
      return product.ArticleTags.toLowerCase().includes(
        SearchQuery.toLowerCase()
      );
    }
  }

  function filteredpop3(product, SearchQuery) {
    if (product.ExamName) {
      return product.ExamName.toLowerCase().includes(
        SearchQuery.toLowerCase()
      );
    }
  }

  function filteredpop4(product, SearchQuery) {
    if (product.BoardName) {
      return product.BoardName.toLowerCase().includes(
        SearchQuery.toLowerCase()
      );
    }
  }

  function filteredpop5(product, SearchQuery) {
    if (product.course) {
      return product.course.toLowerCase().includes(
        SearchQuery.toLowerCase()
      );
    }
  }




  const searchfunc = () => {
    try {
      const filteredProducts = allBlogs.filter(
        (product) =>
          (product.ArticleTitle &&
            product.ArticleTitle.toLowerCase().includes(
              SearchQuery.toLowerCase()
            )) || filteredpop(product, SearchQuery) || filteredpop2(product, SearchQuery) || filteredpop3(product, SearchQuery) || filteredpop4(product, SearchQuery) || filteredpop5(product, SearchQuery) 
      );

      setSearchResultdata(filteredProducts);
    } catch (error) {
      console.error("Error filtering products:", error);
    }
  };

  const getuserdata = async () => {
    try {
      let useremail = localStorage.getItem("mail");
      const singleuser = await axios.post("http://127.0.0.1:3000/user/userdashboard", { email: useremail })
      setLoginemail(singleuser.data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getuserdata();
    myVerificationFunc();
  }, [])

  useEffect(() => {
    changingdata();
  }, [subCatData]);

  useEffect(() => {
    fetchInitialData();
  }, [refreshPage]);

  useEffect(() => {
    if (allBlogs && Array.isArray(allBlogs)) {
      searchfunc();
    }
  }, [SearchQuery, allBlogs]);

  return (
    <ContextData.Provider
      value={{
        showArrow, setShowArrow,
        isEditing,
        setIsEditing,
        loginemail,
        setLoginemail,
        trutoken,
        setTrutoken,
        warning,
        setWarning,
        boarditems,
        setboarditems,
        examitems,
        setexamitems,
        refreshPage,
        setRefreshPage,
        cousenameforblog,
        setCousenameforblog,
        allcollegeinfo,
        setAllcollegeinfo,
        courseList,
        setCourseList,
        showbar,
        setShowbar,
        SearchResultdata,
        setSearchResultdata,
        SearchQuery,
        setSearchQuery,
        tempSubHeading,
        setTempSubHeading,
        subParentTemp,
        setSubParentTemp,
        categories,
        setCategories,
        searchSub,
        setSearchSub,
        subCatData,
        setSubCatData,
        allBlogs,
        setAllBlogs,
        SingleBlog,
        setSingleBlog,
        datas,
        setDatas,
        parentdatas,
        setParentdatas,
      }}
    >
      <BrowserRouter>
        <VerificationToken></VerificationToken>
        <ScrollToTop />
        <Header></Header>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/allblogs" element={<AllBlogs />} />
          <Route path="/blog" element={<SingleBlogTemplate />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/aboutus" element={<Aboutus></Aboutus>} />
          <Route path="/policy" element={<Policy></Policy>} />
          <Route path="*" element={<NotFound></NotFound>} />
          <Route path="/addpages" element={<PagesAndImages></PagesAndImages>} />
          <Route path="all" element={<AllPages></AllPages>} />
          
          
         
          
          
          
          
          


          


          {/* <Route path="/admin" element={<LandingPageAdmin />} /> */}
          {/* <Route path="/auth" element={<AuthPage />} /> */}
          {/* <Route path="/addcourse" element={<AddCourse></AddCourse>} /> */}
          {/* <Route path="/addsubcourse" element={<AddSubCourse></AddSubCourse>} /> */}
          {/* <Route path='/singlecollege' element={<SingleCollegeInfo></SingleCollegeInfo>} /> */}
          {/* <Route path="/nav" element={<InformativaNavAdmin></InformativaNavAdmin>}/> */}
          {/* <Route path="/list" element={<TrendingCollegeList></TrendingCollegeList>}/> */}
          {/* <Route path="/be" element={<BandEArticle></BandEArticle>} /> */}




          <Route path="/userpage" element={<PrivateRoute></PrivateRoute>}>
            <Route path="userdashboard" element={<UserDashboard></UserDashboard>} />
          </Route>


          <Route path="adminpage" element={<PrivateAdminRoute></PrivateAdminRoute>}>
            <Route path="article" element={<CreateArticle />} />
            <Route path="college" element={<CollegeInfo></CollegeInfo>} />
            <Route path='be' element={<BandEArticle></BandEArticle>} />
            <Route path="addcategory" element={<CategoryLandingPage></CategoryLandingPage>} />
            <Route path="createaboutus" element={<CreateAboutUs></CreateAboutUs>} />
          <Route path="createpolicy" element={<CreatePolicy></CreatePolicy>} />
          </Route>


        </Routes>
        <LowerFooter />
      </BrowserRouter>
    </ContextData.Provider>
  );
}

export default App;
