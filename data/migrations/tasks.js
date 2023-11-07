exports.up = function(knex) {
    return knex.schema.createTable("tasks", function(table) {
        table.increments("task_id");

        table
            .integer("project_id")
            .unsigned()
            .notNullable()
            .references("project_id")
            .inTable("projects")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");

        table.string("task_description").notNullable();
        table.text("task_notes");
        table.boolean("task_completed").defaultTo(false);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("tasks");
};
