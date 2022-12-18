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
  // Handling PostgreSQL error. An Error object will have a .name and .message field
  if (error.name === "error") {
    console.log(`The error name is ${error.name}. This is a PostgreSQL error`);
    console.log(
      `The error name is ${error.name}. This is a PostgreSQL error. Error message: ${error.message}`,
    );

    return response.status(400).json({ message: error.message });
  }

  console.log("DIFFERENT ERROR");
  console.log(error);

  return response.status(400).json({ error: error.message });
};

module.exports = errorHandler;
