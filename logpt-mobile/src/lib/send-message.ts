import axios from "axios";
import { generateHeaders, requestUrl } from "./axios-utils";

export async function sendMessage(
  token: string,
  sessionId: string,
  content: string
) {
  const response = await axios.post(
    `${requestUrl}/send`,
    {
      sessionID: sessionId,
      content:
        "title: System Errors\nlogfile: test_log1\ncontent: get me all of the ssh errors of test_log1",
      time: new Date(),
    },
    generateHeaders(token)
  );
  return response.data;
}
