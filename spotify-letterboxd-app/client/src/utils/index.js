// https://github.com/bchiang7/spotify-profile/blob/main/client/src/utils/index.js

export const getHashParams = () => {
    const hashParams = {};
  let e;
  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}