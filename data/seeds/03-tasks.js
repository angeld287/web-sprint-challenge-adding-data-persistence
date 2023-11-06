exports.seed = function(knex, Promise) {
    return knex('tasks').insert([
      {
        project_id: 1,
        task_description:
          'Build and Awesome API Using Node.js and Express to Manage Projects and Actions GTD Style!',
      },
    ]);
  };
  