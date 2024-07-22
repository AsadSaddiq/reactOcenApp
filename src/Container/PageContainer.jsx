import React, { useState, useEffect } from "react";
import Navbar from "../component/Navbar";
import CategoriesBar from "../component/CategoriesBar";
import { Outlet } from "react-router-dom";
import Filter from "../component/filterBar";
import MbFooter from "../component/MbFooter";
import { useLocation } from "react-router-dom";
import MbFilter from "../component/MbFilter";
import HomeMbFilter from "../pages/Home/components/MbFilter";

const PageContainer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [filter, setFilter] = useState(false);
  const [homeFilter, setHomeFilter] = useState(false);
  const [propertyFilter, setPropertyFilter] = useState(false);
  const isPropertyPage = location.pathname === "/property/rent";
  const isPropertyDetailPage = location.pathname.includes("/detail");

  useEffect(() => {
    setHomeFilter(false);
    setPropertyFilter(false);
  }, [location]);

  const openFilter = () => {
    if (isHomePage) {
      setHomeFilter((preVal) => !preVal);
    }
    if (isPropertyPage) {
      setPropertyFilter((preVal) => !preVal);
    }
  };
  return (
    <>
      <div className="flex flex-col min-h-screen ">
        <div className="sticky top-0 z-10  bg-slate-50">
          <Navbar />
        </div>
        {isPropertyDetailPage ? "" : <CategoriesBar />}

        <div className="sticky top-0 z-10  bg-slate-50">
          {isPropertyPage && propertyFilter ? (
            <MbFilter setPropertyFilter={setPropertyFilter} />
          ) : (
            ""
          )}
        </div>
        <div className="sticky top-0 z-10  bg-slate-50">
          {isHomePage && homeFilter ? (
            <HomeMbFilter setHomeFilter={setHomeFilter} />
          ) : (
            ""
          )}
        </div>

        <div className="flex-1 overflow-y-auto  ">
          <Outlet />
        </div>
        <div className="flex sm:hidden fixed w-full  bottom-0 z-10 h-12  bg-slate-200">
          <MbFooter openFilter={openFilter} />
        </div>
      </div>
    </>
  );
};

export default PageContainer;
