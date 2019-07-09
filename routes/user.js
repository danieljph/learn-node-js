const express = require('express');
const HashMap = require('hashmap');
const LOGGER = rootRequire('./utils/logger');
const asyncHandler = require('express-async-handler');
const properties = rootRequire('./utils/properties');


const router = express.Router();
let counterId = 1;
const storage = new HashMap();

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
};

router.get('/:id(\\d+)/', asyncHandler(async (req, res, next) =>
{
  LOGGER.info("HELLO TEST");
  LOGGER.info(`Get by ID ${req.params.id}`);
  LOGGER.error(`Error by ID ${req.params.id}`);
  const result = storage.get(+req.params.id);

  if(result)
  {
    res.send(result);
  }
  else
  {
    await sleep(3000);
    throw {status:404, message:'Item not found.', stack: '-'};
  }

  next();
}));

router.post('/:username', (req, res, next) =>
{
  const id = counterId++;
  const result = {
    id: id,
    username:req.params.username,
    lastName: req.body.lastName,
    appName: properties.get('app.name')
  };
  storage.set(id, result);
  res.send(result);
  next();
});

module.exports = router;
