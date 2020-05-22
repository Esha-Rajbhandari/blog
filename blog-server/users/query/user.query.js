const db = require("../../model/connect");

const insertData = (tablename, data) => {
  let query = `INSERT INTO ${tablename} SET ?`;
  db.query(query, data, (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log(result);
    }
  });
};

const findAllData = (tablename, callback) => {
  let query = `SELECT * FROM ${tablename}`;
  db.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      callback(false, result);
    }
  });
};

const findSingleData = (tablename, key, value, callback) => {
  let query = `SELECT * FROM ${tablename} WHERE ${key} = '${value}'`;
  db.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      callback(false, result);
    }
  });
};

const findMultipleData = (tablename, key1, value1, key2, value2, callback) => {
  let query = `SELECT * FROM ${tablename} WHERE ${key1} = '${value1}' AND ${key2} = '${value2}'`;
  db.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      callback(false, result);
    }
  });
};

const findProjectedData = (tablename, projection) => {
  let query = `SELECT ${projection} FROM ${tablename}`;
  db.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log("ppp", result);
    }
  });
};

const findSingleProjectedData = (tablename, projection, key, value) => {
  let query = `SELECT ${projection} FROM ${tablename} WHERE ${key} = ${value}`;
  db.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log(result);
    }
  });
};

const findLimitedData = (tablename, limit) => {
  let query = `SELECT * FROM ${tablename} LIMIT ${limit}`;
  db.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log(result);
    }
  });
};

const updateData = (tablename, data, key, value) => {
  let query = `UPDATE ${tablename} SET ? WHERE ${key} = ${value}`;
  db.query(query, data, (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log(result);
    }
  });
};

const deleteData = (tablename, key, value) => {
  let query = `DELETE FROM ${tablename} WHERE ${key} = ${value}`;
  db.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log(result);
    }
  });
};

module.exports = {
  insertData: insertData,
  findAllData: findAllData,
  findSingleData: findSingleData,
  findProjectedData: findProjectedData,
  findMultipleData: findMultipleData,
  findSingleProjectedData: findSingleProjectedData,
  findLimitedData: findLimitedData,
  updateData: updateData,
  deleteData: deleteData
};
