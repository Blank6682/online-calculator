import { data } from './data';
import { dom } from './dom';

class Status{
  //输入的信息
  static curInputInfo = null
  //输入信息的状态
  static curInputStatus = Status._getEachTimeInputStatus()
  //inputDom的值
  static curInputDomValue = Status.getInputDomValue()
  //inputDom拆分的信息，未开启优化的
  static curInputDomSplit = Status.getInputDomValueSplit()
  //inputDom拆分的信息，开启优化的
  static curInputDomSplitOptimize = Status.getInputDomValueSplitOptimize ()


  //生成状态
  static generate(curInputInfo) {
    Status.curInputInfo = curInputInfo
    Status.curInputStatus = Status._getEachTimeInputStatus()
    Status.curInputDomValue = Status.getInputDomValue()
    Status.curInputDomSplit = Status.getInputDomValueSplit()
    Status.curInputDomSplitOptimize = Status.getInputDomValueSplitOptimize()
  }
  
  //获取每次输入的状态
  static _getEachTimeInputStatus() {
    return data.getInputStatus(Status.curInputInfo)
  }
  
  //获取当前计算机输入部分显示的内容
  static getInputDomValue() {
    return dom.getInputDom().value
  }

  //获取输入部分显示的内容的拆分结果，未开启优化的版本
  static getInputDomValueSplit(optimize = false) {
    return data.analysisString(Status.getInputDomValue(),optimize)
  }

  //获取输入部分显示的内容的拆分结果,开启优化的版本
  static getInputDomValueSplitOptimize() {
    return data.optimize(Status.curInputDomSplit)
  }
  
}

export { Status }
