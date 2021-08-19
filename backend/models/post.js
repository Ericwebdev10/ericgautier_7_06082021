//const mysql = require('mysql2');


const Post = function(post) {
    this.id = post.post_id;
    this.content = post.content;
    this.title = post.title;
    this.image = post.image;
    this.user_id = post.user_id;
};

module.exports = Post;