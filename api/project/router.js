// build your `/api/projects` router here
const express = require('express');
const { get, getProjectTasks, insert, update, remove, insertProjectResource } = require('./model');

const router = express.Router();

router.get('/', async (req, res) => {
  const projects = await get();
  res.status(200).json(projects);
});

router.get('/:id', async (req, res) => {
    const project = await get(req.params.id);
    if(project){
        res.status(200).json(project);
    } else{
        res.status(404).json(project);
    }
});

router.get('/:id/tasks', async (req, res) => {
    const project = await get(req.params.id);
    if(project){
        const projectActions = await getProjectTasks(req.params.id)
        res.status(200).json(projectActions);
    } else{
        res.status(404).json(project);
    } 
});

router.post('/', async (req, res) => {
    const { project_name, project_description, project_completed } = req.body;
    const _completed = project_completed ? project_completed : false;

    if(project_name && project_description ){
        const project = await insert({ project_name, project_description, completed: _completed }) 
        res.status(200).json(project);
    }else{
        res.status(400).json(null);
    }
});

router.post('/:id/resource', async (req, res) => {
    const { project_id, resource_id } = req.body;

    if(project_id, resource_id ){
        const project = await insertProjectResource({ project_id, resource_id }) 
        res.status(200).json(project);
    }else{
        res.status(400).json(null);
    }
});

router.put('/:id', async (req, res) => {
    const { project_name, project_description, project_completed } = req.body;
    const projectExist = await get(req.params.id);
    if(projectExist){
        if( project_name && project_description && (project_completed === false || project_completed === true)){
            const project = await update(req.params.id, { project_name, project_description, project_completed })
            res.status(200).json(project);
        }else{
            res.status(400).json(null);
        }
    }else{
        res.status(404).json(null);
    }
    
});

router.delete('/:id', async (req, res) => {
    const project = await get(req.params.id);
    if(project){
        await remove(req.params.id)
        res.status(200).json(null);
    } else{
        res.status(404).json(project);
    }
});

module.exports = router;