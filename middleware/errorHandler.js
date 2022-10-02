module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Coś się zepsuło, ale już to sprawdzamy... zapewne ¯\_(ツ)_/¯"});
  next()
}