const routes = require("next-routes")();

routes
  .add("/voting-sytem", "/index")
  .add("/voting-system/registration", "/register")
  .add("/voting-sytem/:address", "/Vote/vote")

module.exports = routes;
