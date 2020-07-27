const create = require('./insert-item')
const update = require('./update-item')
const listDocuments = require('./list-items')
const select = require('./select-item')
const deleteDocument = require('./delete-item')

module.exports = {
  create,
  select,
  update,
  delete: deleteDocument,
  list: listDocuments
}
