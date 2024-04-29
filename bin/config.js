const path = require('path')
const argv = require('yargs-parser')(process.argv.slice(2))

const cwd = process.cwd()

const { i, input, o, output, c, config, mapping } = argv

const genAbsolutePath = (p) => {
  if (!p) {
    throw '模板工具执行失败，路径定义有误'
  }
  return path.resolve(cwd, p)
}

const configData = (() => {
  try {
    return require(genAbsolutePath(c || config || 'template.config.js'))
  } catch (error) {
    try {
      return require(genAbsolutePath(c || config || 'template.config.json'))
    } catch (error) {
      return {}
    }
  }
})()

const absoluteInput = genAbsolutePath(
  i || input || configData.input || 'template'
)

const absoluteOutput = genAbsolutePath(
  o || output || configData.output || 'src'
)

const mappingData = mapping?.split('&').reduce((pre, curr) => {
  const [key, value] = curr.split('=')
  return {
    ...pre,
    [key]: value,
  }
}, {})

module.exports = {
  input: absoluteInput,
  output: absoluteOutput,
  mapping: {
    ...mappingData,
    ...configData.mapping,
  },
}
