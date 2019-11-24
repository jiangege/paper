const invertImgs = (function() {
  const invertImg = img => img.style.filter = img.style.filter !== "invert(100%)" ? "invert(100%)" : ""
  const invertImgs = imgs => Array.prototype.forEach.call(imgs, invertImg)
  return invertImgs
})()

function Darkmode() {
  this.mask = document.getElementById('darkmode-mask')
  this.imgs = document.getElementsByTagName('img')
}
Darkmode.prototype.turnOnDarkmode = function() {
  // fix chrome bug
  document.querySelector('html').style.background = '#ffffff'
  this.mask.classList.add('darkmode-mask--dark');
  // invert the images color
  // so that they can render with the right color
  invertImgs(this.imgs)
}
Darkmode.prototype.turnOffDarkmode = function() {
  this.mask.classList.remove('darkmode-mask--dark');
  invertImgs(this.imgs)
}


window.addEventListener('DOMContentLoaded', () => {
  // darkmode
  const checkbox = document.querySelector('input[name=mode]')
  const darkmode = new Darkmode()
  checkbox.addEventListener('change', function() {
    if(this.checked) {
      darkmode.turnOnDarkmode()
    } else {
      darkmode.turnOffDarkmode()
    }
  })

  // sidebar
  ;(function() {
    let toggle = true
    const sidebar = document.querySelector('.sidebar')
    const sidebarButton = document.querySelector('.sidebar__button')
    sidebar.addEventListener('touchmove', function(e) {
      e.stopPropagation()
    })

    sidebarButton.addEventListener('click', function() {
      toggle ? sidebar.classList.add('sidebar--expend') : sidebar.classList.remove('sidebar--expend')
      toggle ? sidebarButton.classList.add('sidebar__button--expend') : sidebarButton.classList.remove('sidebar__button--expend')

      toggle = !toggle
    })
  })()
})