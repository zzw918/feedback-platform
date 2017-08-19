import {combineReducers} from 'redux'
import { ADD_CUR_USER } from '../Action/index'
import { ADD_ALL_PRODUCT } from '../Action/index'

function handleUser ( state={curUserName: ''}, action ) {
    switch (action.type) {
        case "ADD_CUR_USER":
            return {
                curUserName: action.text
            }
        default:
            return state;
    }
}

function handleProducts (state = {allProducts: [], curProName: ''},  action) {
    switch (action.type) {
        case "ADD_ALL_PRODUCT":
            const  newPro = Object.assign([],  action.data);
            return {
                allProducts: newPro,
                curProName: state.curProName
            }
        case 'UPDATE_CUR_PRO':
            return {
                allProducts: state.allProducts,
                curProName: action.name
            }
        default:
            return state;
    }
}

function handleSuggestions (state = {allSuggestoins: [], filteredSuggestions: []},  action) {
    switch (action.type) {
        case "ADD_ALL_SUGGESTIONS":
            const  newSeg = Object.assign([],  action.data);
            return {
                allSuggestoins: newSeg
            }
        case 'FILTER_PRO':
            return {
                allSuggestoins: state.allSuggestoins,
                filteredSuggestions: state.allSuggestoins.filter(function (item, index) {
                    return item.productType == action.name;
                })
            }
        default:
            return state;
    }
}

function handleComments (state = {someSuggestions: []},  action) {
    switch (action.type) {
        case "ADD_ALL_COMMENT":
            // const  newPro = Object.assign([],  action.data);
            return {
                someSuggestions: action.data
            }
        default:
            return state;
    }
}

const storeReducer = combineReducers({
    handleUser,
    handleProducts,
    handleSuggestions,
    handleComments
});

export default storeReducer;