import React, { Component } from "react";
import { Collapse, Slider, Pagination, Progress, Checkbox, Input, Button, Statistic } from "antd";
import { connect } from "react-redux";
import debounce from "lodash/debounce";
import { listAllContest, listAllFilter, searchOrganizer, testCreate } from "../actions/contestActions";
import config from "../config";
import moment from "moment";
const { Panel } = Collapse;
const CheckboxGroup = Checkbox.Group;
const { Countdown } = Statistic;
const formatter = value => {
  return `${value}%`;
};
const filterHeader = value => <div className="text-secondary mb-0 font-weight-bold">{value}</div>;

const getColor = (T, J) => {
  const percent = Number.parseFloat(((J * 100) / T).toFixed(2));
  if (T === J) {
    return `success`;
  } else if (percent > 70) {
    return `exception`;
  } else {
    return `normal`;
  }
};

const PriceRange = props => {
  const { filterData, onAfterChangePrice, onChangePrice, value } = props;
  return (
    <Slider
      tipFormatter={formatter}
      min={filterData.price.min}
      max={filterData.price.max}
      range
      onAfterChange={onAfterChangePrice}
      onChange={onChangePrice}
      //defaultValue={value}
      value={value}
    />
  );
};

// eslint-disable-next-line
const DemoCountdown = value => {
  const test = moment(value.props.value).format("D [days,] HH [hours,] mm [minutes and] ss [seconds]");
  return <h1>{test}</h1>;
};

const ContestCountdown = props => {
  //let date = moment(props.execution_date);
  const date = moment.utc(props.execution_date).local();
  const duration = moment.duration(date.diff(moment(new Date())));
  const deadline = Date.now() + duration.asMilliseconds();
  let styleClass = "";
  if (duration.asHours() < 24) {
    styleClass = "red";
  }
  // const deadline = Date.now() + duration; //9 days, 23 hours, 59 minutes and 29 seconds
  return <Countdown className={styleClass} value={deadline} format={`H[h]:mm[m]:ss[s]`} />;
};

class LandingPage extends Component {
  constructor(props) {
    super(props);
    const { per_page, current_page, filterData } = this.props.contestList;
    this.appliedfilter = {
      page: current_page,
      per_page: per_page,
      price: [filterData.price.min, filterData.price.max],
      contests_type: [],
      organizer: []
    };
    this.searchOrganizer = debounce(this.props.searchOrganizer, 300);
  }

  componentDidMount() {
    this.props.listAllFilter();
    this.props.listAllContest(this.appliedfilter);
  }

  chnagePagination = (page, pageSize) => {
    this.appliedfilter = { ...this.appliedfilter, page: page };
    this.props.listAllContest(this.appliedfilter);
  };

  onShowSizeChange = (current, pageSize) => {
    this.appliedfilter = { ...this.appliedfilter, per_page: pageSize };
    this.props.listAllContest(this.appliedfilter);
  };

  onChangePrice = checkedValues => {
    this.appliedfilter = { ...this.appliedfilter, price: checkedValues };
  };

  onAfterChangePrice = checkedValues => {
    this.props.listAllContest(this.appliedfilter);
  };

  onChangeContestType = checkedValues => {
    this.appliedfilter = { ...this.appliedfilter, contests_type: checkedValues };
    this.props.listAllContest(this.appliedfilter);
  };

  onChangeOrganizer = checkedValues => {
    this.appliedfilter = { ...this.appliedfilter, organizer: checkedValues };
    this.props.listAllContest(this.appliedfilter);
  };

  onClearFilter = () => {
    const { filterData } = this.props.contestList;
    this.appliedfilter = { ...this.appliedfilter, price: [filterData.price.min, filterData.price.max], contests_type: [], organizer: [] };
    this.props.listAllContest(this.appliedfilter);
  };

  onSearchOrganizer = e => {
    const { value } = e.target;
    this.searchOrganizer(value);
  };

  demoCreated = () => {
    this.props.testCreate();
  };

