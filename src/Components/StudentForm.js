import React, { Component } from "react";
import { actionCreateStudent, actionUpdateStudent } from "../redux/actions/studentAction";
import { connect } from "react-redux";

class Form extends Component {
  state = {
    values: {
      id: "",
      fullName: "",
      phone: "",
      email: "",
    },
    errors:{
      id: "",
      fullName: "",
      phone: "",
      email: "",
    },
    
  };

  handleBlur = (evt) => {
    const {name, value} = evt.target;
    this.setState({
      errors:{
        ...this.state.errors,
        [name]: this.validation(name, value)
      }
    })
  };

  validation =(name, value)=>{
    switch (name) {
      case "id":
        const idReg = /^[0-9\s]+$/g;
        if(!value.trim()){
          return "Id không được để trống"
        }
        if(!idReg.test(value)){
          return "Id phải là số"
        }
        return ""
      case "fullName":
        const fullNameReg=/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/g;;
        if(!value.trim()){
          return "Họ tên không được để trống"
        }
        if(!fullNameReg.test(value)){
          return "Họ tên không đúng định dạng"
        }
        return ""
      case "phone":
        const phoneReg=/^[0-9\s]{10}$/g;
        if(!value.trim()){
          return "Số điện thoại không được để trống"
        }
        if(!phoneReg.test(value)){
          return "Số điện thoại không đúng định dạng"
        }
        return "";
      case "email":
        const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
        if(!value.trim()){
          return "Email không được để trống"
        }
        if(!emailReg.test(value)){
          return "Email không đúng định dạng"
        }
        return ""
      
      default:
        return ""
    }
  }

  handleChange = (evt) => {
    const { name, value } = evt.target;
    
    this.setState({
      values: {
        ...this.state.values,
        [name]: value,
      },
    });
  };
  handleSubmit = async (evt) => {
    evt.preventDefault();

    const validationErrors={};
    for(let key in this.state.values){
      const error = this.validation(key, this.state.values[key])
      if(error){
        validationErrors[key] = error
      }
    }

    if(Object.keys(validationErrors).length>0){
      this.setState({
        errors:{
          ...this.state.errors,
          ...validationErrors
        }
      })
      return
    }

    const { id, ...payload } = this.state.values;
    try {   
      if(this.props.isCreateStudent){
        this.props.dispatch(actionCreateStudent(payload));
      }else{
        this.props.dispatch(actionUpdateStudent(id, payload));
      }
        
      this.setState({
        values: {
          id: "",
          fullName: "",
          phone: "",
          email: "",
        },
      });
      // this.props.dispatch(actionIsCreateStudent(payload));
      console.log(this.props.isCreateStudent);
    } catch (error) {
      console.log(error);
    }
    
  };
  render() {
    const { values, errors } = this.state;
    return (
      <div className="container">
        <div className="card w-100 p-5">
          <div className="card-header bg-dark text-light mb-2">
            <h2 className="mb-0">THÔNG TIN SINH VIÊN</h2>
          </div>
          
          <form onSubmit={this.handleSubmit}>
            <div className="row g-3 mb-3">
              <div className="col">
                <label>Mã SV</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Mã SV"
                  name="id"
                  value={values.id}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
                {errors.id && <div className="alert alert-danger mt-2 mb-0">{errors.id}</div>}
              </div>
              <div className="col">
                <label>Họ tên</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Họ tên"
                  name="fullName"
                  value={values.fullName}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  
                />
                {errors.fullName && <div className="alert alert-danger mt-2 mb-0">{errors.fullName}</div>}
              </div>
            </div>
            <div className="row g-3 mb-3">
              <div className="col">
                <label>Số điện thoại</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Số điện thoại"
                  name="phone"
                  value={values.phone}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  
                />
                {errors.phone && <div className="alert alert-danger mt-2 mb-0">{errors.phone}</div>}
              </div>
              <div className="col">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  
                />
                {errors.email && <div className="alert alert-danger mt-2 mb-0">{errors.email}</div>}
              </div>
              <button className="btn btn-success">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps){
    if(this.props.seletedStudent && this.props.seletedStudent !== prevProps.seletedStudent){
      this.setState({
        values: this.props.seletedStudent
      })
    }

  }
}

const mapStateToProps = state =>{
  return {
    seletedStudent: state.studentReducer.selectedStudent,
    isCreateStudent: state.studentReducer.isCreateStudent
  }
}

export default connect(mapStateToProps)(Form);
