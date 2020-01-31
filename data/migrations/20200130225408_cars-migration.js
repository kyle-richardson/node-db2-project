exports.up = function(knex, Promise) {
    // don't forget the return statement
    return knex.schema.createTable('cars', tbl => {

      tbl.increments();

      tbl.text('make', 128).notNullable();
      tbl.text('model', 128).notNullable();
      tbl.text('color', 128).notNullable();

      tbl.decimal('year').notNullable();
      tbl.decimal('price').notNullable();
    });
  };
  
  exports.down = function(knex, Promise) {
    // drops the entire table
    return knex.schema.dropTableIfExists('cars');
  };