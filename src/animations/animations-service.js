const path = require('path');
const fs = require('fs');

const AnimationsService = {
  getAllFiles(db) {

    return db
      .from('opal AS icon')
      .select('*')
  },
  getById(db, id) {
    return db
      .from('opal AS icon')
      .select('*')
      .where({ id })
      .first()
  },
  getByName(db, name) {
    return db
      .from('opal As icon')
      .select('*')
      .where({ name })
      .first()
  }
}

module.exports = AnimationsService
