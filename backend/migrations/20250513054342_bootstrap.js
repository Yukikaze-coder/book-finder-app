/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("favorites", (table) => {
    table.increments("id").primary();
    table.string("user_id").notNullable();
    table.string("book_id").notNullable();
    table.string("title");
    table.string("authors");
    table.string("thumbnail");
    table.timestamp("created_at").defaultTo(knex.fn.now());

    table.unique(["user_id", "book_id"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('books');
};