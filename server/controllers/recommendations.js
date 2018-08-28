const g = require('ger');

module.exports = {
  generate(req, res) {
    var esm = new g.MemESM();
    var ger = new g.GER(esm);

    ger.initialize_namespace('movies')
    .then( function() {
      return ger.events([
        {
          namespace: 'movies',
          person: 'bob',
          action: 'likes',
          thing: 'xmen',
          expires_at: '2020-06-06'
        },
        {
          namespace: 'movies',
          person: 'bob',
          action: 'likes',
          thing: 'avengers',
          expires_at: '2020-06-06'
        },
        {
          namespace: 'movies',
          person: 'alice',
          action: 'likes',
          thing: 'xmen',
          expires_at: '2020-06-06'
        },
      ])
    })
    .then( function() {
      // What things might alice like?
      return ger.recommendations_for_person('movies', 'alice', {actions: {likes: 1}, "filter_previous_actions": ["likes"],})
    }).then( function(recommendations) {
      console.log("\nRecommendations For 'alice'")
      console.log(JSON.stringify(recommendations,null,2))
    });

    return res.status(201).send({'message': 'Successful T.'});
  },
}
