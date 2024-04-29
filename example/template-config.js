module.exports = {
  input: './template',
  output: './src',

  /**
   * 占位符与命令行输入 key 的映射，区分大小写
   * {
   *    ['文件或文件夹名称占位符、文件内容里的占位符']: value
   * }
   */
  mapping: {
    __name: 'h1',
    __Name: 'H1',
    __cname: '海1',
  },
}
