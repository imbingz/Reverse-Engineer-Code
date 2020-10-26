//Import bcrypt package for password hashing (using bcryptjs version may cause errors on Windows machine sometimes)

const bcrypt = require("bcryptjs");


//Create User Model and export the module

module.exports = (sequelize, DataTypes) => {
    //Create a User model 
    const User = sequelize.define("User", {
        //Set email attribute. check for valid email format and email cannot be null
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        //Password cannot be null 
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
  
    //Create a custom method for User Model. 
    // Check if the unhashed password entered by the user matches any hashed password stored in the database 
    User.prototype.validPassword = function(password) {
        //bcrypt.compareSync() returns true or false 
        return bcrypt.compareSync(password, this.password);
    };
    
    //Hooks (also known as callbacks or lifecycle events), are functions which are called before and after calls in sequelize are executed. They run during varoiud phases of the User Model lifecycle
    //Here before a user is created, hooks will automatically hash users password
    User.addHook("beforeCreate", user => {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });
    
    //after hashing password, return User Model
    return User;
  
};
