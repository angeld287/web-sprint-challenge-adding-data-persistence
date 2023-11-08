// build your `Task` model here
const db = require("../../data/dbConfig.js");
const mappers = require('../../data/helpers/mappers');

module.exports = {
  get,
  insert,
  update,
  remove,
};

function get(id) {
  let query = db("tasks as t");

  if (id) {
    query.where("t.task_id", id).first();

    return query.then(function(task) {
      if (task) {
        return mappers.taskToBody(task);
      } else {
        return null;
      }
    });
  } else {
    return query
          .leftOuterJoin('projects', 't.project_id', 'projects.project_id')
          .then(tasks => {
      return tasks.map(task => mappers.taskToBody(task))
    });
  }
}

function insert(task) {
  return db("tasks")
    .insert(task)
    .then(([task_id]) => get(task_id));
}

function update(id, changes) {
  return db("tasks")
    .where("task_id", id)
    .update(changes)
    .then(count => (count > 0 ? get(id) : null));
}

function remove(id) {
  return db("tasks")
    .where("task_id", id)
    .del();
}
