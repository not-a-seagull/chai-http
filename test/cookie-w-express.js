const cookieParser = require("cookie-parser");
const express = require("express");

// setting up an app to test with
var app = express();
app.use(cookieParser());

app.post("/set-cookie", function(req, res) {
  res.cookie("myCookie", "test_value", { maxAge: 8640000 });
  res.redirect("/");
});

app.get("/", function(req, res) {
  const text = `This is a test\nCookie is ${req.cookies.myCookie}`;
  res.type("text/plain");
  res.send(text);
});

describe("Testing express w/ cookies and chai", function() {
  let server;
  it("Set up server", function() { server = app; });
  it("Run request", function(done) {
    const agent = chai.request.agent(server);
    agent.post("/set-cookie").send({}).end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.redirect;
      expect(res).to.have.cookie("myCookie");
      done();
    });
  });
});
