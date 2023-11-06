exports.up = function(knex) {
    return knex.schema.createTable("resources", function(table) {
        table.increments("resource_id");
        table.unique("resource_name");
        table.text("resource_description");
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("resources");
};
