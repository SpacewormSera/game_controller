import {FETCHTREE} from './types'

export function fetchTree(){
  return async dispatch => {
    const response = await fetch('http://localhost:3004/api');
    const json = await response.json();
    dispatch({ type: FETCHTREE, payload: json});
  }
}