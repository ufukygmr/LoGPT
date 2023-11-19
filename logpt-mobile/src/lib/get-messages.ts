import axios from "axios";
import { generateHeaders, requestUrl } from "./axios-utils";

export async function getMessages(token: string, sessionId: string) {
  const response = await axios.get(
    `${requestUrl}/history/${sessionId}`,
    generateHeaders(token)
  );
  return response.data;
}
