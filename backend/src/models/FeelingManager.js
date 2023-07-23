// représente la table

const AbstractManager = require("./AbstractManager");

class feelingManager extends AbstractManager {
  constructor() {
    super({ table: "post_feeling" });
  }

  insert(feeling) {
    return this.database.query(
      `INSERT INTO ${this.table} (name, emoji, post_id, user_id) VALUES(?,?,?,?)`,
      [feeling.name, feeling.emoji, feeling.post_id, feeling.user_id]
    );
  }

  countFeelingByUser(id) {
    return this.database.query(
      `SELECT COUNT(user_id) as feeling_count 
    FROM ${this.table}
    WHERE post_feeling.user_id = ?`,
      [id]
    );
  }

  findAllByPost(id) {
    return this.database.query(
      `SELECT post_feeling.id as feeling_id, post_feeling.name as feeling_name, emoji, post_feeling.post_id, post_feeling.user_id, user.username  
      FROM ${this.table}
      JOIN post on post.id = post_feeling.post_id
      JOIN user on post_feeling.user_id = user.id
      WHERE post.id = ?`,
      [id]
    );
  }
}

module.exports = feelingManager;
