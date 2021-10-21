export default function authHeader() {
  const data = JSON.parse(localStorage.getItem("data"));

  if (data && data.token) {
    return { "x-access-token": data.token };
  } else {
    return {};
  }
}
