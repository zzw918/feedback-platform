
export const ADD_CUR_USER = 'ADD_CUR_USER'
export const ADD_ALL_PRODUCT = 'ADD_ALL_PRODUCT'
export const ADD_ALL_SUGGESTIONS = 'ADD_ALL_SUGGESTIONS'
export const FILTER_PRO = 'FILTER_PRO'
export const ADD_ALL_COMMENT = 'ADD_ALL_COMMENT'
export const UPDATE_CUR_PRO = 'UPDATE_CUR_PRO'

export function addCurUser (name) {
	return {
		type: ADD_CUR_USER,
		text: name
	}
}	

export function addProducts (products) {
	return {
		type: ADD_ALL_PRODUCT,
		data: products
	}
}

export function addComment (comments) {
	return {
		type: ADD_ALL_COMMENT,
		data: comments
	}
}


export function addSuggestions (suggestions) {
	return {
		type: ADD_ALL_SUGGESTIONS,
		data: suggestions
	}
}

export function filterPro (name) {
	return {
		type: FILTER_PRO,
		name: name
	}
}

export function updateCurName (name) {
	return {
		type: UPDATE_CUR_PRO,
		name: name
	}
}	
