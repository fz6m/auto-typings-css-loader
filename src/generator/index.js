const { isObject, isEmpty } = require('lodash')
const loaderUtils = require('loader-utils')

const generatorStyle = ({
  source,
  graph,
  loaderContext,
  otherArgs,
  callback: successCallback,
}) => {
  const { cssLoaderOptions = {}, typingsLoaderOptions = {} } =
    loaderUtils.getOptions(loaderContext)

  const currentResourcePath = loaderContext.resourcePath

  const isModule = graph[currentResourcePath] || false

  const typingsLoaderProcess = (code, callback) => {
    // need typings loader
    if (isModule) {
      // construction context
      const context = {
        ...loaderContext,
        query: typingsLoaderOptions,
        async: () => callback,
      }
      // hack typings loader
      const typingsLoader =
        require('@teamsupercell/typings-for-css-modules-loader').bind(context)
      // process code
      typingsLoader(code, ...otherArgs)
      return
    }
    // not need typings loader
    callback(null, code)
  }

  const cssLoaderProcess = (code, callback) => {
    // get css loader modules option value
    const moduleOption = cssLoaderOptions.modules
    const isModuleOptionNotEmpty =
      isObject(moduleOption) && !isEmpty(moduleOption)
    const hanldeModuleOption = isModule
      ? isModuleOptionNotEmpty
        ? moduleOption
        : true
      : false
    // construction context
    const context = {
      ...loaderContext,
      query: {
        ...cssLoaderOptions,
        modules: hanldeModuleOption,
      },
      async: () => callback,
    }
    // hack css loader
    const cssLoader = require('css-loader').bind(context)
    cssLoader(code, ...otherArgs)
  }

  cssLoaderProcess(source, (err, code) => {
    err && successCallback(err)
    typingsLoaderProcess(code, successCallback)
  })
}

module.exports = {
  generatorStyle,
}
