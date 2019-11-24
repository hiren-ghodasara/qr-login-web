import React from "react";

const Dashboard = (props) => {
  console.log("userInfo.balance111", props);
  const { authUser } = props;
  const { userInfo } = authUser;
  console.log("userInfo.balance", userInfo);
  return (
    <div className="container py-5">
      {/* Stats */}
      <div className="card-deck d-block d-lg-flex card-lg-gutters-3 mb-6">
        {/* Card */}
        <div className="card mb-3 mb-lg-0">
          <div className="card-body p-5">
            <div className="media align-items-center">
              <div className="media-body">
                <span className="d-block font-size-3">$ {userInfo.balance}</span>
                <h2 className="h6 text-secondary font-weight-normal mb-0">Available balance</h2>
              </div>
            </div>
          </div>
        </div>
        {/* End Card */}
        {/* Card */}
        <div className="card mb-3 mb-lg-0">
          <div className="card-body p-5">
            <div className="media align-items-center">
              <span className="btn btn-lg btn-icon btn-soft-success rounded-circle mr-4">
                <span className="fas fa-coins btn-icon__inner" />
              </span>
              <div className="media-body">
                <span className="d-block font-size-3">$1.32</span>
                <h3 className="h6 text-secondary font-weight-normal mb-0">Reward balance</h3>
              </div>
            </div>
          </div>
        </div>
        {/* End Card */}
        {/* Card */}
        <div className="card">
          <div className="card-body p-5">
            <div className="media align-items-center">
              <span className="btn btn-lg btn-icon btn-soft-warning rounded-circle mr-4">
                <span className="fas fa-exchange-alt btn-icon__inner" />
              </span>
              <div className="media-body">
                <span className="d-block font-size-3">$0.00</span>
                <h3 className="h6 text-secondary font-weight-normal mb-0">Pending balance</h3>
              </div>
            </div>
          </div>
        </div>
        {/* End Card */}
      </div>
      {/* End Stats */}
    </div>
  );
};

export default Dashboard;
