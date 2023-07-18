// représente la table

const AbstractManager = require("./AbstractManager");

class userManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    return this.database.query(
      `INSERT INTO ${this.table} (username, email, hashedPassword) VALUES(?,?,?)`,
      [user.username, user.email, user.hashedPassword]
    );
  }

  find(id) {
    return this.database.query(
      `select id, username, email from ${this.table} where id = ?`,
      [id]
    );
  }

  findAll() {
    return this.database.query(
      `select id, username, email from  ${this.table}`
    );
  }

  update(user) {
    return this.database.query(
      `UPDATE ${this.table} set username = ?, email = ? WHERE id = ?`,
      [user.username, user.email, user.id]
    );
  }

  findByEmailWithPassword(email) {
    return this.database.query(
      `SELECT id, username, email, hashedPassword
    FROM ${this.table}
    where email = ?`,
      [email]
    );
  }
}

module.exports = userManager;
