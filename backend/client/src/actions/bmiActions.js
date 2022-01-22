import axios from "axios";
import setAuthToken from "../utils/setAuthToken";


import {
 GET_ERRORS
} from "../actions/types";


export var ud = {};
export const get_all = data => {
  return data;
};

export const updateBMI = (userData, history) => dispatch => {
  axios
    .post("/api/updBMI", userData.body, {params:userData.params})
    .then(res => {
      console.log("updated");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteBMI = (userData, history) => dispatch => {
  console.log(userData);
  axios
    .delete("/api/delBMI", {params:userData})
    .then(res => history.push("/BMI"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getAllBMIs = (userData, history) => {
  return function (dispatch) {
    return axios
    .get("/api/getAllBMIs", {params:userData})
    .then(res => {
      return res.data;
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
  }
};

export const getFilteredBMIs = (userData, history) => {
  return function (dispatch) {
    return axios
    .get("/api/getFilteredBMIs", {params:userData})
    .then(res => {
      return res.data;
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
  }
};


export const registerBMI = (userData, history) => dispatch => {
  console.log(userData);
  axios
    .post("/api/newBMI", userData.body, {params:userData.params})
    .then(res => {
      console.log(res.data);
      //history.push("/features"
}) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
//
