module.exports = {
  plugins: {
    tailwindcss: {},
    'postcss-px2vp': {
      unitToConvert: 'px',
      viewportWidth: 750,
      unitPrecision: 6,
      propList: ['*', '!--van*'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: ['van-'],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: [],
      landscape: false
    },
    autoprefixer: {},
  },
}
