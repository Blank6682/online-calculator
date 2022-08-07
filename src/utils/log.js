class Log{
  //全局控制变量,默认不开启
  static forceDisplayAll = false
  static forceHideAllLog = false

  constructor(dispaly = true) {
    this.dispaly =dispaly
  }

  log = (info, type = 'log') => {
    (Log.forceDisplayAll || this.dispaly)
      && !Log.forceHideAllLog && eval(`console.${type}`)(info)
  }
}

//监听全局控制变量的变化
addListener(Log, 'forceDisplayAll')
addListener(Log,'forceHideAllLog')

function addListener(object, property) {
  let val = object[property]

  Object.defineProperty(object, property, {
    get:function(){
      return val
    },
    set: function (newVal) {
      val = newVal

      console.trace()
      console.log(`Log ${property} is change to ${val}`)
    },
    enumerable: true,
    configurable:false
  })
}


const logMaker = (dispaly = true) => (new Log(dispaly)).log

const log = logMaker()

export { Log ,logMaker,log}
