const passwordSchema = require("../models/passwordschema");

// check password according expected schema
module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.status(400).json({error : "Password must have : "
            + passwordSchema.validate(req.body.password, {list : true})
        });
//        console.log("Password not valid"); //debug to delete
    } else {
        next();
    }
};

//https://openclassrooms.workplace.com/search/top?q=password
//https://openclassrooms.workplace.com/hashtag/P6/?__gid__=1010035762678296

/* 
passwordSchema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(1)                                // Must have at least 1 digit
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(["Passw0rd", "Password123"]); // Blacklist these values
 */