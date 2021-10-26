const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const fs = require('fs')
function createWCF() {
  this.wcfConfig = {}
  this.wcfContent = ``
  // this.collectParam(param)
}
createWCF.prototype.collectParam = function () {
   this.inquire(this.wcfConfig)
     .then((answer)=>{
       this.wcfConfig = Object.assign({}, answer)
       this.createWcfByParam()
       this.writeFile()
     })
}
createWCF.prototype.inquire = function (source){
  // if(typeof source !== 'string') console.log(chalk.red('请提供正确的路径或参数'))
  var propmt=[];
  propmt.push({
    type: 'entry',
    message: '请输入入口地址',
    name: 'entry',
    validate(enrty){
      if(!enrty) {
        return '入口地址不能为空'
      }
      return true
    }
  })
  propmt.push({
    type: 'output',
    message: '请输入输出地址',
    name: 'output',
    validate(output){
      if(!output) {
        return '输出地址不能为空'
      }
      return true
    }
  })
  propmt.push({
    type: 'list',
    message: '请选择模式',
    name: 'mode',
    choices:['development', 'production']
  })
  return inquirer.prompt(propmt)
}
createWCF.prototype.createWcfByParam = function (){
  var that = this
  Object.keys(this.wcfConfig).map(function (key){
    // 根据收集参数写入
    if(key === 'entry' || key === 'mode'||key === 'output'){
      that.wcfContent+=`${key}: \`${that.wcfConfig[key]}\`,\n`
    }
  })
}
createWCF.prototype.writeFile = function (){
  // 包裹module.exports
  var finalContentB= 'module.exports={\n'

  var finalContentE= '\n}'
  fs.writeFile('webpack.config.js',finalContentB + this.wcfContent +finalContentE, function (err) {
    if (err) throw err;
    chalk.greenBright('webpack配置文件已生成～');
  });
}
module.exports=createWCF
