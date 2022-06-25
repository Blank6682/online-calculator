import data from './data';

class Dom {
  text = {
    show: null,
    input: null
  }
  toggle = {
    sun: null,
    moon: null
  }
  number = []
  order = []
  button = []
  constructor() {
    this._getTextAreaDom()
    this._getToggleDom()
    this._getNumberDom()
    this._getOrderDom()
    this._getBottonDom()
  }
  //获取对应的dom,赋值
  _getTextAreaDom() {
    this.text.show = this.getDomById("show")
    this.text.input = this.getDomById('input')
  }

  _getToggleDom() {
    this.toggle.sun = this.getDomById("sun")
    this.toggle.moon = this.getDomById('moon')
  }

  _getNumberDom() {
    const numberList = data.numberList.sort((a, b) => a.number - b.number)
    numberList.forEach(num => {
      this.number.push(this.getDomById(num.id))
    })
  }

  _getOrderDom() {
    const orderList = data.orderList.sort((a, b) => a.order - b.order)
    orderList.forEach(num => {
      this.order.push(this.getDomById(num.id))
    })
  }

  _getBottonDom() {
    this.button = this.getAllDom('.calculator span')
  }

  //封装获取dom函数
  get(info) {
    return document.querySelector(info)
  }

  have(info) {
    return !!document.querySelector(info)
  }
  haveById(id) {
    return !!document.getElementById(id)
  }

  getDomById(id) {
    return document.getElementById(id)
  }

  getAllDom(info) {
    return document.querySelectorAll(info)
  }
}

export default new Dom()
