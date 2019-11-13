import React, { Component } from "react";
import {
  Collapse,
  Slider,
  Pagination,
  Progress,
  Checkbox,
  Input,
  Button,
  Statistic,
  Spin,
  Result
} from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import debounce from "lodash/debounce";
import {
  listAllContest,
  listAllFilter,
  searchOrganizer,
  chnageSorting,
  testCreate
} from "../actions/contestActions";
import config from "../config";
import moment from "moment";
const { Panel } = Collapse;
const CheckboxGroup = Checkbox.Group;
const { Countdown } = Statistic;
const formatter = value => {
  return `${value}%`;
};
const filterHeader = value => (
  <div className="text-secondary mb-0 font-weight-bold">{value}</div>
);

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

const ContestSort = props => {
  const { sortArr, onChangeSort } = props;
  return (
    <div className="row m-0 sort-area">
      {sortArr.map((item, index) => (
        <div
          onClick={() => onChangeSort(sortArr, item)}
          key={index}
          className={`col-sm ${
            item.isActive ? "active text-white" : ""
          } filter-sort border d-flex align-items-center justify-content-center`}
        >
          {item.text}{" "}
          {item.isActive &&
            (item.sortBy === "asc" ? (
              <i className="ml-2 fas fa-sort-up"></i>
            ) : (
              <i className="ml-2 fas fa-sort-down"></i>
            ))}
        </div>
      ))}
    </div>
  );
};

// eslint-disable-next-line
const DemoCountdown = value => {
  const test = moment(value.props.value).format(
    "D [days,] HH [hours,] mm [minutes and] ss [seconds]"
  );
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
  return (
    <Countdown
      className={styleClass}
      value={deadline}
      format={`H[h]:mm[m]:ss[s]`}
    />
  );
};

