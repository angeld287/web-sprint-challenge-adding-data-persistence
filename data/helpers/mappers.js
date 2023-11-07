module.exports = {
    intToBoolean,
    booleanToint,
    projectToBody,
    actionToBody,
    taskToBody,
  };
  
  function intToBoolean(int) {
    return int === 1 ? true : false;
  }
  
  function booleanToint(bool) {
    return bool === true ? 1 : 0;
  }
  
  function projectToBody(project) {
    const result = {
      ...project,
      project_completed: intToBoolean(project.project_completed),
    };
  
    if (project.tasks) {
      result.tasks = project.tasks.map(task => ({
        ...task,
        task_completed: intToBoolean(task.task_completed),
      }));
    }
  
    return result;
  }
  
  function actionToBody(action) {
    return {
      ...action,
      completed: intToBoolean(action.completed),
    };
  }

  function taskToBody(task) {
    return {
      ...task,
      task_completed: intToBoolean(task.task_completed),
    };
  }