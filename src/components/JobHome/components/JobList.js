import React, { Fragment, useEffect, useState } from "react";
import recruitmentApi from "../../../services/recruitmentApi";
import JobProvider, { useRecruitments } from "../context/jobCommonContext";
import JobItem from "./JobItem";

const JobList = ({ recruitments }) => {
  console.log("recruitments", recruitments);

  return (
    <>
      {recruitments
        ? recruitments.map((jobs, index) => {
            return (
              <div className="col-12 col-sm-6 col-md-3 col-lg-4 py-">
                <JobItem jobs={jobs} key={index} />
              </div>
            );
          })
        : null}
    </>
  );
};

export default JobList;
