require("dotenv").config();
const connect = require("./configs/db")
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 8005;

const Blog = require("./models/blog");

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");

const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

const app = express();


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, async () => {

  try {

    await connect();
    console.log(`Server Started at PORT:${PORT}`)

  } catch (error) {
    console.log("error : ", error);
  }
});
