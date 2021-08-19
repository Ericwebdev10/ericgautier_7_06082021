const Post = require("../models/post");
const mySqlConnection = require("../middleware/mysql-connection");
require('dotenv').config();
const fs = require('fs'); 


exports.createPost = (req, res, next) => {
    let image = "";

    if (req.file) {
        image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    }
    const title = req.body.title;
    const content = req.body.content;
    const post = new Post({
        user_id: req.body.user_id,
        title: title,
        content: content,
        image: image
    });
    if (!title && !content && !image) {
        return res.status(400).json({ message: "Required field" });
    } else {

        mySqlConnection.query(`INSERT INTO post SET ?`, post, (error, result) => {

            if (error) {
                return res.status(400).json({ error: error });
            }
            return res.status(201).json({ message: "Post created" });
        });
    }
};


exports.modifyPost = (req, res, next) => {
    let image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;

    if (req.file) {
        image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    }
    mySqlConnection.query(`SELECT * FROM post WHERE id=?`, req.params.id, (error, rows, fields) => {
        if (error) {
            return res.status(500).json({ error: "mysql" });
        } else {
            if (rows[0].image) {
                const filename = rows[0].image.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {
                    mySqlConnection.query(`UPDATE post SET content = ?, title = ?, image= ?  WHERE id = ?`, [req.body.content, req.body.title, image, req.params.id], (error, result) => {
                        if (error) {
                            return res.status(400).json({ error: "Post cannot be modified" });
                        }
                        return res.status(200).json(result);
                    });
                });
            } else {
                mySqlConnection.query(`UPDATE post SET content = ?, title = ?, WHERE id = ?`, [req.body.content, req.body.title, image, req.params.id], (error, result) => {
                    if (error) {
                        return res.status(400).json({ error: "Post cannot be modified" });
                    }
                    return res.status(200).json(result);
                });

            }
        }
    });
};





exports.deletePost = (req, res, next) => {
    mySqlConnection.query(`SELECT * FROM post WHERE id=?`, req.params.id, (error, rows, fields) => {
        if (error) {
            return res.status(500).json({ error: "mysql" });
        } else {
            if (rows[0].image) {
                const filename = rows[0].image.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {

                    mySqlConnection.query(`DELETE FROM post WHERE id=?`, req.params.id, (error, rows, fields) => {
                        if (error) {
                            return res.status(500).json({ error: "impossible de supprimer" });
                        } else {

                            return res.status(200).json({ message: "Message supprimé !" });
                        };
                    });
                });
            } else {
                mySqlConnection.query(`DELETE FROM post WHERE id=?`, req.params.id, (error, rows, fields) => {
                    if (error) {
                        return res.status(500).json({ error: "impossible de supprimer" });
                    } else {

                        return res.status(200).json({ message: "Message supprimé !" });
                    };
                });
            }

        }
    });

};



//tout les posts
exports.getAllPost = (req, res, next) => {

    mySqlConnection.query('SELECT post.id, content, image, title, user_id, dateCreate, isAdmin, username  FROM post INNER JOIN user ON user.id = post.user_id ORDER BY dateCreate DESC', (error, result) => {
        if (error) {
            return res.status(400).json({ error: "impossible d'afficher tous les post" });
        }
        return res.status(200).json(result);
    });
};
// un post
exports.getOnePost = (req, res, next) => {


    mySqlConnection.query('SELECT post.id, content, image, title, user_id, dateCreate, isAdmin, username FROM post INNER JOIN user ON user.id = post.user_id WHERE post.id=? ', req.params.id, (error, result) => {
        if (error) {
            return res.status(400).json({ error: "impossible d'afficher un  post" });
        }
        return res.status(200).json(result);
    });
};