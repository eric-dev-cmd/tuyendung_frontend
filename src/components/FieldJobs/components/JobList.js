import React from "react";
import JobItem from "./JobItem";

const JobList = ({ recruitments }) => {
  console.log("[zunggzing]", recruitments);
  return (
    <>
      {recruitments.length !== undefined &&
        recruitments.map((jobs, index) => {
          return (
            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-4">
              <JobItem jobs={jobs} />
            </div>
          );
        })}
    </>
  );
};

export default JobList;
