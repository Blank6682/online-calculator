import { Status } from './status';
import { logMaker } from '../utils/log';
import { isEmpty } from '../utils/index';
import { data } from './data';

const log = logMaker(false)

class Rule{

  canNotUseFirst = () => {
    if (isEmpty(Status.curInputDomValue)) {
      log(`${this.canNotUseFirst.name} did not passed`)
      return false
    }
    log(`${this.canNotUseFirst.name} passed`)
    return true
  }

  canNotUseWithOperator = () => {
    const input = Status.curInputDomValue.split('')
    const lastInput = input.pop()
    let cheakStatus = true

    data.pureOperatorTag.every(tag => {
      if (tag === lastInput) {
        cheakStatus = false
        return false
      }
      return true
    })

    if (cheakStatus) {
      log(`${this.canNotUseWithOperator.name} passed`)
      return true
    } else {
      log(`${this.canNotUseWithOperator.name} did not passed`)
      return false
    }
  }

  canNotUseWithPointer = () => {
    const input = Status.curInputDomValue.split('')
    const lastInput = input.pop()
    if (lastInput === '.') {
      log(`${this.canNotUseWithPointer.name} did not passed`)
      return false
    }
    log(`${this.canNotUseWithPointer.name} passed`)
    return true
  }

  canNotUseAfterResult = () => {
    if (Status.lastInputShowResult) {
      log(`${this.canNotUseAfterResult.name} did not passed`)
      return false
    }
    log(`${this.canNotUseAfterResult.name} passed`)
    return true
  }
  
  //当个数字开头部分能出现两次 eg :00  3+00
  firstNotDouble = () => {
    const curInputTag = Status.curInputInfo.tag
    const lastInputGroup = Status.curInputDomSplit.pop()
    if (curInputTag === lastInputGroup) {
      log(`${this.firstNotDouble.name} did not passed`)
      return false
    }
    log(`${this.firstNotDouble.name} passed`)
    return true
  }

  canNotUseIfTheNumAlreadyHavePointer = () => {
    const lastInputGroup = Status.curInputDomSplit.pop()
    if (lastInputGroup?.search(/\./) !== -1) {
      log(`${this.canNotUseIfTheNumAlreadyHavePointer.name} did not passed`)
      return false
    }
    log(`${this.canNotUseIfTheNumAlreadyHavePointer.name} passed`)
    return true
  }
}

const rule = new Rule()

export {rule}
