import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import CarouselImage from "../components/Carousel/Carousel";
import CarouselCustom from "../components/Carousel/CarouselCustom";
import MainNavigation from "../components/Layout/MainNavigation";
import JobList from "../components/JobHome/components/JobList";
import { AiFillStar, AiFillDollarCircle } from "react-icons/ai";
import { FaUsersCog, FaLaptopCode } from "react-icons/fa";
import FooterHome from "../components/Footer/FooterHome";
import CareerTrends from "../components/CareerTrends";
import { GlobalData } from "../data/globalData";
import { Breadcrumb, Layout, Carousel, Modal, PageHeader } from "antd";
import SearchCommon from "../components/Search";
import JobProvider from "../components/JobHome/context/jobCommonContext";
import JobListFilter from "../components/JobHome/components/JobListFilter";

import { useCommonContext } from "../components/Search/context/commonContext";
import { useHistory } from "react-router-dom";
import JobItem from "../components/JobHome/components/JobItem";
import InterestedJobApi from "../services/interestedJobApi";
import { toast } from "react-toastify";
import AppliedJobApi from "../services/appliedJobApi";

const { Header, Footer, Sider, Content } = Layout;

const AppliedJobsPage = () => {
  const getListAppliedJobs = async () => {
    try {
      const response = await AppliedJobApi.getListAppliedJob();
      console.log("response", response);
    } catch (error) {
      console.log(error);
      toast.error(error.response);
      console.log(error.response);
    }
  };
  useEffect(() => {
    getListAppliedJobs();
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>Việc làm đã ứng tuyển | 123job.org</title>
      </Helmet>
      <MainNavigation />

      <div className="mt-65">
        <Layout>
          <JobProvider>
            <div className="container bottom-footer">
              <Content>
                <div className="my-3">
                  <h4>Việc làm đã ứng tuyển</h4>
                </div>

                <div className="bg-white px-3 pt-1 rounded"></div>
                <div className="row mt-2">
                  <JobList />
                </div>
              </Content>
            </div>
          </JobProvider>
        </Layout>
        <FooterHome />
      </div>
    </Fragment>
  );
};

export default AppliedJobsPage;
