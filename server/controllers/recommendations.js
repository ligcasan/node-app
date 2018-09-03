const decision_row = require('../models').user_decision;
const g = require('ger');
const sequelize = require('sequelize');
const recommendation_row = require('../models').recommendation;

var fetch_todays_users = function() {
  // const today = new Date().setHours(0,0,0,0);
  const today = new Date('2018-08-30').setHours(0,0,0,0);

  return decision_row.findAll({
    attributes: [[sequelize.fn('DISTINCT', sequelize.col('user_id')), 'user_ids']],
    where: {
      createdAt: {
        gt: today
      }
    }
  });
}

var fetch_todays_user_decision = function(status = 'like') {
  // const today = new Date().setHours(0,0,0,0);
  const today = new Date('2018-08-30').setHours(0,0,0,0);

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
  var nextDay = new Date();
  nextDay.setDate(nextDay.getDate() + 1);
  nextDay = nextDay.setHours(0,0,0,0);
  var obj = [];
  data.forEach((row) => {
    obj.push({
      namespace: namespace,
      person: row['dataValues']['user_id'],
      action: row['dataValues']['status'],
      thing: row['dataValues']['image_id'],
      expires_at: nextDay
    });
  });
  return obj;
}

module.exports = {
  generate(req, res) {
    var esm = new g.MemESM();
    var ger = new g.GER(esm);
    var namespace = 'images';
    var user_ids = [];
    var user_recommendations = [];

    fetch_todays_users()
    .then((data) => {
      user_ids = data.map(rows => rows.dataValues.user_ids);  

      fetch_todays_user_decision()
      .then((data) => parse_user_decision_for_ger(data))
      .then(
        (data) => {
          ger.initialize_namespace(namespace)
          .then( function() {
            return ger.events(data)
          })
          .then( function() {
            user_ids.forEach((item) => {
              user_recommendations.push(
                ger.recommendations_for_person(
                  namespace,
                  item,
                  {actions:
                    {like: 1},
                    "filter_previous_actions": ["like"]}));
            });
            return user_recommendations;
          }).then( function(recommendations) {
            Promise.all(recommendations).then(function(values) {
	      console.log(values);
              values.forEach((item) => {
	        if(item.recommendations.length != 0) {
		  var userId = '';
		  for(var neighbhour in item.neighbourhood) {
		    if(item.neighbourhood[neighbhour] == 1) {
		      userId = neighbhour; 
		    }
		  }
                  item.recommendations.forEach((thing) => {
		    recommendation_row.create({
		      'user_id': userId,
		      'image_id': thing.thing
		    });
		  });
		}
	      });
            });
            console.log('Bye');
          });
        }
      );
    });

    return res.status(201).send({'message': 'Successful T.'});
  },
}
