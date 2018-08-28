const decision_row = require('../models').user_decision;
const g = require('ger');

var fetch_todays_user_decision = function(status = 'like') {
  const today = new Date().setHours(0,0,0,0);

  return decision_row.findAll({
    where: {
      createdAt: {
        gt: today
      },
      status: 'like' 
    }
  });
}

var parse_user_decision_for_ger = function(data, namespace = 'images') {
  var obj = [];
  data.forEach((row) => {
    obj.push({
      namespace: namespace,
      person: row['dataValues']['user_id'],
      action: row['dataValues']['status'],
      thing: row['dataValues']['image_id'],
      expires_at: '2020-06-06'
    });
  });
  return obj;
}

module.exports = {
  generate(req, res) {
    var esm = new g.MemESM();
    var ger = new g.GER(esm);
    var namespace = 'images';

    fetch_todays_user_decision()
    .then((data) => parse_user_decision_for_ger(data))
    .then(
      (data) => {
        console.log('Bye');
        console.log(data);
        ger.initialize_namespace(namespace)
        .then( function() {
          return ger.events(data)
        })
        .then( function() {
          return ger.recommendations_for_person(namespace, 'cwok8Wj84KZBfFwwTMqvAq82Gf53', {actions: {like: 1}, "filter_previous_actions": ["like"]})
        }).then( function(recommendations) {
          console.log("\nRecommendations For cwok8Wj84KZBfFwwTMqvAq82Gf53")
          console.log(JSON.stringify(recommendations,null,2))
        });
      }
    );
    return res.status(201).send({'message': 'Successful T.'});
  },
}
