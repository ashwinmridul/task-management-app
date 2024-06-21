const client = require('../utils/dbConnector');

class User {
    constructor() {
        client.query("CREATE TABLE IF NOT EXISTS Users (ID SERIAL PRIMARY KEY, name VARCHAR(50) NOT NULL, email VARCHAR(100) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL, creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP)", (err) => {
            if (err) {
                throw err;
            }
            console.log("Users table created successfully");
        });
    }

    getUser(email, cb) {
        client.query("SELECT * FROM Users WHERE email = $1", [email], (err, result) => {
            if (err) {
                cb(err);
            }
            if (result.rows.length > 0) {
                cb(null, result.rows[0]);
            } else {
                cb("User not found");
            }
        });
    }

    addUser(name, email, password, cb) {
        client.query("INSERT INTO Users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, password], (err, result) => {
            console.log('err: ', err);
            console.log('result: ', result);
            if (err) {
                cb(err);
            }
            cb(null, result.rows[0]);
        });
    }
}

const user = new User();

module.exports = user;
