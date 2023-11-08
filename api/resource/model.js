// build your `Resource` model here
const db = require("../../data/dbConfig.js");

module.exports = {
  get,
  insert,
  update,
  remove,
  getByName,
};

function get(id) {
  let query = db("resources as r");

  if (id) {
    query.where("r.resource_id", id).first();

    return query.then(function(resources) {
      if (resources) {
        return resources;
      } else {
        return null;
      }
    });
  } else {
    return query.then(projects => {
      return projects;
    });
  }
}

function getByName(name) {
  let query = db("resources as r");

  return query.where("r.resource_name", name).first().then(projects => {
    return projects;
  });
}

function insert(resource) {
  return db("resources")
    .insert(resource)
    .then(([resource_id]) => get(resource_id));
}

function update(id, changes) {
  return db("resources")
    .where("resource_id", id)
    .update(changes)
    .then(count => (count > 0 ? get(id) : null));
}

function remove(id) {
  return db("resources")
    .where("resource_id", id)
    .del();
}
