import React, { Component } from 'react';
import StudentForm from './StudentForm';
import TableInfo from './StudentList';
import {connect} from 'react-redux';
import {actionFetchStudent} from '../redux/actions/studentAction';
import Search from './Search';
class Management extends Component {
    render() {
        return (
            <div>
                <StudentForm></StudentForm>
                <Search></Search>
                <TableInfo></TableInfo>
            </div>
        );
    }

    componentDidMount(){
        this.props.dispatch(actionFetchStudent());
    }
}

export default connect()(Management);