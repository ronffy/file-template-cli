#!/usr/bin/env node
const path = require('path')
const fs = require('fs')
const config = require('./config')

const { input, output, mapping } = config

const replaceContentByMapping = (s) =>
  s.replace(/{{(.*?)}}/g, (match, key) => mapping[key.trim()])

const replacePathByMapping = (path) =>
  path
    .replace(input, output)
    .replace(/{{(.*?)}}/g, (match, key) => mapping[key.trim()])

function ensureDirIfNotExists(filePath) {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath, { recursive: true, mode: 0o777 })
  }
}

const writeFileContentAsync = async (targetPath, searchPath) =>
  new Promise((res, rej) => {
    fs.readFile(targetPath, 'utf8', (err, data) => {
      if (err) {
        rej(err)
        return
      }

      // 根据 mapping 数据，替换内容
      const modifiedData = replaceContentByMapping(data)

      fs.writeFile(searchPath, modifiedData, 'utf8', (err) => {
        if (err) {
          rej(err)
          return
        }
        res()
      })
    })
  })

let promise = Promise.resolve()

function eachReplace(filePath) {
  const fileStat = fs.statSync(filePath)
  if (fileStat.isDirectory()) {
    // 文件夹不存在则新建
    ensureDirIfNotExists(replacePathByMapping(filePath))

    const files = fs.readdirSync(filePath)
    files.forEach((file) => {
      const nextPath = path.resolve(filePath, file)
      eachReplace(nextPath)
    })
  } else {
    // 文件，内容替换
    // 输出 output 对应目录下
    const result = writeFileContentAsync(
      filePath,
      replacePathByMapping(filePath)
    )
    promise = promise.then(() => result)
  }
}

eachReplace(input)

promise.then(
  () => {
    console.log('模板文件已输出到指定目录')
  },
  (err) => {
    console.log('模板文件未完成输出，错误原因是：')
    console.log(err)
  }
)
