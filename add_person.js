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

let firstName = process.argv[2];
let lastName = process.argv[3];
let DateOfBirth = process.argv[4];
knex('famous_people').insert({
  first_name: firstName,
  last_name: lastName,
  birthdate: DateOfBirth
}, 'id').asCallback(function (err, result) {
  knex.destroy(function () {
    console.log('DB connection stopped');
  });
});




