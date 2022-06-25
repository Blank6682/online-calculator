import { gsap } from 'gsap';
import CSSRulePlugin from 'gsap/CSSRulePlugin';
import data from './data';
import css from './css';

//初始化gsap CSSRulePlugin 用于获取伪元素
gsap.registerPlugin(CSSRulePlugin)

class Animation {
  constructor() {

  }
  //btn 操作动画
  btnPress(dom) {
    if (dom) {
      dom.classList.remove('mousedown')
      dom.classList.add('mousedown')
    } else {
      throw Error("cannot find dom!")
    }
  }
  btnLeave(dom) {
    if (dom) {
      dom.classList.remove('mousedown')
    } else {
      throw Error("cannot find dom!")
    }
  }

  //主题动画切换
  /**
   * @description 切换主题动画
   * @param {*} toDark 是否启用深色
   * @param {*} btnDuration 按钮动画时间
   * @param {*} backgroundDuration 背景动画时间
   * @param {*} calcuatorDuration 计算器动画时间
   * @param {*} calcuatorDelay 计算器动画延迟时间
   */
  switchTheme({ toDark = true, btnDuration = 0, backgroundDuration = 0, calcuatorDuration = 0, calcuatorDelay = 0 }) {
    if (toDark) {
      this.switchBtnToDark({ duration: btnDuration })
      this.switchBackgroundToDark({ duration: backgroundDuration })
      this.calcuatorToDark({ duration: calcuatorDuration, delay: calcuatorDelay })
    } else {
      this.switchBtnToLight({ duration: btnDuration })
      this.switchBackgroundToLight({ duration: backgroundDuration })
      this.calcuatorToLight({ duration: calcuatorDuration, delay: calcuatorDelay })
    }
  }

  //切换深色主题
  switchBtnToDark({ tween = gsap.timeline(), duration = 0 }) {
    tween.to('#moon', { duration, ease: 'power2', y: 40, opacity: 0, display: 'none' })

    tween.to('#sun', { duration: 0, ease: 'power2', y: -40, opacity: 0, display: 'none' })

    tween.to('#sun', { duration, ease: 'power2', y: 0, opacity: 1, display: 'block' })
  }

  switchBackgroundToDark({ tween = gsap.timeline(), duration = 0 }) {
    tween.to('body', { duration, background: css.darkPrimaryColor })
  }

  //计算器变深色主题
  calcuatorToDark({ tween = gsap.timeline(), duration = 0, delay = 0 }) {
    this.calcuatorBackgroundToDark({ tween, duration })
    this.calcuatorBtnToDark({ tween, duration, delay })
  }

  //背景
  calcuatorBackgroundToDark({ tween = gsap.timeline(), duration = 0 }) {
    tween.to('.calculator', { duration, boxShadow: css.darkCalculatorBgShadow })
  }

  //按钮
  calcuatorBtnToDark({ duration = 0, delay = 0 }) {
    //数据做反转实现深色按钮反向
    [...data.orderList].reverse().forEach((btnInfo, index) => {
      //基层
      this.calcuatorBtnBaseToDark({ btnInfo, duration, delay: delay * index })
      //before 
      this.calcuatorBtnBeforeToDark({ btnInfo, duration, delay: delay * index })
    })
  }

  calcuatorBtnBaseToDark({ tween = gsap.timeline(), btnInfo, duration = 0, delay = 0 }) {
    const id = `#${btnInfo.id}`
    let baseBg = css.darkSpanBackground
    switch (btnInfo.id) {
      case 'clear':
        baseBg = css.clearDeepColor
        break;
      case 'delete':
        baseBg = css.deleteDeepColor
        break;
      case 'equal':
        baseBg = css.equalDeepColor
        break;
    }
    tween.to(id, { duration, delay, background: baseBg })
  }

  calcuatorBtnBeforeToDark({ tween = gsap.timeline(), btnInfo, duration = 0, delay = 0 }) {
    //使用CSSRulePlugin 获取伪元素
    const beforeId = CSSRulePlugin.getRule(`#${btnInfo.id}::before`)
    tween.to(beforeId, {
      duration,
      delay,
      color: css.darkTextColor,
      textShadow: css.darkTextShadow,
      background: css.darkSpanBeforeBackgroundLinear,
      boxShadow: css.darkSpanBeforeBoxShadow,
      borderTop: css.darkSpanBeforeBorder,
      borderBottom: css.darkSpanBeforeBorder,
      borderLeft: css.darkSpanBeforeBorder,
    })
  }


  //切换浅色主题
  switchBtnToLight({ tween = gsap.timeline(), duration = 0 }) {
    tween.to('#sun', { duration, ease: 'power2', y: 40, opacity: 0, display: 'none' })

    tween.to('#moon', { duration: 0, ease: 'power2', y: -40, opacity: 0, display: 'none' })

    tween.to('#moon', { duration, ease: 'power2', y: 0, opacity: 1, display: 'block' })
  }

  switchBackgroundToLight({ tween = gsap.timeline(), duration = 0 }) {
    tween.to('body', { duration, background: css.lightPrimaryColor })
  }

  //计算器变浅色主题
  calcuatorToLight({ duration = 0, delay = 0 }) {
    this.calcuatorBackgroundToLight({ duration })
    this.calcuatorBtnToLight({ duration, delay })
  }

  //计算器背景变浅色
  calcuatorBackgroundToLight({ tween = gsap.timeline(), duration = 0 }) {
    tween.to('.calculator', { duration, boxShadow: css.lightCalculatorBgShadow })
  }

  //按钮
  calcuatorBtnToLight({ duration = 0, delay = 0 }) {

    data.orderList.forEach((btnInfo, index) => {
      //基层
      this.calcuatorBtnBaseToLight({ btnInfo, duration, delay: delay * index })
      //before
      this.calcuatorBtnBeforeToLight({ btnInfo, duration, delay: delay * index })

    })

  }

  calcuatorBtnBaseToLight({ tween = gsap.timeline(), btnInfo, duration = 0, delay = 0 }) {
    const id = `#${btnInfo.id}`
    let baseBg = css.lightSpanBackgroundLinear
    switch (btnInfo.id) {
      case 'clear':
        baseBg = css.clearColor
        break;
      case 'delete':
        baseBg = css.deleteColor
        break;
      case 'equal':
        baseBg = css.equalColor
        break;
    }
    tween.to(id, { duration, delay, background: baseBg })
  }

  calcuatorBtnBeforeToLight({ tween = gsap.timeline(), btnInfo, duration = 0, delay = 0 }) {
    const beforeId = CSSRulePlugin.getRule(`#${btnInfo.id}::before`)
    tween.to(beforeId, {
      duration,
      delay,
      color: css.lightTextColor,
      textShadow: css.lightTextShadow,
      background: css.lightSpanBeforeBackgroundLinear,
      boxShadow: css.lightSpanBeforeBoxShadow,
      borderTop: css.lightSpanBeforeBorder,
      borderBottom: css.lightSpanBeforeBorder,
      borderLeft: css.lightSpanBeforeBorder,
    })
  }
}

export default new Animation() 
