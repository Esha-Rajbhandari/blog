const db = require('../../model/connect');

const createDB = () => {
    db.query('CREATE DATABASE IF NOT EXISTS blog', (err, result)=>{
        if(err){throw err}
        else{console.log('Database created')}
    })
} 

module.exports = createDB;