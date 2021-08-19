const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const mySqlConnection = require("../middleware/mysql-connection");
const crypt = require('crypto-js'); //https://www.npmjs.com/package/crypto-js
require('dotenv').config(); // needed?

//https://www.npmjs.com/package/crypto-js
//crypto email + bcrypt password
exports.signup = (req, res, next) => {
    const cryptoEmail = crypt.MD5(req.body.email).toString();
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                username: req.body.username,
                email: cryptoEmail,
                password: hash,
                isAdmin: 0,
            });
            mySqlConnection.query('INSERT INTO user SET ?', user, (err, result, field) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json("erreur");
                }
                return res.status(201).json({ message: 'account created' }, );
            });
        })
        .catch(error => res.status(500).json({ error }));
};


exports.login = async(req, res, next) => {
    const cryptoEmail = crypt.MD5(req.body.email).toString();

    if (cryptoEmail && req.body.password) {
        mySqlConnection.query('SELECT * FROM user WHERE email= ?', cryptoEmail, (error, results, fields) => {
            if (results.length > 0) {
                bcrypt.compare(req.body.password, results[0].password)
                    .then((valid) => { 
                        if (!valid) {
                            res.status(401).json({ message: 'Incorrect password' });
                        } else {
                            console.log(cryptoEmail, "connected");
                            //if admin
                            if (results[0].isAdmin === 1) {
                                status = 'administrateur';
                            } else {
                                status = 'membre';
                            }
                            res.status(200).json({
                                userId: results[0].id,
                                email: results[0].email,
                                username: results[0].username,
                                isAdmin: results[0].isAdmin,
                                token: jwt.sign({ userId: results[0].id, username: results[0].username, isAdmin: results[0].isAdmin }, process.env.DB_TOKEN, { expiresIn: '24h' })
                            });

                        }
                    });
            } else {
                res.status(401).json({ message: 'Unknow user / password' });
            }
        });
    } else {
        res.status(500).json({ message: "enter user  / password" });
    }
};



exports.deleteUser = (req, res, next) => {
    let user_id = req.params.id;
    mySqlConnection.query(`DELETE FROM user WHERE id = ?`, user_id, (error, result) => {
        if (error) return res.status(400).json({ error: "Can not delete user" });
        return res.status(200).json(result);
    });
};

exports.getAllUser = (req, res, next) => {
    conn.query('SELECT id, username, email FROM user ', (error, result) => {
        if (error) {
            return res
                .status(400)
                .json({ error: "impossible d'afficher les listes des membres" });
        }
        return res.status(200).json(result);
    });
};;

exports.getOneUser = (req, res, next) => {
    mySqlConnection.query('SELECT * FROM user WHERE id =?', req.params.id, (error, result) => {
        if (error) {
            return res
                .status(400)
                .json({ error: "Can not get user" });
        }
        return res.status(200).json(result);
    });
};


exports.modifyUser = (req, res, next) => {
    const cryptoEmail = crypt.MD5(req.body.email).toString();
    const email = cryptoEmail;
    const id = req.params.id;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(400).json({ message: "all fields required" });
    } else {
        bcrypt.hash(password, 10)
            .then((hash) => {
                password = hash;
                mySqlConnection.query(
                    `UPDATE user SET email='${email}', password='${password}', isAdmin=${0}  WHERE id=?`, id, (error, results, fields) => {
                        if (error) {
                            return res.status(400).json(error);
                        }
                        return res.status(200).json({ message: 'User updated !' });
                    }
                );
            })
            .catch(error => res.status(500).json({ error }));
    }
};