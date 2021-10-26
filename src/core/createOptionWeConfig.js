const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
function createWCF(param) {
  this.wcfConfig=param
  this.collectParam(param)
}
createWCF.prototype.collectParam = function (param) {
   this.inquire(param)
     .th
}
createWCF.prototype.inquire = function (source){
  if(typeof source !== 'string') console.log(chalk.red('请提供正确的路径或参数'))
  var propmt=[];
  propmt.push({
    type: 'entry',
    message: '请输入入口地址',
    name: 'entry',
    validate(enrty){
      if(!enrty) {
        console.log(chalk.red('入口地址不能为空'))
        return '入口地址错误'
      }
      return true
    }
  })
  inquirer.prompt(propmt)
}
// createWCF.prototype.createOutput = function (){}
// createWCF.prototype.createStaticRes = function (){}
// createWCF.prototype.createHtmlWpk = function (){}
module.exports=createWCF
