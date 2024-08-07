const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const json = JSON.stringify(data);

  const url = "https://us13.api.mailchimp.com/3.0/lists/414a3b28bd";
  const request = https.request(url, option, function (response) {
    console.log(__dirname);
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(json);
  request.end();
});

const option = {
  method: "POST",
  auth: "rohit:0076a8d1d0c0e9b762fe4e83ef2032da-us13",
};

app.post("/failure.html", (req, res) => {
  res.redirect("/");
});
app.listen(3000, () => {
  console.log("server is running on port 3000");
});

// list id : 414a3b28bd.
// api key : 0076a8d1d0c0e9b762fe4e83ef2032da-us13
