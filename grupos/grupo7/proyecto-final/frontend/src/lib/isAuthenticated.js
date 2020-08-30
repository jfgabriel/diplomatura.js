export default function isAuthenticated() {
  return localStorage.getItem("mymemejs_username");
}
