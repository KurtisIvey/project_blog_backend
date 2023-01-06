function errorHandler(err) {
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

module.exports = { errorHandler };
