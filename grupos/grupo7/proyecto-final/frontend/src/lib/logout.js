export default function logout() {
  localStorage.removeItem("mymemejs_jwt");
  localStorage.removeItem("mymemejs_username");
  localStorage.removeItem("mymemejs_avatar");
  return true;
}
