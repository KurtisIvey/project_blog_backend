function loginErrorHandler(err) {
  let errors = { email: "", password: "" };
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }
  if (err.code === 11000) {
    errors.email = "that email is already registered";
  }

  return errors;
}

function postErrorHandler(err) {
  let error;
  if (
    err.message ===
    "Post validation failed: textContent: Path `textContent` is required."
  ) {
    error = "Post content field cannot be empty";
  }
  return error;
}

function commentErrorHandler(err) {
  let error;
  if (err.message === "jwt must be provided") {
    error = "No user is currently logged in";
  }
  if (err.message === "invalid token") {
    error = "invalid token authorization";
  }
  return error;
}

module.exports = { loginErrorHandler, postErrorHandler, commentErrorHandler };
