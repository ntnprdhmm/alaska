const fs = require('fs')
const path = require('path')

/**
 * Read file at the given path from project's root
 * @param  {String} filepath file's path, from project's root
 * @return {String}          file's content
 */
const read = (filepath) => {
  return new Promise((resolve, reject) => {
  	// if env is test, look in the test directory instead of server directory
	const fullPath = process.env.NODE_ENV === 'test'
		? path.join(__dirname, '../..', 'test', filepath)
		: path.join(__dirname, '..', filepath) 

    fs.readFile(fullPath, 'utf-8', (err, data) => {
      err
        ? reject(err)
        : resolve(String(data.toString().trim()))
    })
  })
}

module.exports = { read }
