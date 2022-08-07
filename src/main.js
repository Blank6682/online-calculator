import "./style/style.css"

import data from './hooks/data';
import dom from './hooks/dom';
import animation from './hooks/animation';
import { Log, logMaker, log } from './utils/log';
import { counter } from './utils/counter';

log('hello wrold')
log(counter.next().value)
log(counter.next().value)

//为按钮赋予标签
data.info.forEach(el => {
  if (dom.haveById(el.id)) {
    document.styleSheets[0].insertRule(`#${el.id}::before{
      content:'${el.tag}'
    }`)
  }
})

//鼠标触发按钮按下事件
dom.button.forEach(el => {
  el.addEventListener("mousedown", () => {
    animation.btnPress(el)
  })

  el.addEventListener("mouseup", () => {
    animation.btnLeave(el)
  })

  el.addEventListener("mouseout", () => {
    animation.btnLeave(el)
  })
})

//添加事件监听
data.info.forEach(item => {
  //键盘事件
  window.addEventListener("keydown", (event) => {
    item.key.forEach(key => {
      if (event.key === key && dom.getDomById(item.id)) {
        animation.btnPress(dom.getDomById(item.id))
        calcuator.analysisEachTimeInput(item)
      }
    })
  })

  window.addEventListener("keyup", (event) => {
    item.key.forEach(key => {
      if (event.key === key && dom.getDomById(item.id)) {
        animation.btnLeave(dom.getDomById(item.id))
      }
    })
  })
  
  //dom操作事件
  dom.getDomById(item.id)?.addEventListener('click', () => {
    calcuator.analysisEachTimeInput(item)
  })
})


//切换主题动画
//默认启用浅色模式
animation.switchTheme({ toDark: false })

dom.toggle.sun.addEventListener("click", () => {
  animation.switchTheme({ toDark: false, btnDuration: 1, backgroundDuration: 1.5, calcuatorDuration: 0.5, calcuatorDelay: 0.005 })
})

dom.toggle.moon.addEventListener("click", () => {
  animation.switchTheme({ toDark: true, btnDuration: 1, backgroundDuration: 1.5, calcuatorDuration: 0.5, calcuatorDelay: 0.005 })
})
