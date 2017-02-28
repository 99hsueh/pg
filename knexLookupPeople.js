
const settings = require("./settings.json"); // settings.json
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database,
    port: settings.port
  },
  // or `postgres://${settings.user}:${settings.password}@${settings.hostname}:${settings.port}/${settings.database}`,
  searchPath: 'knex,public'
});

let input = process.argv[2];

knex.select().table('famous_people')
  .where({last_name : input})
  .asCallback(function(err, rows) {
  if (err) {
    console.error(err);
  } else {
    console.log(`-${rows[0].id}: ${rows[0].first_name} ${rows[0].last_name}, born ${rows[0].birthdate}`);
  }
  knex.destroy(function () {
    console.log('');
  });
});



