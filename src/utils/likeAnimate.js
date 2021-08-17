export default {
  init: (parent,children) => {
    return
    // 添加元素
    // 创建元素
    let likeBox = ""
    let imgArr = [
      require("@/assets/likeanimate/1.png"),
      require("@/assets/likeanimate/2.png"),
      require("@/assets/likeanimate/3.png"),
      require("@/assets/likeanimate/4.png"),
      require("@/assets/likeanimate/5.png"),
      require("@/assets/likeanimate/6.png"),
      require("@/assets/likeanimate/7.png"),
      require("@/assets/likeanimate/8.png"),
      require("@/assets/likeanimate/9.png"),
      require("@/assets/likeanimate/10.png")
    ]
    if (!document.querySelector('.likeBox')) {
      likeBox = document.createElement('div')
      likeBox.className = "likeBox"
      // 创建动画父级
      document.documentElement.appendChild(likeBox)
    } else {
      likeBox = document.querySelector('.likeBox')
    }
    // 创建图片文件预先缓存
    let htmls = ""
    imgArr.forEach(item => {
      htmls += `<img src="${item}">`
    })
    likeBox.innerHTML = htmls
    // 点击父级
    let clickParent = document.querySelector('.' + parent)
    // 定义开启关闭定时器
    // let time1 = ""
    // let time2 = ""
    // 监听点击
    clickParent.addEventListener("click", (e) => {
      if (window.isLike) {
        return
      }
      let child = children.split(',')
      likeBox.innerHTML = htmls = ""
      imgArr.forEach(item => {
        htmls += `<img src="${item}">`
      })
      likeBox.innerHTML = htmls
      if (e.target.className == child[0] || e.target.className == child[1] || e.target.className == child[2]) {
        likeBox.style.left = e.target.x + 'px'
        likeBox.style.top = e.y - e.offsetY + 'px'
        let imgs = likeBox.querySelectorAll('img')
        imgs.forEach(item => {
          let random = Math.floor(Math.random()*(0 - 170) + 170)
          let length = Math.floor(Math.random()*(3 - 6) + 6)
          item.style.transform = `rotate(${random}deg) translate(-${length}rem, 0)`
          item.style.opacity = 1
          setTimeout(() => {
            item.style.transition = '1s linear';
            item.style.transform = `rotate(${random}deg) translate(-${length}rem, 0)`
            item.style.opacity = 0.2
            setTimeout(() => {
              item.style.transition = '0s linear';
              item.style.transform = `rotate(${random}deg) translate(-.98rem, 0)`
              item.style.opacity = 0
            }, 1000)
          })
        })
      }
    })
  }
}