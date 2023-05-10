const errorFormatter = (error) => error.msg;
// not error.message because we are using express-validator

module.exports = errorFormatter;
