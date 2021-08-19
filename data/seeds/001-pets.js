
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('pets').del()
    .then(function () {
      // Inserts seed entries
      return knex('pets').insert([
        { name: 'Scooby'},
        { name: 'Fred'},
        { name: 'Shaggy'}
      ]);
    });
};
