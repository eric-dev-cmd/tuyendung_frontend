import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./NotFoundPage.css";

import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';


const NotFoundPage = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <Fragment>
      <section className="page_404">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-offset-1  text-center">
                <div className="four_zero_four_bg">
                  <h1 className="text-center ">404</h1>
                </div>
                <div className="contant_box_404">
                  <h3 className="h2">404</h3>
                  <p>Trang này không tồn tại!</p>
                  <Link to="/" className="link_404">
                    Trở lại trang chủ
                  </Link>
                  <div
                    style={{
                      height: '50rem',
                      width: '50rem',
                      margin: '1rem auto',
                    }}
                  >
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist/build/pdf.worker.min.js">
                      <div style={{
                        height: '50rem',
                        width: '50rem',
                        margin: '1rem auto',
                      }}>
                        <Viewer fileUrl={'https://webtuyendung.s3.ap-southeast-1.amazonaws.com/duong-cat-luynh_06a8aaf4caa55166_1420680+(1).pdf'}
                          plugins={[defaultLayoutPluginInstance]} />
                      </div>
                    </Worker>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default NotFoundPage;
