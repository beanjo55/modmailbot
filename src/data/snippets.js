const moment = require('moment');
const knex = require('../knex');

/**
 * @property {String} trigger
 * @property {String} body
 * @property {Number} is_anonymous
 * @property {String} created_by
 * @property {String} created_at
 */
class Snippet {
  constructor(props) {
    Object.assign(this, props);
  }
}

/**
 * @param {String} trigger
 * @returns {Promise<Snippet>}
 */
async function getSnippet(trigger) {
  const snippet = await knex('snippets')
    .where('trigger', trigger)
    .first();

  return (snippet ? new Snippet(snippet) : null);
}

/**
 * @param {String} trigger
 * @param {String} body
 * @param {Boolean} isAnonymous
 * @returns {Promise<void>}
 */
async function addSnippet(trigger, body, isAnonymous = false, createdBy = 0) {
  if (await getSnippet(trigger)) return;

  return knex('snippets').insert({
    trigger,
    body,
    is_anonymous: isAnonymous ? 1 : 0,
    created_by: createdBy,
    created_at: moment.utc().format('YYYY-MM-DD HH:mm:ss')
  });
}

/**
 * @param {String} trigger
 * @returns {Promise}
 */
async function deleteSnippet(trigger) {
  return knex('snippets')
    .where('trigger', trigger)
    .delete();
}

async function getAllSnippets() {
  const snippets = await knex('snippets')
    .select();

  return snippets.map(s => new Snippet(s));
}

module.exports = {
  get: getSnippet,
  add: addSnippet,
  del: deleteSnippet,
  all: getAllSnippets,
};