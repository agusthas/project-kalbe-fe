import axios from "axios";

const fetcher = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
});

export default fetcher;
