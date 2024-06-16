const bcrypt = require("bcrypt");

exports.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(), null);
};


exports.validPassword = function (userInputPassword,passwordInDB) {
    const temp = bcrypt.compareSync(userInputPassword, passwordInDB);
    return temp;
  };