module.exports = (req, res, next) => {
    res.locals.title = res.locals.title || 'Default Title';
    next();
  };