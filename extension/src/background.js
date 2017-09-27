import axios from 'axios';
import * as requests from './requests';

function handleMessages(request, sender, sendResponse) {
  chrome.cookies.get({
    url: 'https://review.udacity.com',
    name: '_jwt',
  }, (jwt) => {
    const axiosInstance = axios.create({
      baseURL: 'https://urplus.herokuapp.com/',
      headers: { Authorization: jwt.value },
    });
    requests[request.func](request.data, axiosInstance, sendResponse);
  });
  return true;
}

chrome.runtime.onMessage.addListener(handleMessages);
