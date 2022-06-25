import { Info } from '../assets/db.json';

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
}


export default new Data(Info)
