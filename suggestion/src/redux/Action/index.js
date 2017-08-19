export const ADD_CUR_USER = 'ADD_CUR_USER'
export const ADD_ALL_PRODUCT = 'ADD_ALL_PRODUCT'
export const ADD_ALL_SUGGESTIONS = 'ADD_ALL_SUGGESTIONS'
export const FILTER_SUGGESTION = 'FILTER_SUGGESTION'
export const ADD_ALL_COMMENT = 'ADD_ALL_COMMENT'

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

export function addAllSuggestions (suggestions) {
	return {
		type: ADD_ALL_SUGGESTIONS,
		data: suggestions
	}
}

export function filterSuggestion (id) {
	return {
		type: FILTER_SUGGESTION,
		id: id
	}
}

export function addComment (comments) {
	return {
		type: ADD_ALL_COMMENT,
		data: comments
	}
}
