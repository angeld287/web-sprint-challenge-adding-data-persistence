// build your `/api/tasks` router here
const express = require('express');
const { get, insert, update, remove } = require('./model');
const projects = require('../project/model.js');

const router = express.Router();

router.get('/', async (req, res) => {
  const tasks = await get();
  res.status(200).json(tasks);
});

router.get('/:id', async (req, res) => {
    const task = await get(req.params.id);
    if(task){
        res.status(200).json(task);
    } else{
        res.status(404).json(task);
    }
});

router.post('/', async (req, res) => {
    const { project_id, task_description, task_completed, task_notes } = req.body;
    const _completed = task_completed ? task_completed : false;
    if(project_id && task_description){
        const project = await projects.get(project_id);
        if(project){
            const task = await insert({ project_id, task_description, task_completed: _completed, task_notes }) 
            res.status(200).json(task);
        }else{
            res.status(400).json({message: 'project_id not found'});
        }
        
    }else{
        res.status(400).json(null);
    }
});

router.put('/:id', async (req, res) => {
    const { project_id, task_description, task_completed, task_notes } = req.body;
    const taskExist = await get(req.params.id);
    if(taskExist){
        if(project_id && task_description && task_notes && (task_completed === false || task_completed === true)){
            const task = await update(req.params.id, { project_id, task_description, task_completed, task_notes })
            res.status(200).json(task);
        }else{
            res.status(400).json(null);
        }
    }else{
        res.status(404).json(null);
    }
    
});

router.delete('/:id', async (req, res) => {
    const task = await get(req.params.id);
    if(task){
        await remove(req.params.id)
        res.status(200).json(null);
    } else{
        res.status(404).json(task);
    }
});

module.exports = router;