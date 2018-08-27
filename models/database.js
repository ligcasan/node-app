const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/cullective';

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
  'CREATE TABLE items(id SERIAL PRIMARY KEY, title VARCHAR(40) not null, url VARCHAR(40) not null, created DATE not null)');
query.on('end', () => { client.end(); });
