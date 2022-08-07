import { Status } from './status';
import { logMaker } from '../utils/log';

const log = logMaker(false)

class Rule{

  canNotUseFirst = () => {
    log(`${this.canNotUseFirst.name} passed`)
    return true
  }

  canNotUseWithOperator = () => {
    log(`${this.canNotUseWithOperator.name} passed`)
    return true
  }

  canNotUseWithPointer = () => {
    log(`${this.canNotUseWithPointer.name} passed`)
    return true
  }

  canNotUseAfterResult = () => {
    log(`${this.canNotUseAfterResult.name} passed`)
    return true
  }

  firstNotDouble = () => {
    log(`${this.firstNotDouble.name} passed`)
    return true
  }

  canNotUseIfTheNumAlreadyHavePointer = () => {
    log(`${this.canNotUseIfTheNumAlreadyHavePointer.name} passed`)
    return true
  }
}

const rule = new Rule()

export {rule}
