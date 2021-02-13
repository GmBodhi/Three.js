const app = require('express')();


app.get('/', (req, res) => res.send('Three.js beta bot'));

module.exports = () => {
  app.listen(4000);
}