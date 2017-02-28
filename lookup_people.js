const pg = require("pg");
const settings = require("./settings.json"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

let querySearch = "SELECT * FROM famous_people WHERE last_name=$1 OR first_name = $1";
let input = process.argv[2];

function getInfo(err, result) {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(`-${result.rows[0].id}: ${result.rows[0].first_name} ${result.rows[0].last_name}, born ${result.rows[0].birthdate}`);
    client.end();
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(querySearch, [input], getInfo);
});

