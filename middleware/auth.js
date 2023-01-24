const jwt = require("jsonwebtoken");

module.exports.isAdmin = (req, res, next) => {
  // custom middleware that verifies property set manually in the db to authorize access
  try {
    const token = req.headers.authorization;
    const decodedJwt = jwt.verify(token, process.env.SECRET);

    if (decodedJwt.isAdmin !== true) {
      res.status(401).json({
        status: "error",
        error: "unauthorized access",
        message: "user is not an admin",
      });
    } else {
      console.log("authorized and proceeding to post");
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({
      status: "error",
      error: "unauthorized access, AdminJwt not present",
      message: err.message,
    });
  }
};
