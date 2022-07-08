export const title = '111'

export const serverPath = 'wx'

export const year = '2022'

export const custom = 'dev'

export const projectDate = '0501'

export const projectName = 'development'

export const cdn = `https://${serverPath}cdn.pannacloud.com/${year}/${custom}/${projectDate}_${projectName}/`

export const ftp = `/${serverPath}/${year}/${custom}/${projectDate}_${projectName}/`

export const audioData = {
    bgm: {
        src: '/src/assets/audio/bgm.mp3',
        local: '',
        control: ''
    },
    2: {
        src: '/src/assets/audio/bgm1.mp3',
        local: '',
        control: ''
    },
}

export const audioBtn = {
    'music_open' : 'https://public.pannacloud.com/img/music-open.png',
    'music_close' : 'https://public.pannacloud.com/img/music-close.png',
}

export const indexData = ['user', 'isscon']

export const aspx = `<%@ Page Language='C#' AutoEventWireup='true' CodeFile='index.aspx.cs' Inherits='_2022_biguiyuan_0627_draw_index' %>`

export const share = {
    title: '',
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
