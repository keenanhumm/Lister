const app = require('./server/server');
const port = process.env.PORT || 4000;
const key =
  "2kUG40p4vGrd0O77D-ov8hDySjFJT54wH9UXc7SAXdY.8EJyNKGsT3S5SsC5oJtcqm-N7O6_-lVrM9UnfNYm8zU";

app.get(`/.well-known/acme-challenge/${key}`, function (req, res) {
  res.send(key);
})

app.listen(port, () => {
  console.log('server up');
});