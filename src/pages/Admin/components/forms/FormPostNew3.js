import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Button, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";

const FormPostNew3 = ({ onHandleHideForm1, onHandleShowForm1 }) => {
  return (
    <Fragment>
      <div>
        <div className="row">
          <div className="col-12 my-2">
            <p>
              <strong>
                Mô tả công việc <span>*</span>
              </strong>
            </p>
            <p>
              <TextArea rows={4} placeholder="" maxLength={500} />
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

FormPostNew3.propTypes = {};

export default FormPostNew3;
