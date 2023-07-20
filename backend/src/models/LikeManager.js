// représente la table

const AbstractManager = require("./AbstractManager");

class likeManager extends AbstractManager {
  constructor() {
    super({ table: "post_like" });
  }

  insert(like) {
    return this.database.query(
      `INSERT INTO ${this.table} (post_id, user_id) VALUES(?,?)`,
      [like.post_id, like.user_id]
    );
  }

  countLikeByUser(id) {
    return this.database.query(
      `SELECT COUNT(user_id) as like_count 
    FROM post_like
    WHERE post_like.user_id = ?`,
      [id]
    );
  }

  findAllByUser(id) {
    return this.database.query(
      `select post_like.id, post_id, user_id  
      from ${this.table} 
      join user on user.id = user_id
      WHERE user.id = ?`,
      [id]
    );
  }
}

module.exports = likeManager;
