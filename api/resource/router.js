// build your `/api/resources` router here
const express = require('express');
const { get, insert, update, remove } = require('./model');

const router = express.Router();

router.get('/', async (req, res) => {
  const resources = await get();
  res.status(200).json(resources);
});

router.get('/:id', async (req, res) => {
    const resource = await get(req.params.id);
    if(resource){
        res.status(200).json(resource);
    } else{
        res.status(404).json(null);
    }
});

router.post('/', async (req, res) => {
    const { resource_name, resource_description } = req.body;
    if(resource_name && resource_description){
        const resource = await insert({ resource_name, resource_description }) 
        res.status(200).json(resource);
    }else{
        res.status(400).json(null);
    }
});

router.put('/:id', async (req, res) => {
    const { resource_name, resource_description } = req.body;
    const resourceExist = await get(req.params.id);
    if(resourceExist){
        if(resource_name && resource_description){
            const resource = await update(req.params.id, { resource_name, resource_description })
            res.status(200).json(resource);
        }else{
            res.status(400).json(null);
        }
    }else{
        res.status(404).json(null);
    }
    
});

router.delete('/:id', async (req, res) => {
    const resource = await get(req.params.id);
    if(resource){
        await remove(req.params.id)
        res.status(200).json(null);
    } else{
        res.status(404).json(resource);
    }
});

module.exports = router;