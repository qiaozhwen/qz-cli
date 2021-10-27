const recast = require('recast');
const fs = require('fs');
const path = require('path');
const {
  variableDeclaration,
  variableDeclarator,
  functionExpression
} = recast.types.builders;
const { parse, print } = recast
function checkFile(source){
  console.log('source=>', source)
  const filePath = path.join(__dirname,source)
  fs.readFile(filePath, 'utf8', function (err, data){
    if(err)return 'read file error'
    fileResult=data
  })
}
module.exports = function (rule, url){
  // const filePath = path.resolve(__dirname, url)
  console.log('from command rule==>',rule)
  fs.readFile(url, 'utf8', function (err, data){
    if(err)throw err;
    const ast = parse(data)
    const func = ast.program.body[0]
    ast.program.body[0] = variableDeclaration('const', [variableDeclarator(func.id, functionExpression(null, func.params, func.body))])
    const output = print(ast).code
    fs.writeFile(url, output, [], function (err){
      if(err)throw err;
      console.log('write file done🎉')
    })
  })
}
