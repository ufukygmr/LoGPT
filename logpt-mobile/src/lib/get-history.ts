import axios from "axios";
import { generateHeaders, requestUrl } from "./axios-utils";

export async function getHistory(token: string) {
  const response = await axios.get(
    `${requestUrl}/history`,
    generateHeaders(token)
  );
  return response.data;
}
