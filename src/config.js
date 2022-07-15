export const title = '集绿马拼图 赢社区惊喜礼包！'

export const serverPath = 'wx'

export const year = '2022'

export const custom = 'ganglv'

export const projectDate = '0520'

export const projectName = 'sign_vue'

export const cdn = `https://${serverPath}cdn.pannacloud.com/${year}/${custom}/${projectDate}_${projectName}/`

export const ftp = `/${serverPath}/${year}/${custom}/${projectDate}_${projectName}/`

export const audioData = {
    bgm: {
        src: new URL(`./assets/audio/bgm.mp3`, import.meta.url).href,
        local: '',
        control: ''
    },
}

export const audioBtn = {
    'music_open' : new URL('https://public.pannacloud.com/img/music-open.png', import.meta.url).href,
    'music_close' : new URL('https://public.pannacloud.com/img/music-close.png', import.meta.url).href,
}

// export const indexData = ['user', 'isscon']
export const indexData = []

export const aspx = `<%@ Page Language='C#' AutoEventWireup='true' CodeFile='index.aspx.cs' Inherits='_2022_ganglv_0520_sign_index' %>`

export const share = {
    title: title,
    desc: cdn,
    link: '',
    imgUrl: '',
    success() {
        console.log('分享成功');
    }
}

export default {
    title,
    share,
    cdn,
    ftp,
    audioData,
    audioBtn,
    indexData,
    aspx,

}
