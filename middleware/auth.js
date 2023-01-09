const jwt = require("jsonwebtoken");
/* 

module.exports.cookieTest = (req, res, next) => {
  const jwtTokenCookie = req.cookies.jwtToken;
  const csrfCookie = req.cookies.csrfToken;
  const decodedJwt = jwt.verify(jwtTokenCookie, process.env.SECRET);
  //console.log(req.cookies);
  console.log(`csrfcookie ~~~~ ${csrfCookie}`);
  console.log(decodedJwt);
};

module.exports.isAuth = (req, res, next) => {
  const jwtTokenCookie = req.cookies.jwtToken;
  const csrfCookie = req.cookies.csrfToken;
  const decodedJwt = jwt.verify(jwtTokenCookie, process.env.SECRET);
  if (decodedJwt.csrfToken !== csrfCookie) {
    console.log("invalid csrf, unauthorized");
    next();
  } else {
    console.log("tokens match");
    next();
  }
};
*/

module.exports.isAdmin = (req, res, next) => {
  // custom middleware that verifies property set manually in the db to authorize access
  try {
    console.log(req.cookies);
    const jwtTokenCookie = req.cookies.adminJwtToken;
    const decodedJwt = jwt.verify(jwtTokenCookie, process.env.SECRET);
    console.log(decodedJwt);

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
