// Very important point: error handler must have 4 parameters. I was missing the 'next' parameter
// Gave me errors because the middleware was not running
const errorHandler = async (error, request, response, next) => {
  console.log("IN ERROR HANDLER");

  if (error.name === "SyntaxError") {
    console.log(`The error type is ${error.name}`);
    console.log("You have a syntax error");
    return response
      .status(error.status)
      .json({ errorType: error.name, errorMessage: error.message });
  }
  // Handling PostgreSQL error
  if (error.name === "error") {
    console.log(`The error type is ${error.name}`);
    console.log(error.detail);

    return response.status(400).json({ errorType: error.detail });
  }
  console.log("DIFFERENT ERROR");
  return response.status(400).json({ error });
};

module.exports = errorHandler;
