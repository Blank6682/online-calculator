import { Status } from "./status"

class Calcuator{
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
  _checkRules() {
    
  }

  //执行行为
  _run() {
    
  }
}

const calcuator = new Calcuator()
export { calcuator }
