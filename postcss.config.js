module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-px2vp': {
      unitToConvert: 'px',
      viewportWidth: 750,
      unitPrecision: 6,
      propList: ['*'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: [],
      landscape: false
    },
  },
}
