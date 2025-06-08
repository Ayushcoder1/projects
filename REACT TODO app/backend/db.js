const Client = require('pg').Client;

const client = new Client({
    connectionString : "postgresql://neondb_owner:npg_0CvS9UqDMyTI@ep-silent-hill-a4tswjgk-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"
});

client.connect();

module.exports = {
  client
};