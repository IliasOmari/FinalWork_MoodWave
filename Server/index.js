const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { MongoClient } = require("mongodb");
const cookieParser = require("cookie-parser");
const googleRoute = require("./google");
const client = new MongoClient(process.env.MONGO_URL);
require("./passport");
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: [
      "https://finalwork-moodwave.onrender.com",
      "http://localhost:5173",
    ],
  })
);
app.use(
  session({
    secret: "moodwave",
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", googleRoute);
app.post("/register", async (req, res) => {
  if (!req.body.fullname || !req.body.email || !req.body.password) {
    res.status(400).json({
      status: "Bad Request",
      message: "Missing username, email, password",
    });
    return;
  }
  try {
    await client.connect();
    const colli = client.db("moodwave").collection("users");
    const query = { email: req.body.email };
    const checkExistingUser = await colli.findOne(query);
    if (checkExistingUser) {
      res.status(401).send({
        status: "Bad Request",
        message: "User already exists",
      });
      return;
    }
    const user = {
      fullname: req.body.fullname,
      email: req.body.email,
      password: req.body.password,
      username: null,
      genres: [],
      likes: [],
      playlist: [],
      playlistAI: [],
      music: [],
      profile_image: null,
      created_at: new Date(),
      uuid: uuidv4(),
    };
    await colli.insertOne(user);

    res.status(201).json({
      status: "Saved",
      message: "Your account has been successfully created",
    });
    return;
  } catch (error) {
    res.status(500).json({
      error: "something went wrong",
      value: error,
    });
  } finally {
    await client.close();
  }
});

app.post("/posts", async (req, res) => {
  if (!req.body.mood || !req.body.text || !req.body.playlist) {
    res.status(400).json({
      status: "Bad Request",
      message: "Missing mood, text, playlist",
    });
    return;
  }
  try {
    await client.connect();

    const userColli = client.db("moodwave").collection("users");
    const user = await userColli.findOne({ uuid: req.body.user });

    const playlist = user.playlistAI.find((el) => el.name == req.body.playlist);
    const colli = client.db("moodwave").collection("posts");
    const post = {
      user,
      text: req.body.text,
      mood: req.body.mood,
      playlist,
      created_at: new Date(),
      uuid: uuidv4(),
    };
    await colli.insertOne(post);

    res.status(201).json({
      status: "Saved",
      message: "Post successfully created",
    });
    return;
  } catch (error) {
    res.status(500).json({
      error: "something went wrong",
      value: error,
    });
  } finally {
    await client.close();
  }
});

app.post("/like", async (req, res) => {
  if (!req.body.id || !req.body.userId) {
    res.status(400).json({
      status: "Bad Request",
      message: "Missing Id",
    });
    return;
  }
  try {
    await client.connect();
    const colli = client.db("moodwave").collection("posts");
    const colliUser = client.db("moodwave").collection("users");
    const query = { uuid: req.body.id };
    const post = await colli.findOne(query);
    await colliUser.updateOne(
      { uuid: req.body.userId },
      {
        $push: { likes: post },
      }
    );
    res.status(201).json({
      status: "Saved",
      message: "Post successfully liked",
    });
    return;
  } catch (error) {
    res.status(500).json({
      error: "something went wrong",
      value: error,
    });
  } finally {
    await client.close();
  }
});

app.post("/playlistAI", async (req, res) => {
  if (!req.body.playlist || !req.body.userId) {
    res.status(400).json({
      status: "Bad Request",
      message: "Missing Id",
    });
    return;
  }
  try {
    await client.connect();
    const colliUser = client.db("moodwave").collection("users");
    await colliUser.updateOne(
      { uuid: req.body.userId },
      {
        $push: { playlistAI: req.body.playlist },
      }
    );
    res.status(201).json({
      status: "Saved",
      message: "Playlist successfully saved",
    });
    return;
  } catch (error) {
    res.status(500).json({
      error: "something went wrong",
      value: error,
    });
  } finally {
    await client.close();
  }
});

app.post("/playlist", async (req, res) => {
  if (!req.body.playlist || !req.body.userId) {
    res.status(400).json({
      status: "Bad Request",
      message: "Missing Id",
    });
    return;
  }
  try {
    await client.connect();
    const colliUser = client.db("moodwave").collection("users");
    await colliUser.updateOne(
      { uuid: req.body.userId },
      {
        $push: { playlist: req.body.playlist },
      }
    );
    res.status(201).json({
      status: "Saved",
      message: "Playlist successfully saved",
    });
    return;
  } catch (error) {
    res.status(500).json({
      error: "something went wrong",
      value: error,
    });
  } finally {
    await client.close();
  }
});
app.delete("/like", async (req, res) => {
  if (!req.body.id || !req.body.userId) {
    res.status(400).json({
      status: "Bad Request",
      message: "Missing Id",
    });
    return;
  }
  try {
    await client.connect();
    const colliUser = client.db("moodwave").collection("users");

    await colliUser.updateOne(
      { uuid: req.body.userId },
      {
        $pull: { likes: { uuid: req.body.id } },
      }
    );
    res.status(201).json({
      status: "Saved",
      message: "Post successfully unliked",
    });
    return;
  } catch (error) {
    res.status(500).json({
      error: "something went wrong",
      value: error,
    });
  } finally {
    await client.close();
  }
});
app.delete("/likeMusic", async (req, res) => {
  if (!req.body.musicId || !req.body.userId) {
    res.status(400).json({
      status: "Bad Request",
      message: "Missing Id",
    });
    return;
  }
  try {
    await client.connect();
    const colliUser = client.db("moodwave").collection("users");

    await colliUser.updateOne(
      { uuid: req.body.userId },
      {
        $pull: { music: { id: req.body.musicId } },
      }
    );
    res.status(201).json({
      status: "Saved",
      message: "Music successfully unliked",
    });
    return;
  } catch (error) {
    res.status(500).json({
      error: "something went wrong",
      value: error,
    });
  } finally {
    await client.close();
  }
});

app.delete("/playlist", async (req, res) => {
  if (!req.body.name || !req.body.userId || !req.body.filter) {
    res.status(400).json({
      status: "Bad Request",
      message: "Missing data",
    });
    return;
  }
  try {
    await client.connect();
    const colliUser = client.db("moodwave").collection("users");
    if (req.body.filter == "AI") {
      await colliUser.updateOne(
        { uuid: req.body.userId },
        {
          $pull: { playlistAI: { name: req.body.name } },
        }
      );
      res.status(201).json({
        status: "Saved",
        message: "Playlist successfully unliked",
      });
      return;
    } else {
      await colliUser.updateOne(
        { uuid: req.body.userId },
        {
          $pull: { playlist: { name: req.body.name } },
        }
      );
      res.status(201).json({
        status: "Saved",
        message: "Playlist successfully unliked",
      });
    }
    return;
  } catch (error) {
    res.status(500).json({
      error: "something went wrong",
      value: error,
    });
  } finally {
    await client.close();
  }
});

app.put("/playlist", async (req, res) => {
  if (
    !req.body.name ||
    !req.body.userId ||
    !req.body.filter ||
    !req.body.newName
  ) {
    res.status(400).json({
      status: "Bad Request",
      message: "Missing data",
    });
    return;
  }
  try {
    await client.connect();
    const colliUser = client.db("moodwave").collection("users");
    if (req.body.filter == "AI") {
      await colliUser.findOneAndUpdate(
        { uuid: req.body.userId },
        { $set: { "playlistAI.$[element].name": req.body.newName } },
        { arrayFilters: [{ "element.name": req.body.name }] }
      );
      res.status(201).json({
        status: "Saved",
        message: "Playlist successfully changed",
      });
      return;
    } else {
      await colliUser.findOneAndUpdate(
        { uuid: req.body.userId },
        { $set: { "playlist.$[element].name": req.body.newName } },
        { arrayFilters: [{ "element.name": req.body.name }] }
      );
      res.status(201).json({
        status: "Saved",
        message: "Playlist successfully changed",
      });
    }
    return;
  } catch (error) {
    res.status(500).json({
      error: "something went wrong",
      value: error,
    });
  } finally {
    await client.close();
  }
});
app.post("/likeMusic", async (req, res) => {
  console.log(req.body);
  if (!req.body.userId || !req.body.music) {
    res.status(400).json({
      status: "Bad Request",
      message: "Missing Id",
    });
    return;
  }
  try {
    await client.connect();
    const colliUser = client.db("moodwave").collection("users");
    await colliUser.updateOne(
      { uuid: req.body.userId },
      {
        $push: { music: req.body.music },
      }
    );
    res.status(201).json({
      status: "Saved",
      message: "Music successfully liked",
    });
    return;
  } catch (error) {
    res.status(500).json({
      error: "something went wrong",
      value: error,
    });
  } finally {
    await client.close();
  }
});
app.get("/posts", async (req, res) => {
  try {
    await client.connect();
    const colli = client.db("moodwave").collection("posts");

    const posts = await colli.find({}).toArray();
    res.status(201).json({
      data: posts,
    });
    return;
  } catch (error) {
    res.status(500).json({
      error: "something went wrong",
      value: error,
    });
  } finally {
    await client.close();
  }
});

app.put("/updateProfile", async (req, res) => {
  if (!req.body.username || !req.body.image || req.body.genres.length === 0) {
    res.status(400).json({
      status: "Bad Request",
      message: "Missing fields",
    });
    return;
  }
  try {
    await client.connect();
    const colli = client.db("moodwave").collection("users");

    if (req.body.id) {
      await colli.updateOne(
        { uuid: req.body.id },
        {
          $set: {
            username: req.body.username,
            genres: req.body.genres,
            profile_image: req.body.image,
          },
        }
      );
      res.status(201).json({
        status: "Saved",
        message: "Your account has been successfully updated",
      });
      return;
    }

    await colli.updateOne(
      { uuid: req.user.uuid },
      {
        $set: {
          username: req.body.username,
          genres: req.body.genres,
          profile_image: req.body.image,
        },
      }
    );

    res.status(201).json({
      status: "Saved",
      message: "Your account has been successfully updated",
    });

    return;
  } catch (error) {
    res.status(500).json({
      error: "something went wrong",
      value: error,
    });
  } finally {
    await client.close();
  }
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      status: "Bad Request",
      message: "Missing email, password",
    });
    return;
  }
  try {
    await client.connect();
    const loginuser = {
      email: req.body.email,
      password: req.body.password,
    };

    const colli = client.db("moodwave").collection("users");
    const query = {
      email: loginuser.email,
    };
    const user = await colli.findOne(query);

    if (!user) {
      res.status(400).send({
        status: "Bad Request",
        message: "No account with this email! Make sure you register first.",
      });
      return;
    }
    if (!user.password) {
      res.status(400).send({
        status: "Bad Request",
        message: "Please connect with google option",
      });
      return;
    }
    if (user.password !== loginuser.password) {
      res.status(400).send({
        status: "Bad Request",
        message: "Incorrect password for this email",
      });
      return;
    }

    res.status(200).send({
      status: "Connected",
      message: "You are successfully logged in!",
      user: user.uuid,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: "An error has occured!",
      value: error,
    });
  } finally {
    await client.close();
  }
});

app.post("/profile", async (req, res) => {
  if (!req.body.id) {
    res.status(400).send({
      status: "Bad Request",
      message: "Missing id",
    });
    return;
  }
  try {
    await client.connect();
    const colli = client.db("moodwave").collection("users");
    const query = {
      uuid: req.body.id,
    };
    const user = await colli.findOne(query);
    if (!user) {
      res.status(400).send({
        status: "Bad Request",
        message: "Acount doesn't exist",
      });
      return;
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({
      error: "An error has occured!",
      value: error,
    });
  } finally {
    await client.close();
  }
});

app.listen(process.env.PORT, () => console.log("Server is running"));
