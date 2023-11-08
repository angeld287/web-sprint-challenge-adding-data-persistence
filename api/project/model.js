// build your `Project` model here
const db = require("../../data/dbConfig.js");
const mappers = require('../../data/helpers/mappers');

module.exports = {
  get,
  insert,
  update,
  remove,
  getProjectTasks,
  insertProjectResource,
};

function get(id) {
  let query = db("projects as p");

  if (id) {
    query.where("p.project_id", id).first();

    const promises = [query, getProjectTasks(id)]; // [ projects, actions ] getProjectResources(id)

    return Promise.all(promises).then(function(results) {
      let [project, tasks] = results;

      if (project) {
        project.tasks = tasks;
        //project.resources = resources;

        return mappers.projectToBody(project);
      } else {
        return null;
      }
    });
  } else {
    return query.then(projects => {
      return projects.map(project => mappers.projectToBody(project));
    });
  }
}

function insert(project) {
  return db("projects")
    .insert(project)
    .then(([project_id]) => get(project_id));
}

function insertProjectResource(projectResource) {
    return db("project_resources")
      .insert(projectResource)
      .then(([id]) => get(id));
}

function update(id, changes) {
  return db("projects")
    .where("project_id", id)
    .update(changes)
    .then(count => (count > 0 ? get(id) : null));
}

function remove(id) {
  return db("projects")
    .where("project_id", id)
    .del();
}

function getProjectTasks(projectId) {
  return db("tasks")
    .where("project_id", projectId)
    .then(tasks => tasks.map(task => mappers.taskToBody(task)));
}

function getProjectResources(projectId) {
    return db("project_resources")
      .where("project_id", projectId)
      .leftOuterJoin('resources', 'project_resources.resource_id', 'resources.resource_id')
}
