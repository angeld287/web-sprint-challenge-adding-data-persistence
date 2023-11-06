exports.seed = function(knex, Promise) {
    return knex('projects').insert([
      {
        project_name: 'Complete Node.js and Express Challenge',
        project_description:
          'Build and Awesome API Using Node.js and Express to Manage Projects and Actions GTD Style!',
      },
    ]);
  };
  