import React, { Component } from "react";
import { actionSearchTerm } from "../redux/actions/studentAction";
import { connect } from "react-redux";

class Search extends Component {
  state = {
    searchTerm: "",
  };
  handleChange = (evt) => {
    this.setState({
      searchTerm: evt.target.value,
    });
  };
  handleSearch = () => {
    this.props.dispatch(actionSearchTerm(this.state.searchTerm));
  };
  render() {
    return (
      <div style={{textAlign: 'right'}} className="container mt-3">
        <div className="w-50 btn-group">
          <input
            className="form-control"
            value={this.state.searchTerm}
            onChange={this.handleChange}
            placeholder="Nhập tên"
          ></input>
          <button
            className="btn btn-success"
            onClick={() => this.handleSearch()}
          >
            Tìm kiếm
          </button>
        </div>
      </div>
    );
  }
}

export default connect()(Search);
