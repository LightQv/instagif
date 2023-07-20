const AbstractManager = require("./AbstractManager");

class PostManager extends AbstractManager {
  constructor() {
    super({ table: "post" });
  }

  insert(item) {
    return this.database.query(
      `insert into ${this.table} (title, gif_url, user_id) values (?,?,?)`,
      [item.title, item.gif_url, item.user_id]
    );
  }

  update(item) {
    return this.database.query(
      `update ${this.table} set title = ?, gif_url = ? where id = ?`,
      [item.title, item.gif_url, item.id]
    );
  }

  findAll() {
    return this.database.query(
      `select post.id as post_id, title, gif_url, created_at, user.id as user_id, user.username 
      from ${this.table} 
      join user on user.id = user_id
      ORDER BY created_at DESC`
    );
  }

  findAllByUser(id) {
    return this.database.query(
      `select post.id as post_id, title, gif_url, created_at, user.id as user_id, user.username  
      from ${this.table} 
      join user on user.id = user_id
      where user.id = ?
      ORDER BY created_at DESC`,
      [id]
    );
  }

  findWithUser(id) {
    return this.database.query(
      `select post.id as post_id, title, gif_url, created_at, user.id as user_id, user.username as username  
      from ${this.table} 
      join user on user.id = user_id
      where post.id = ?`,
      [id]
    );
  }
}

module.exports = PostManager;
