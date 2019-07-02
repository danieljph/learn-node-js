const express = require('express');
const HashMap = require('hashmap');
const asyncHandler = require('express-async-handler');

const router = express.Router();
let counterId = 1;
const storage = new HashMap();

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
};

router.get('/:id(\\d+)/', asyncHandler(async (req, res, next) =>
{
  const result = storage.get(+req.params.id);

  if(result)
  {
    res.send(result);
  }
  else
  {
    await sleep(3000);
    throw {status:404, message:"Item not found.", stack: "-"};
  }

  next();
}));

router.post('/:username', (req, res, next) =>
{
  const id = counterId++;
  const result = {id: id, username:req.params.username, lastName: req.body.lastName};
  storage.set(id, result);
  res.send(result);
  next();
});

module.exports = router;
