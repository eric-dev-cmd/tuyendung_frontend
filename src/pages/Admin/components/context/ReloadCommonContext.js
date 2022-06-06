import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
export const ReloadCommonContext = createContext({
  apiData: {
    listRecruitment: [],
  },
});

const ReloadCommonProvider = ({ children, ...props }) => {
  const [isSubmitT, setIsSubmitT] = useState(false);

  return (
    <ReloadCommonContext.Provider
      value={{
        isSubmitT,
        setIsSubmitT,
      }}
    >
      {children}
    </ReloadCommonContext.Provider>
  );
};

ReloadCommonProvider.propTypes = {
  children: PropTypes.any,
};

export default ReloadCommonProvider;

export function useReloadCommonContext() {
  return React.useContext(ReloadCommonContext);
}
