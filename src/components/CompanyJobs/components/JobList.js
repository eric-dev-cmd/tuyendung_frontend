import React from "react";
import JobItem from "./JobItem";

const JobList = ({ recruitments }) => {
  console.log("[zunggzing]", recruitments);
  return (
    <>
      {recruitments.length !== undefined &&
        recruitments.map((jobs, index) => {
          return (
            <div key={index} className="col-12 col-sm-12 col-md-12 col-lg-12">
              <JobItem jobs={jobs} />
            </div>
          );
        })}
    </>
  );
};

export default JobList;
