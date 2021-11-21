const formatUsername = (username) => {
  return username.includes(".eth")
    ? username
    : username.slice(0, 2) + "..." + username.slice(-4);
};

export default formatUsername;
