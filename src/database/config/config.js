data = {
  "development": {
    "username": "julpb97",
    "password": "Grupo8dh",
    "database": "julpb97_barzanaclinic",
    "host": "mysql-julpb97.alwaysdata.net",
    "dialect": "mysql",
    "port": 3306
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
require('dotenv').config();

module.exports = data