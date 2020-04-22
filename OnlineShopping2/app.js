var createError = require("http-errors")
var express = require("express")
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")

const mongoose = require("mongoose")
/*var url =
  "mongodb+srv://vamshi:rGBgBprJbzNiIKBv@development-i76n3.mongodb.net/test?retryWrites=true&w=majority";*/
var url = "mongodb://localhost:27017/OnlineShopping"
mongoose.Promise = global.Promise
// Connecting to the database
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connected to the database")
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now...", err)
    process.exit()
  })

console.log("started main code")

var indexRouter = require("./routes/index.route")
var sellerPageRouter = require("./routes/sellerpage.route")
var usersRouter = require("./routes/user.route")
var productsRouter = require("./routes/product.route")
var sellersRouter = require("./routes/seller.route")
var app = express()

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "hbs")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

// page routers
app.use("/", indexRouter)
app.use("/seller", sellerPageRouter)
// api routers
app.use("api/users", usersRouter)
app.use("api/products", productsRouter)
app.use("api/sellers", sellersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

module.exports = app
