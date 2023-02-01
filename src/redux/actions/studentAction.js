import * as actionTypes from '../contants/studentContants';
import axios from 'axios';

export const actionFetchStudent = () => {
    return async (dispatch, getState) => {
      try {
        const {searchTerm}=getState().studentReducer
        const res = await axios({
          method: "GET",
          url: "https://6388b315d94a7e5040a45713.mockapi.io/students/",
          params: {
            fullName: searchTerm || undefined,
          },
        });
        dispatch({
          type: actionTypes.LOAD_LIST_STUDENT,
          payload: res.data,
        });
        console.log(res.data);
      } catch (err) {
        console.log(err);
        
      }
    };
  };

  export const actionCreateStudent = (student) => {
    return async (dispatch) => {
      try {
        await axios({
          method: "POST",
          url: "https://6388b315d94a7e5040a45713.mockapi.io/students",
          data: student,
        });
        dispatch(actionFetchStudent());
      } catch (error) {
        console.log(error);
      }
    };
  };

  export const actionDeleteStudent = id =>{
    return async (dispatch) => {
      try {
        await axios({
          method: "DELETE",
          url: "https://6388b315d94a7e5040a45713.mockapi.io/students/" + id,
        });
       
        dispatch(actionFetchStudent());
      } catch (error) {
        console.log(error);
      }
    };
  }

  export const actionSelectStudent = (id) => {
    return async (dispatch) => {
      try {
        const res = await axios({
          method: "GET",
          url: "https://6388b315d94a7e5040a45713.mockapi.io/students/" + id,
        });
        dispatch({
          type: actionTypes.SELECTED_STUDENT,
          payload: res.data,
          
        });
        
      } catch (error) {
        console.log(error);
      }
    };
  };
  
  export const actionUpdateStudent = (id, student) => {
    return async (dispatch) => {
      try {
        await axios({
          method: "PUT",
          url: "https://6388b315d94a7e5040a45713.mockapi.io/students/" + id,
          data: student,
        });
        dispatch(actionFetchStudent());
      } catch (error) {
        console.log(error);
      }
    };
  };

  export const actionSearchTerm = (searchTerm) => {
    return (dispatch) => {
      dispatch({
        type: actionTypes.SEARCH_TERM,
        payload: searchTerm,
      });
      
      dispatch(actionFetchStudent());
    };
  };
