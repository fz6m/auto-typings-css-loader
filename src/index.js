const loaderUtils = require('loader-utils')
const { defaultConfig } = require('./config')
const { createStyleFileGraph } = require('./graph')
const { isArray } = require('lodash')
const { generatorStyle } = require('./generator')

module.exports = function loader(source, ...args) {
  const loaderContext = this
  const options = loaderUtils.getOptions(this)
  const callback = this.async()

  const { includes = defaultConfig.includes, exts = defaultConfig.exts } =
    options

  createStyleFileGraph({
    includes: isArray(includes) ? includes : [includes],
    exts,
    callback: (graph) => {
      generatorStyle({
        source,
        graph,
        loaderContext,
        otherArgs: args,
        callback,
      })
    },
  })
}
