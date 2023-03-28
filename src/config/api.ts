import axios from "axios";

export const api = axios.create({
  baseURL: "https://r8so6p8zya.execute-api.sa-east-1.amazonaws.com/v1/",
});
