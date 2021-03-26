const { ObjectId } = require('mongodb');
const connection = require('./connection');

const add = async (collection, query) => {
  const { title, description, price, category } = query;
  const db = await connection(collection);
  const result = await db.insertOne(query);

  return { _id: result.insertedId, title, description, price, category };
};

const update = async (collection, id, query) => {
  const { title, description, price, category } = query;
  const db = await connection(collection);

  await db.updateOne({ _id: ObjectId(id) }, { $set: { title, description, price, category } });

  return { _id: ObjectId(id), title, description, price, category };
};

const findAll = async (collection) => {
  const db = await connection(collection);
  const result = await db.find({}).toArray();

  return result;
};

const findByName = async (collection, title) => {
  const db = await connection(collection);
  const result = await db.findOne({ title });

  return result;
};

const findByCategory = async (collection, category) => {
  const db = await connection(collection);
  const result = await db.findOne({ category });

  return result;
};

const exclude = async (collection, id) => {
  const db = await connection(collection);
  const deletedProduct = await db.findOne({ _id: ObjectId(id) });
  await db.deleteOne({ _id: ObjectId(id) });

  return deletedProduct;
};

module.exports = {
  add,
  findAll,
  findByName,
  findByCategory,
  update,
  exclude,
};
