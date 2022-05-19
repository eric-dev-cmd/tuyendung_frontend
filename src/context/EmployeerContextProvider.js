import React, { createContext, useState } from "react";
import PropTypes from "prop-types";
export const EmployeerContext = createContext();

const EmployeerContextProvider = (props) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isEditStudy, setIsEditStudy] = useState(false);
  const [detail, setDetail] = useState({});

  return (
    <EmployeerContext.Provider
      value={{
        tabIndex,
        setTabIndex,
        isSubmit,
        setIsSubmit,
        isRefresh,
        setIsRefresh,
        detail,
        setDetail,
        isEdit,
        setIsEdit,
        isEditStudy,
        setIsEditStudy,
      }}
    >
      {props.children}
    </EmployeerContext.Provider>
  );
};
export default EmployeerContextProvider;

EmployeerContext.propTypes = {
  children: PropTypes.element,
};
