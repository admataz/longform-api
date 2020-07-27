
const createTable = require('../utils/create-table')
const pageModel = require('../../../models/page')
const articleModel = require('../../../models/article')

module.exports.generateSql = () => (`
    ${createTable(pageModel)}
    
    ${createTable(articleModel)}
 `)
