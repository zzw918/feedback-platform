import {combineReducers} from 'redux'

import { ADD_CUR_USER } from '../Action'
import { ADD_ALL_PRODUCT } from '../Action'

function handleUser ( state={curUserName: ''}, action ) {
    switch (action.type) {
        case 'ADD_CUR_USER':
            return {
                curUserName: action.text
            }
        default:
            return state;
    }
}

function handleProducts (state = {allProducts: []},  action) {
    switch (action.type) {
        case 'ADD_ALL_PRODUCT':
            const  newPro = Object.assign([],  action.data);
            return {
                allProducts: newPro
            }
        default:
            return state;
    }
}

function handleSuggestions (state = {allSuggestions: [], filteredSug: []}, action) {
    switch (action.type) {
        case 'ADD_ALL_SUGGESTIONS': 
            const newSug = Object.assign([], action.data);
            return {
                allSuggestions: newSug,
                filteredSug: []
            }
        case 'FILTER_SUGGESTION': 
            return {
                allSuggestions: state.allSuggestions,
                filteredSug: state.allSuggestions.filter(function (item, index) {
                    return item.suggestionId == action.id;
                })
            }
        default: 
            return state;
    }
}

function handleComments (state = {someSuggestions: []},  action) {
    switch (action.type) {
        case 'ADD_ALL_COMMENT':
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