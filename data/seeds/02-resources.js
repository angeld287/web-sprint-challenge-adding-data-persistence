exports.seed = function(knex) {
    return knex('resources').insert([
      {
        resource_name: 'Complete Node.js and Express Challenge',
        resource_description:
          'Build and Awesome API Using Node.js and Express to Manage Projects and Actions GTD Style!',
      },
    ]);
  };
  