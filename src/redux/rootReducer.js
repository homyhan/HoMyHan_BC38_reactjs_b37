import {combineReducers} from 'redux';
// import {demoReducer} from './demoReducer';
// import categoryReducer from './categoryReducer.js'
// import productReducer from './productReducer';
import {studentReducer} from './studentReducer';


const rootReducer = combineReducers({
    // demoReducer
    // ============ DRESSING ROOM ============
    // category: categoryReducer,
    // product: productReducer

    // ==============CRUD================
    studentReducer
});

export default rootReducer;


