const decisionsController = require('../controllers').decisions;
const imagesController = require('../controllers').images;
const recommendationsController = require('../controllers').recommendations;

module.exports = (app) => {
  app.get('/api', (req, res) => {
    console.log('Welcome to Cullective API');
    return res.status(200).send({
    message: 'Welcome to Cullective API'});
  });

  app.post('/api/decisions', decisionsController.create);

  app.post('/api/images', imagesController.create);
  app.post('/api/images/populate_with_reddit', imagesController.populate_with_reddit);

  app.get('/api/images/fetch_todays_entry', imagesController.fetch_todays_entry);

  app.get('/api/recommendations/generate', recommendationsController.generate);
};
