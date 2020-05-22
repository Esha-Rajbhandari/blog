const router = require("express").Router();
const query = require("../../../query/user.query");
const multer = require("multer");
const path = require("path");
const { USER_TABLE, POSTS_TABLE } = require("../../../model/table");

router
  .route("/register")
  .get((req, res, next) => {
    const data = query.findSingleData(USER_TABLE, "email", req.params.email);
    res.send(data);
  })
  .post((req, res, next) => {
    query.insertData(USER_TABLE, req.body.user);
    res.end("Data inserted");
  });

router.route("/register/:email").get((req, res, next) => {
  query.findSingleData(
    USER_TABLE,
    "email",
    req.params.email,
    (err, results) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.send(results);
      }
    }
  );
});

router.route("/dashboard").get((req, res, next) => {
  query.findAllData(POSTS_TABLE, (err, result) => {
    if (err) {
      res.json({
        status: 400
      });
    } else {
      res.send(result);
    }
  });
});

router.route("/posts").get((req, res, next) => {
  if (!req.query.id) {
    query.findSingleData("blog_posts", "user_id", req.id, (err, result) => {
      if (err) {
        res.json({
          status: 400
        });
      } else {
        if (req.query.action !== "") {
          res.json({
            result: result,
            action: req.query
          });
        }
      }
    });
  } else {
    query.findSingleData("blog_posts", "id", req.query.id, (err, result) => {
      if (err) {
        res.json({
          status: 400
        });
      } else {
        res.json({
          result: result[0],
          action: req.query
        });
      }
    });
  }
});

router.route("/posts").post((req, res, next) => {
  //create disk storage
  let storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "./users/public/uploads");
    },
    filename: function(req, file, cb) {
      cb(
        null,
        Date.now() + "-" + file.fieldname + path.extname(file.originalname)
      );
    }
  });

  //multer upload
  let upload = multer({
    storage: storage
  }).single("file");

  if (req.query.action === "add") {
    if (req.query.id) {
      query.updateData(POSTS_TABLE, req.body, "id", req.query.id);
      res.send("Data updated");
    } else {
      upload(req, res, err => {
        if (err) {
          console.log(err);
          res.json({
            status: 404
          });
        } else {
          console.log(req.body);
          req.body.user_id = parseInt(req.id);
          // console.log(req.file);
          query.insertData(POSTS_TABLE, req.body);
          res.send("Data inserted");
        }
      });
    }
  }
});

router.route("/posts").delete((req, res, next) => {
  if (req.query.action === "remove") {
    if (req.query.id) {
      query.deleteData(POSTS_TABLE, "id", req.query.id);
      req.query = {};
      res.redirect("/posts");
    }
  }
});

module.exports = router;
