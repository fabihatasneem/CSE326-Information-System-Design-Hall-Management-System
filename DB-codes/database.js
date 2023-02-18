require('dotenv').config();
const { Client } = require('pg')

class Database {
    constructor() {
        this.client = new Client({
            host: process.env.DB_host,
            port: process.env.DB_port,
            database: process.env.DB_name,
            user: process.env.DB_user,
            password: process.env.DB_password,
        })
        this.client.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
        });
    }
    // code to execute sql
    execute = async function (sql, binds) {
        let results;
        try {
            results = await this.client.query(sql,binds);
            return results;
        } catch (err) {
            console.log("ERROR executing sql: " + err.message);
            console.log("SQL: ", sql);
            console.log(binds);
        }
    };
}
module.exports = Database;
