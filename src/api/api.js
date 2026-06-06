import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.1.150:8081",
});

export default API;