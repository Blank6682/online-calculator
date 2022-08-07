import { Status } from "./status"
import { rule } from './rule';
import { logMaker } from '../utils/log';
import { counter } from '../utils/counter';
import { dom } from './dom';
import { math } from './math';
import { animation } from './animation';

const log = logMaker()

class Calcuator{
  
  constructor() {
    this.rule = rule
  }

  //分析每次输入，给出相应的行为，Info为db.json中的数据
  analysisEachTimeInput(curInputInfo) {
    //生成当前输入的所有信息
    this._prepareData(curInputInfo)
    this._checkRules(curInputInfo) && this._run()
  }

  //准备数据
  _prepareData(info) {
    Status.generate(info)
  }
  
  //检测规则
  _checkRules(curInputInfo) {
    //log
    this._checkRulesLog(curInputInfo)
    //假设全部通过的标识位，初始true,即全部通过
    let passAllRulesFlag = true

    curInputInfo.rule.every(ruleName => {
      //根据规则名称生成具体的函数名
      const ruleFnName = this._generateRuleFnName(ruleName)

      if (this._ruleFnExists(ruleFnName)) {
        passAllRulesFlag &&=this._ruleFnExecute(ruleFnName)
      } else {
        passAllRulesFlag = false

        log(`Cannot find this function: ${ruleFnName}`,'warn')
      }
      return passAllRulesFlag
    })
    return passAllRulesFlag
  }

  //log
  _checkRulesLog = (curInputInfo) => {
    const value = counter.next().value
    const tag = curInputInfo.tag
    log(`=== Counter:[${value}] Input:${tag} ===`)
  }
  //生成规则函数名
  _generateRuleFnName = (ruleFnName) => {
    return `this.rule.${ruleFnName}`
  }
  //是否存在这个函数
  _ruleFnExists = (ruleFnName) => {
    return typeof eval(ruleFnName) ==='function'
  }
  //执行函数
  _ruleFnExecute = (ruleFnName) => {
    return eval(ruleFnName)()
  }

  //执行行为
  _run() {
    this._addValue()
    this._showResult()
    this._clearAll()
    this._clearLast()
  }

  _addValue = () => {
    if (Status.curInputStatus.isAddValue) {
      dom.getInputDom().value += Status.curInputInfo.tag
    }
  }

  _showResult = () => {
    if (Status.curInputStatus.isShowResult) {
      if (!dom.getInputDom().value.length) return
      const analysisInput = Status.curInputDomSplitOptimize.join('')
      const calculateResult = math.calculate(analysisInput)

      if (typeof calculateResult === 'number') {
        dom.getShowDom().value = analysisInput + '='
        dom.getInputDom().value = calculateResult
        animation.textAreaShowHistory()
      }
    }
  }

  _clearAll = () => {
    if (Status.curInputStatus.isClearAll) {
      if (dom.getInputDom().value.length) {
        dom.getInputDom().value = ''
        this._calculateShowDomValue()
      } else if (dom.getShowDom().value.length) {
        dom.getShowDom = ''
        animation.textAreaHideHistory()
      }
    }
  }

  _clearLast = () => {
    if (Status.curInputStatus.isClearLast) {

      let inputLen = dom.getInputDom().value.length
      let showLen = dom.getShowDom().value.length
      let inputString = dom.getInputDom().value
      
      inputLen && (dom.getInputDom().value = inputString.subString(0, inputLen - 1))
      
      showLen && this._calculateShowDomValue()
    }
  }
  
  _calculateShowDomValue = () => {
    const history = dom.getShowDom().value.split('')
    if (history.pop() === '=') {
      dom.getShowDom.value += math.calculate(history.join())
    }
  }
}

const calcuator = new Calcuator()
export { calcuator }
