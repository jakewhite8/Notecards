
export default function authHeader(token: string) {

  if (token) {
    return { 'Authorization': token };
  }
  return {};
}
