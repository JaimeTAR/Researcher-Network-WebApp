import axios from "axios";
import { API_URL } from "../utils/constants";

export const request = async (
  method: "get" | "post" | "put" | "delete",
  url: string,
  data?: any,
) => {
  try {
    const response = await axios({
      method,
      url: API_URL + url,
      data,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(
      `Error performing ${method.toUpperCase()} request to ${url}:`,
      error,
    );
    return null; // or return an empty array depending on the operation
  }
};