class LandingPage extends Component {
  constructor(props) {
    super(props);
    const { per_page, current_page, filterData } = this.props.contestList;
    console.log(
      "filterData.sortArr.filter(r => !r.isActive)",
      filterData.sortArr.find(r => r.isActive)
    );
    const SortVal = filterData.sortArr.find(r => r.isActive);
    this.appliedfilter = {
      page: current_page,
      per_page: per_page,
      price: [filterData.price.min, filterData.price.max],
      contests_type: [],
      organizer: [],
      sort: { key: SortVal.key, by: SortVal.sortBy }
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
    this.appliedfilter = {
      ...this.appliedfilter,
      price: checkedValues,
      page: 1
    };
  };

  onAfterChangePrice = checkedValues => {
    this.props.listAllContest(this.appliedfilter);
  };

  onChangeContestType = checkedValues => {
    this.appliedfilter = {
      ...this.appliedfilter,
      contests_type: checkedValues,
      page: 1
    };
    this.props.listAllContest(this.appliedfilter);
  };

  onChangeOrganizer = checkedValues => {
    this.appliedfilter = {
      ...this.appliedfilter,
      organizer: checkedValues,
      page: 1
    };
    this.props.listAllContest(this.appliedfilter);
  };

  onChangeSort = (Arr, checkedValues) => {
    const newList = Arr.map(item => {
      if (item.key === checkedValues.key) {
        if (checkedValues.isActive) {
          if (checkedValues.sortBy === "asc") {
            return { ...item, isActive: true, sortBy: "desc" };
          } else {
            return { ...item, isActive: true, sortBy: "asc" };
          }
        } else {
          return { ...item, isActive: true, sortBy: "asc" };
        }
      } else {
        return { ...item, isActive: false };
      }
    });
    this.props.chnageSorting(newList);
    const currentSort = newList.find(x => x.key === checkedValues.key);
    this.appliedfilter = {
      ...this.appliedfilter,
      sort: { key: currentSort.key, by: currentSort.sortBy },
      page: 1
    };
    this.props.listAllContest(this.appliedfilter);
  };

  onClearFilter = () => {
    const { filterData } = this.props.contestList;
    this.appliedfilter = {
      ...this.appliedfilter,
      price: [filterData.price.min, filterData.price.max],
      contests_type: [],
      organizer: [],
      page: 1
    };
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
    const {
      data,
      total,
      per_page,
      current_page,
      filterData,
      listLoader
    } = this.props.contestList;
    return (
      <div className="bg-light section">
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
                      <Button
                        type="primary"
                        size="small"
                        onClick={this.demoCreated}
                      >
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
                    <Collapse
                      bordered={false}
                      defaultActiveKey={["1", "2"]}
                      expandIconPosition={`right`}
                      className="w-100"
                    >
                      <Panel header={filterHeader(`Price`)} key="1">
                        <PriceRange
                          filterData={filterData}
                          onChangePrice={this.onChangePrice}
                          onAfterChangePrice={this.onAfterChangePrice}
                          value={this.appliedfilter.price}
                        />
                      </Panel>
                      <Panel header={filterHeader(`Contest Type`)} key="2">
                        <CheckboxGroup
                          onChange={this.onChangeContestType}
                          value={this.appliedfilter.contests_type}
                        >
                          {filterData.contests_type.map((item, index) => (
                            <div key={index}>
                              <Checkbox value={item.id}>{item.name}</Checkbox>
                            </div>
                          ))}
                        </CheckboxGroup>
                      </Panel>
                      <Panel header={filterHeader(`Organizer`)} key="3">
                        <Input
                          onChange={this.onSearchOrganizer}
                          size="small"
                          placeholder="Search Organizer"
                          className="mb-2 border"
                        />
                        <CheckboxGroup
                          onChange={this.onChangeOrganizer}
                          value={this.appliedfilter.organizer}
                        >
                          {filterData.organizer
                            .filter(d => d.visibility)
                            .map((item, index) => (
                              <div key={index}>
                                <Checkbox value={item.user.id}>
                                  {item.user.full_name}{" "}
                                  <span>{item.total}</span>
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
                  <ContestSort
                    {...filterData}
                    onChangeSort={this.onChangeSort}
                  />
                </div>
              </div>
              <Spin spinning={listLoader}>
                <div className="mt-2 contest-result">
                  {data &&
                    data.length > 0 &&
                    data.map((item, index) => (
                      <div className="card mt-2" key={index}>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-auto">
                              <div className="h4 mb-1">
                                <Link
                                  className="text-capitalize"
                                  to={`/contest-information/${item.id}`}
                                >
                                  {item.name}
                                </Link>
                              </div>
                              {/* <p className="h5 text-capitalize">{item.name}</p> */}
                              <img
                                src={`${config.BASE_URL}/${item.photo}`}
                                className="img-fluid contest-photo img-thumbnail"
                                alt={item.name}
                              />
                              <div className="media align-items-center mt-3">
                                <div className="u-avatar mr-2">
                                  <img
                                    className="img-fluid rounded-circle"
                                    src={`${config.BASE_URL}/storage/${item.user.avatar_location}`}
                                    alt={item.user.avatar_location}
                                  />
                                </div>
                                <div className="media-body">
                                  <small className="d-block text-muted">
                                    Listed on {item.created_at} by
                                  </small>
                                  <span className="d-block">
                                    {item.user.full_name}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col">
                              <div className="h5 font-weight-bold">
                                <i className="fas fa-rupee-sign"></i>
                                {item.joining_fee}
                              </div>
                              <p className="text-justify font-size-1">
                                {item.description}
                              </p>
                              <Progress
                                size="small"
                                format={percent =>
                                  `${item.joined_user}/${item.max_user}`
                                }
                                status={getColor(
                                  item.max_user,
                                  item.joined_user
                                )}
                                percent={
                                  (item.joined_user * 100) / item.max_user
                                }
                                //status="active"
                              />
                              <ContestCountdown
                                execution_date={item.execution_date}
                              />
                              <button
                                type="button"
                                className="btn btn-outline-primary"
                              >
                                Join
                              </button>
                            </div>
                          </div>
                        </div>
                        {/* <div className="card-footer border-top-0 d-flex justify-content-end">
                          <button
                            type="button"
                            className="btn btn-outline-primary"
                          >
                            Join
                          </button>
                        </div> */}
                      </div>
                    ))}
                  {!listLoader && data && data.length === 0 && (
                    <div className="card">
                      <Result
                        title="No search results found"
                        subTitle="Try other keyword to search!"
                      />
                    </div>
                  )}
                </div>
              </Spin>
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
      </div>
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
  chnageSorting,
  testCreate
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
