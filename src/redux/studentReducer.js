import {produce} from 'immer';
import * as actionTypes from './contants/studentContants';

const initialState={
    students:[],
    selectedStudent: null,
    searchTerm:"",
    isCreateStudent: true,
    
}

export const studentReducer = (state=initialState, {type, payload})=>{
    const newState =produce(state, draft=>{
        
        if(type===actionTypes.LOAD_LIST_STUDENT){
            draft.students=payload
            draft.isCreateStudent=true
        }
        if(type===actionTypes.SELECTED_STUDENT){
            draft.selectedStudent = payload
            draft.isCreateStudent = false
            
        }
        if(type === actionTypes.SEARCH_TERM){
            draft.searchTerm = payload
            
        }
    })
    return newState;
}