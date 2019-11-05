import React from "react";

const SiteFooter = props => (
  <footer>
    <div className="container py-5 my-3">
      <div className="row justify-content-md-between">
        <div className="col-sm-4 col-md-4 col-lg-2 mb-3 mb-lg-0">
          <h6 className="h6 font-weight-semi-bold">About</h6>
          <ul className="list-group list-group-borderless">
            <li className="list-group-item">
              <a className="text-muted" href="#foo">
                Team
              </a>
            </li>
            <li className="list-group-item">
              <a className="text-muted" href="#foo">
                Locations
              </a>
            </li>
            <li className="list-group-item">
              <a className="text-muted" href="#foo">
                Privacy
              </a>
            </li>
          </ul>
        </div>
        <div className="col-sm-4 col-md-4 col-lg-2 mb-3 mb-lg-0">
          <h6 className="h6 font-weight-semi-bold">Features</h6>
          <ul className="list-group list-group-borderless">
            <li className="list-group-item">
              <a className="text-muted" href="#foo">
                Cool stuff
              </a>
            </li>
            <li className="list-group-item">
              <a className="text-muted" href="#foo">
                Random feature
              </a>
            </li>
            <li className="list-group-item">
              <a className="text-muted" href="#foo">
                Team feature
              </a>
            </li>
          </ul>
        </div>
        <div className="col-sm-4 col-md-4 col-lg-2 mb-4 mb-lg-0">
          <h6 className="h6 font-weight-semi-bold">Resources</h6>
          <ul className="list-group list-group-borderless">
            <li className="list-group-item">
              <a className="text-muted" href="#foo">
                Resource
              </a>
            </li>
            <li className="list-group-item">
              <a className="text-muted" href="#foo">
                Resource name
              </a>
            </li>
            <li className="list-group-item">
              <a className="text-muted" href="#foo">
                Another resource
              </a>
            </li>
          </ul>
        </div>
        <div className="col-md-7 col-lg-4">
          <h6 className="h6 font-weight-semi-bold">We are driven to deliver results for all your businesses.</h6>
          <button type="button" className="btn btn-dark border-0 text-left mb-2 mr-1">
            <span className="media align-items-center">
              <span className="fab fa-apple fa-2x mr-3" />
              <span className="media-body">
                <span className="d-block small">Download on the</span>
                <strong className="font-size-1">App Store</strong>
              </span>
            </span>
          </button>
          <button type="button" className="btn btn-dark border-0 text-left mb-2">
            <span className="media align-items-center">
              <span className="fab fa-google-play fa-2x mr-3" />
              <span className="media-body">
                <span className="d-block small">Get it on</span>
                <strong className="font-size-1">Google Play</strong>
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>
    <div className="container-fluid border-top py-5">
      <div className="text-center">
        <a className="mb-3" href="index.html">
          <img className="align-text-bottom" src="assets/images/logo.png" alt="Last" />
          <span className="text-primary h1 font-weight-bold">Last</span>
        </a>
        <p className="small text-muted mb-2">© LastHope. 2018 MarvisDesign. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
