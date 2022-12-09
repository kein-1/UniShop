const tokenExtractor = async (request, response, next) => {
  const { authorization } = request.headers;
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    const token = authorization.substring(7);
    request.userToken = token;
  }
  return next();
};

module.exports = tokenExtractor;
