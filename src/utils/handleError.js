module.exports.handleError = (res) => {
  return (err) => {
    res.status(404).json({ success: false, message: err.message })
  }
};
