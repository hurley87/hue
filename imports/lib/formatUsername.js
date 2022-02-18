const formatUsername = (username) => {
  if (username) {
    return username.includes(".eth")
      ? username
      : username.slice(0, 2) + "..." + username.slice(-4);
  } else {
    return;
    ("...");
  }
};

export default formatUsername;
