import axios from "axios";
import { generateHeaders, requestUrl } from "./axios-utils";

export async function sendMessage(
  token: string,
  sessionId: string,
  content: string
) {
  const response = await axios.post(
    `${requestUrl}/send`,
    { sessionID: sessionId, content: content, time: new Date() },
    generateHeaders(token)
  );
  console.log("SEND RESPONSE", response);
  return response.data;
}
