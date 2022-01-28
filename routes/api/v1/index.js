import { join } from 'path'
import { readdirSync, lstatSync } from 'fs'

import express from 'express'
import includes from 'lodash/includes'

const excluded = ['index']

const router = express.Router()

readdirSync(__dirname)
  .filter((file) => {
    const baseName = file.split('.')[0]
    return lstatSync(join(__dirname, file)).isDirectory() && !includes(excluded, baseName)
  })
  .forEach((file) => {
    const baseName = file.split('.')[0]

    import(`./${file}`).then((module) => {
      router.use(`/${baseName}`, module.default)
    })
  })

export default router