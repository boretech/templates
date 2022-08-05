import {  } from '../config'

//禁止页面拖动
const disablePageDragging = () => {
    document.addEventListener('touchmove', function (e) {
        e.preventDefault()
    }, { passive: false })
}

export {
    disablePageDragging
}