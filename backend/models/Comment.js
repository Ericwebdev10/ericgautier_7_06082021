//const mysql = require('mysql2');


const Comment = function (comment) {
    this.id = comment.id;
    this.content = comment.content;
    this.post_id = comment.post_id;
    this.user_id = comment.user_id;
};

module.exports = Comment;