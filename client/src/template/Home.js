import React from "react";

const Home = () => {
    return (
        <header className="masthead">
          <div className="container position-relative">
            <div className="row justify-content-center">
              <div className="col-xl-6">
                <div className="text-center text-white">
                  
                  <h1 className="mb-5">Search for a Parking near you!</h1>
                    <div className="row">
                      <div className="col">
                        <input
                          className="form-control form-control-lg"
                          id="zipcode" 
                          type="input"
                          placeholder="Enter zipcode here"
                        />{" "}
                      </div>
                      <div className="col-auto">
                        <button
                          className="btn btn-primary btn-lg"
                          id="submitButton"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      );
    };
export default Home;