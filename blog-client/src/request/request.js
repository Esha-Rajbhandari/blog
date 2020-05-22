import axios from "axios";
import { REGISTER_URL } from "../utils/config";
import swal from "@sweetalert/with-react";

//post request
const postRequest = (url, data) => {
  axios.post(url, data).then(data => console.log(data));
};

const postLoginRequest = (url, data, callback) => {
  axios.post(url, data).then(result => {
    if (typeof result.data.result === "object") {
      localStorage.setItem("token", result.data.token);
      callback();
    } else {
      swal("Invalid credentials", "", "warning");
    }
  });
};

const getRequest = (url, userData) => {
  axios.get(url).then(data => {
    if (data.data.length) {
      swal("User already exists", "", "warning");
    } else {
      postRequest(REGISTER_URL, userData);
    }
  });
};

const getPostRequest = (url, callback) => {
  axios
    .get(url, {
      headers: {
        authorization: localStorage.getItem("token")
      }
    })
    .then(data => {
      callback(data.data);
    });
};

const getBlogRequest = (url, callback) => {
  axios
    .get(url, {
      headers: {
        authorization: localStorage.getItem("token")
      }
    })
    .then(data => callback(data.data.result, data.data.action));
};

const postBlogRequest = (url, data) => {
  axios
    .post(url, data, {
      headers: {
        authorization: localStorage.getItem("token")
      }
    })
    .then(data => console.log(data));
};

const getBlogPostRequest = (url, callback) => {
  axios
    .get(url, {
      headers: {
        authorization: localStorage.getItem("token")
      }
    })
    .then(data => callback(data.data.result));
};

const deletePostRequest = url => {
  axios
    .delete(url, {
      headers: {
        authorization: localStorage.getItem("token")
      }
    })
    .then(data => console.log('pppp',data));
};

export {
  postRequest,
  postLoginRequest,
  getRequest,
  getPostRequest,
  getBlogRequest,
  postBlogRequest,
  getBlogPostRequest,
  deletePostRequest
};
