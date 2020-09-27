import imagen from "../img/avatar.jpg";

export const AVATAR_DEFAULT = imagen;

export default function getUserAvatar() {
  let avatar = localStorage.getItem("mymemejs_avatar");
  // si no posee un avatar asignado, le asigno el por defecto
  if (!avatar) avatar = AVATAR_DEFAULT;
  return avatar;
}
