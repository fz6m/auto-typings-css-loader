const fg = require('fast-glob')
const path = require('path')
const fse = require('fs-extra')
const ts = require('typescript')

const createStyleFileGraph = async ({ includes, exts, callback }) => {
  const result = {}

  const includesGlob = includes.map((dir) => `${dir}/**/*.(jsx|tsx)`)
  const entries = await fg(includesGlob, {
    absolute: true,
  })

  entries.forEach((p) => {
    // target file path
    const targetPath = p
    // target dir name
    const targetDir = path.dirname(targetPath)
    // read target file content
    const content = fse.readFileSync(targetPath, {
      encoding: 'utf-8',
    })
    // target file name
    const filenameWithExt = path.basename(targetPath)
    // target file ext
    const ext = path.extname(filenameWithExt)
    // cut to get filename
    const filename = filenameWithExt.slice(
      0,
      filenameWithExt.length - ext.length
    )
    // generate ast
    const ast = ts.createSourceFile(filename, content, ts.ScriptTarget.Latest)
    // foreach ast
    ast.forEachChild((node) => {
      // only process import node
      const isImport = node.kind === ts.SyntaxKind.ImportDeclaration
      if (isImport) {
        // if has importClause, it is a css module import
        const isModule = Boolean(node.importClause)
        // get import css file relative path
        const importFilePath = node.moduleSpecifier.text
        // get css file ext ( start with a dot )
        const ext = path.extname(importFilePath)
        // only process specified ext file
        if (exts.includes(ext.slice(1))) {
          // get css file absolute path
          const absolutePath = path.join(targetDir, importFilePath)
          // if the css file has been imported by module, not process
          if (!result[absolutePath]) {
            result[absolutePath] = isModule
          }
        }
      }
    })
  })

  callback(result)

  return
}

module.exports = {
  createStyleFileGraph,
}
