import React, { Component } from "react";
import { connect } from "react-redux";
import {actionDeleteStudent, actionSelectStudent} from '../redux/actions/studentAction';

class TableInfo extends Component {
  deleteStudent= async(id)=>{
    this.props.dispatch(actionDeleteStudent(id));
  }
  handleSelectStudent = async (id)=>{
    this.props.dispatch(actionSelectStudent(id));
    
  }
  renderTable=()=>{
    return this.props.students.map((item, index) => {
      return (
        <tr key={index}>
          <th scope="row">{item.id}</th>
          <td>{item.fullName}</td>
          <td>{item.phone}</td>
          <td>{item.email}</td>
          <td>
            <button className="btn btn-warning me-2" onClick={()=>this.handleSelectStudent(item.id)}>Chỉnh sửa</button>
            <button className="btn btn-danger" onClick={()=>this.deleteStudent(item.id)}>Xoá</button>
          </td>
        </tr>
      );
    })
  }
  render() {
    return (
      <div className="container">
        <table className="table border mt-5">
          <thead>
            <tr className="bg-dark text-light">
              <th scope="col">Mã SV</th>
              <th scope="col">Họ tên</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Email</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            
            {this.renderTable()}
            
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    students: state.studentReducer.students,
    isCreateStudent: state.studentReducer.isCreateStudent
  };
};

export default connect(mapStateToProps)(TableInfo);
