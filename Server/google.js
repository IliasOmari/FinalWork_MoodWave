const router = require("express").Router();
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGO_URL);

const passport = require("passport");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://finalwork-moodwave.onrender.com/login",
    successRedirect: "https://finalwork-moodwave.onrender.com/profile",
  })
);
router.get("/google/failed", (req, res) => {
  res.send(401).json({
    message: "Oops problem",
  });
});

router.get("/google/success", async (req, res) => {
  if (req.user) {
    await client.connect();
    const colli = client.db("moodwave").collection("users");
    const query = { uuid: req.user.uuid };
    const checkExistingUser = await colli.findOne(query);
    await client.close();
    return res.status(200).json(checkExistingUser);
  } else {
    return res
      .status(401)
      .json({ status: "Bad Request", message: "NOT AUTHORIZED" });
  }
});

router.get("/logout", (req, res) => {
  req.logOut(() => {
    res.redirect("https://finalwork-moodwave.onrender.com");
  });
});

module.exports = router;
