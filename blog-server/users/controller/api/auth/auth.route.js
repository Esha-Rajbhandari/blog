const router = require("express").Router();
const query = require("../../../query/user.query");
const { verifyHash } = require("../../utils/pwdHash");
const { generateToken } = require("../../utils/jwt.controller");
const { USER_TABLE } = require("../../../model/table");

router.route("/login").post((req, res, next) => {
  query.findSingleData(
    USER_TABLE,
    "username",
    req.body.username,
    (err, result) => {
      let ress;
      if (err) {
        res.json({
          success: false,
          message: "Incorrect username",
          status: 403
        });
      } else {
        if (result.length) {
          ress = result.filter(user => {
            return verifyHash(req.body.password, user.password);
          });
        }
        if (ress.length) {
          res.json({
            result: ress,
            token: generateToken(ress[0].id)
          });
        } else {
          res.json({
            result: "error",
            message: "Invalid credentials",
            status: 400
          });
        }
      }
    }
  );
});

module.exports = router;
