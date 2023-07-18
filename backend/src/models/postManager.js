const AbstractManager = require("./AbstractManager");

class ItemManager extends AbstractManager {
  constructor() {
    super({ table: "post" });
  }

  insert(item) {
    return this.database.query(
      `insert into ${this.table} (title, gif_url) values (?,?)`,
      [item.title, item.gif_url]
    );
  }

  update(item) {
    return this.database.query(
      `update ${this.table} set title = ?, gif_url = ? where id = ?`,
      [item.title, item.gif_url, item.id]
    );
  }
}

module.exports = ItemManager;
