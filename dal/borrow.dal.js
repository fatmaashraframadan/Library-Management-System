import Borrow from '../models/borrow.js';
import Book from '../models/book.js';
import User from '../models/user.js';

async function getAll(filter, options) {
  return await Borrow.findAll({
    include: [
      {
        model: Book,
        as: "book",
        attributes: ["title", "author_name", "ISBN"],
      },
      {
        model: User,
        as: "user",
        attributes: ["name", "email"],
      },
    ],
    where: filter,
    ...options,
  });
}

async function create(borrow) {
  return await Borrow.create(borrow);
}

async function update(query, updatedBorrow) {
  const borrow = await Borrow.findOne({
    where: query,
  });

  if (borrow) {
    return await borrow.update(updatedBorrow);
  } else {
    const error = new Error("Borrow not found");
    error.statusCode = 404;
    throw error;
  }
}

async function findOne(query) {
  return await Borrow.findOne({
    where: query,
  });
}

async function deleteBorrow(query) {
  return await Borrow.destroy({
    where: query,
  });
}

export default {
  getAll,
  create,
  update,
  findOne,
  deleteBorrow,
};