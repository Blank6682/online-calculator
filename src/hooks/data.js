import { Info } from '../assets/db.json';
import { pipe } from 'lodash/fp';
import { math } from './math';

class Data {
  constructor(info) {
    this.info = info
    this.init()
  }
  init() {
    this._getOperator()
    this._getPureOperator()
    this._Invisible()
    this._getNumber()
    this._getOrder()
  }
  _getOperator() {
    this.operator = this._getProperty("operator")
    this.operatorId = []
    this.operator.forEach(info => {
      info.tag ? this.operatorId.push(info.id) : null
    })
  }
  _getPureOperator() {
    this.pureOperator = this._getProperty("pureOperator")
    this.pureOperatorTag = []
    this.operator.forEach(info => {
      info.tag ? this.pureOperatorTag.push(info.tag) : null
    })
    //生成拆分input dom value的正则
    this.pureOperatorReg = this._preparRegular(this.pureOperatorTag)
  }
  _Invisible() {
    this.invisible = this._getProperty("invisible")
  }
  _getNumber() {
    this.numberList = this._getProperty("number")
  }
  _getOrder() {
    this.orderList = this.info.filter(info => info.order).sort((a, b) => a - b)
  }
  _getProperty(property) {
    return this.info.filter(info => info.property.includes(property))
  }

  /* ===== 获取当次输入的类型 ===== */
  getInputStatus = (info) => {
    const isPureOperator = this.isThisType(info, 'pureOperator')
    const isPoint = this.isThisType(info,'pointer')
    const isEqual = this.isThisType(info,'equal')
    const isNumber = this.isThisType(info,'number')
    const isAddValue = this.isThisType(info,'addValue')
    const isShowResult = this.isThisType(info,'showResult')
    const isClearAll = this.isThisType(info,'clearAll')
    const isClearLast = this.isThisType(info,'clearLast')
    return {
      isPureOperator, isPoint, isEqual, isNumber,
      isAddValue,isShowResult,isClearAll,isClearLast
    }
    
  }
  
  //判断输入类型
  isThisType(info, type) {
    if(info && info.property && Array.isArray(info.property))
      return !!info.property.filter(i => i === type).length
    return false
  }
  
  //将字符串按照运算符进行拆分
  analysisString = (info, optimize = false)=>{
    return pipe(
      this._split,
      this._optimize(optimize)
    )(info)
  }

  //通过正则进行拆分
  _split = (info) => {
    return info.split(this.pureOperatorReg).filter( i => i!=='')
  }

  _preparRegular = (tagArr) => {
    //适合正则的数组
    const tags = tagArr.map(tag => {
      return tag === '-'?'\\-':tag
    })
    //生成正则条件
    const condition = `([${tags}])`

    return new RegExp(condition)
  }

  //内部使用优化函数需要考虑是否开启
  _optimize = (optimize) =>(info)=> {
    if (!optimize) return info
    return info.map(el => {
      //将原内容中可以转化数字的进行转化
      const elToNumber = Number(el)

      if (elToNumber || elToNumber === 0) {
        //将不规范的数字转化为规范的数字 eg: 0.00=>0 001 =>1
        return math.calcuate(elToNumber).toSting()
      }
      return el
    })
  }

  //对外版本
  optimize = (info) => {
    return this._optimize(true)(info)
  }
}


export default new Data(Info)