  render() {
    const { data, total, per_page, current_page, filterData } = this.props.contestList;
    return (
      <main role="main">
        <section className="bg-light section">
          <div className="container-fluid py-3">
            <div className="row">
              <div className="col-lg-3">
                <div className="card">
                  <div className="card-body px-3 py-0">
                    <div className="row  px-4 py-2 border-bottom">
                      <div className="col-8">
                        <p className="h6 font-weight-bold">Refine Results</p>
                        <p>
                          Showing {per_page} Of {total} Buses
                        </p>
                        <Button type="primary" size="small"  onClick={this.demoCreated}>
                          Demo Contest
                        </Button>
                      </div>
                      <div className="col-4">
                        <Button type="link" onClick={this.onClearFilter}>
                          Clear All
                        </Button>
                      </div>
                    </div>
                    <div className="row">
                      <Collapse bordered={false} expandIconPosition={`right`} className="w-100">
                        <Panel header={filterHeader(`Price`)} key="1">
                          <PriceRange
                            filterData={filterData}
                            onChangePrice={this.onChangePrice}
                            onAfterChangePrice={this.onAfterChangePrice}
                            value={this.appliedfilter.price}
                          />
                        </Panel>
                        <Panel header={filterHeader(`Contest Type`)} key="2">
                          <CheckboxGroup onChange={this.onChangeContestType} value={this.appliedfilter.contests_type}>
                            {filterData.contests_type.map((item, index) => (
                              <div key={index}>
                                <Checkbox value={item.id}>{item.name}</Checkbox>
                              </div>
                            ))}
                          </CheckboxGroup>
                        </Panel>
                        <Panel header={filterHeader(`Organizer`)} key="3">
                          <Input onChange={this.onSearchOrganizer} size="small" placeholder="Search Organizer" className="mb-2 border" />
                          <CheckboxGroup onChange={this.onChangeOrganizer} value={this.appliedfilter.organizer}>
                            {filterData.organizer
                              .filter(d => d.visibility)
                              .map((item, index) => (
                                <div key={index}>
                                  <Checkbox value={item.user.id}>
                                    {item.user.full_name} <span>{item.total}</span>
                                  </Checkbox>
                                </div>
                              ))}
                          </CheckboxGroup>
                        </Panel>
                      </Collapse>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="card">
                  <div className="card-body p-0">
                    <div className="row m-0">
                      <div className="col-sm filter-sort border d-flex align-items-center justify-content-center">Cheapest</div>
                      <div className="col-sm filter-sort border d-flex align-items-center justify-content-center">Execution Date</div>
                      <div className="col-sm filter-sort border d-flex align-items-center justify-content-center">Availability</div>
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  {data &&
                    data.map((item, index) => (
                      <div className="card mt-2" key={index}>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-4">
                              <p className="h3 text-uppercase">{item.name}</p>
                              <ul className="list-inline font-size-1 text-muted">
                                <li className="list-inline-item">{item.contests_type.id}</li>
                                <li className="list-inline-item text-muted">•</li>
                                <li className="list-inline-item">{item.contests_type.name}</li>
                              </ul>
                              <img src={`${config.BASE_URL}/${item.photo}`} className="img-fluid contest-photo img-thumbnail" alt={item.name} />
                              <div className="media align-items-center mt-auto">
                                <div className="u-avatar mr-2">
                                  <img
                                    className="img-fluid rounded-circle"
                                    src={`${config.BASE_URL}/storage/${item.user.avatar_location}`}
                                    alt={item.user.avatar_location}
                                  />
                                </div>
                                <div className="media-body">
                                  <small className="d-block text-muted">Listed on {item.created_at} by</small>
                                  <span className="d-block">{item.user.full_name}</span>
                                </div>
                              </div>
                            </div>
                            <div className="col">
                              <div className="h2 font-weight-bold">
                                <i className="fas fa-rupee-sign"></i>
                                {item.joining_fee}
                              </div>
                              <p className="text-justify font-size-1">{item.description}</p>
                              <Progress
                                size="small"
                                format={percent => `${item.joined_user}/${item.max_user}`}
                                status={getColor(item.max_user, item.joined_user)}
                                percent={(item.joined_user * 100) / item.max_user}
                                //status="active"
                              />
                              <ContestCountdown execution_date={item.execution_date} />
                              <button type="button" className="btn btn-outline-primary">
                                Join
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="card-footer border-top-0 pt-0 px-4 pb-4">
                          <div className="d-sm-flex align-items-sm-center">
                            {/* Hourly */}
                            <div className="u-ver-divider u-ver-divider--none-sm pr-4 mr-4 mb-3 mb-sm-0">
                              <h3 className="small text-secondary mb-0">Hourly</h3>
                              <small className="fas fa-clock text-secondary mr-1" />
                              <span className="align-middle font-size-1 font-weight-medium">35</span>
                            </div>
                            {/* End Hourly */}
                            {/* Projects */}
                            <div className="u-ver-divider u-ver-divider--none-sm pr-4 mr-4 mb-3 mb-sm-0">
                              <h4 className="small text-secondary mb-0">Projects</h4>
                              <small className="fas fa-briefcase text-secondary mr-1" />
                              <span className="align-middle font-size-1 font-weight-medium">15</span>
                            </div>
                            {/* End Projects */}
                            {/* Review */}
                            <div className="small">
                              <div className="text-warning mb-1">
                                <span className="fas fa-star" />
                                <span className="fas fa-star" />
                                <span className="fas fa-star" />
                                <span className="fas fa-star" />
                                <span className="fas fa-star" />
                              </div>
                              <span className="font-weight-semi-bold">4.91</span>
                              <span className="text-muted">(12k+ reviews)</span>
                            </div>
                            {/* End Review */}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="mt-2">
                  <Pagination
                    showSizeChanger
                    onShowSizeChange={this.onShowSizeChange}
                    defaultCurrent={current_page}
                    total={total}
                    pageSize={per_page}
                    onChange={this.chnagePagination}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* service section end */}
      </main>
    );
  }
}

const mapStateToProps = state => ({
  contestList: state.contest
});

const mapDispatchToProps = {
  listAllContest,
  listAllFilter,
  searchOrganizer,
  testCreate
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);
