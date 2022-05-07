import React, { Fragment, useEffect, useState } from "react";
import JobItem from "./JobItem";

const JobListFilter = ({ recruitments }) => {
  return (
    <>
      {recruitments
        ? recruitments.map((jobs, index) => {
            return (
              <div className="col-12">
                <JobItem jobs={jobs} key={index} />
              </div>
            );
          })
        : null}
    </>
  );
};

export default JobListFilter;
