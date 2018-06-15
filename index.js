const app = require('./server/server');
const port = process.env.PORT || 4000;
const key =
  "xsgMbsKGfvziD3z4GkeNYuQ4-3sWuPLDY2JnN9OPaA0.8EJyNKGsT3S5SsC5oJtcqm-N7O6_-lVrM9UnfNYm8zU";
const addressSSL = "xsgMbsKGfvziD3z4GkeNYuQ4-3sWuPLDY2JnN9OPaA0";
app.get(`/.well-known/acme-challenge/${addressSSL}`, function (req, res) {
  res.send(key);
})

app.listen(port, () => {
  console.log('server up');
});