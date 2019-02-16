export const getCookie = (cookieName) => {
  const cookie = document.cookie.match(`(^|;)\\s*${cookieName}\\s*=\\s*([^;]+)`);
  return cookie ? cookie.pop() : '';
};

export const deleteCookie = (cookieName) => {
  document.cookie = `${cookieName}=;`;
}

export default getCookie;
