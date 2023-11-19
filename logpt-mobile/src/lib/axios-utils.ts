export const requestUrl = "http://localhost:8000/message";

export function generateHeaders(token: string) {
  return { headers: { Authorization: `Bearer ${token}` } };
}
