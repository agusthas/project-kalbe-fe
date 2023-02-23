import axios from "axios";

const fetcher = axios.create({
  baseURL: "http://localhost:3001",
});

export default fetcher;
