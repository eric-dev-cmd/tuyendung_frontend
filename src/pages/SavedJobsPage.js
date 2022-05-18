import { Layout } from "antd";
import React, { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import FooterHome from "../components/Footer/FooterHome";
import JobList from "../components/JobHome/components/JobList";
import JobProvider from "../components/JobHome/context/jobCommonContext";
import MainNavigation from "../components/Layout/MainNavigation";
import InterestedJobApi from "../services/interestedJobApi";

const { Header, Footer, Sider, Content } = Layout;

const SavedJobsPage = () => {
  const getListSavedJobs = async () => {
    try {
      const response = await InterestedJobApi.getListInterestedJob();
      console.log("response", response);
    } catch (error) {
      console.log(error);
      toast.error(error.response);
      console.log(error.response);
    }
  };
  useEffect(() => {
    getListSavedJobs();
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>Tin tuyển dụng đã lưu | 123job.org</title>
      </Helmet>
      <MainNavigation />

      <div className="mt-65">
        <Layout>
          <JobProvider>
            <div className="container bottom-footer">
              <Content>
                <div className="my-3">
                  <h4>Việc làm đã lưu</h4>
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

export default SavedJobsPage;
