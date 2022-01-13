
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'

// TODO defaults
// TODO type checking

const envBefore = Object.assign([], process.env)
const root = process.cwd()
const parentsPath = __dirname.replace(root, '')
const parents = parentsPath.split('/')
const envFilename = '.env' + (typeof process.env.NODE_ENV !== 'undefined' ? '.' + process.env.NODE_ENV : '')

const environment = {
  node_env: process.env.NODE_ENV,
  results: {},
}

let currentFolder = ''
parents.forEach(parent => {
  const parentPath = currentFolder + parent + '/'

  if (fs.existsSync(path.resolve(root + parentPath, envFilename))) {
    const result = dotenv.config({ path: root + parentPath + envFilename })
    if (result.error) {
      throw result.error
    }
    environment.results[parentPath] = result.parsed
  }

  currentFolder = parentPath
});

const difference = (obj1, obj2) => {
  const diff = {};
  Object.keys(obj1).forEach(key => {
    if(obj1[key] !== obj2[key]){
      diff[key] = obj1[key]
    }
  });
  return diff;
};
// console.log(difference(process.env, envBefore));

// process.exit(1)

