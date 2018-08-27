const imagesController = require('../controllers').images;
const todosController = require('../controllers').todos;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to Cullective API'
  }));

  app.post('/api/images', imagesController.create);
  app.post('/api/todo', todosController.create);
};
