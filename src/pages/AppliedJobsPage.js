import { Layout } from "antd";
import React, { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import FooterHome from "../components/Footer/FooterHome";
import JobList from "../components/JobHome/components/JobList";
import JobProvider from "../components/JobHome/context/jobCommonContext";
import MainNavigation from "../components/Layout/MainNavigation";
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
