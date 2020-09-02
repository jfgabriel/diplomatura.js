export default function logout() {
  localStorage.removeItem("mymemejs_jwt");
  localStorage.removeItem("mymemejs_username");
  return true;
}
