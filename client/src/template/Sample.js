import React from "react";

const Sample = () => {
  return (
    <section className="features-icons bg-light text-center">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
              <div className="features-icons-icon d-flex">
                <i className="bi-window m-auto text-primary"></i>
              </div>
              <h3>Recent Search #1</h3>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
              <div className="features-icons-icon d-flex">
                <i className="bi-layers m-auto text-primary"></i>
              </div>
              <h3>Recent Search #2</h3>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="features-icons-item mx-auto mb-0 mb-lg-3">
              <div className="features-icons-icon d-flex">
                <i className="bi-terminal m-auto text-primary"></i>
              </div>
              <h3>Recent Search #3</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sample;