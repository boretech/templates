module.exports = {
  plugins: {
    tailwindcss: {},
    'postcss-px2vp': {
      unitToConvert: 'px',
      viewportWidth: 750,
      unitPrecision: 4,
      propList: ['*', 'border', '!--tw-*', '!--van-*'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: ['van-', 'ig-'],
      minPixelValue: 2,
      mediaQuery: false,
      replace: true,
      exclude: [],
      landscape: false,
      landscapeUnit: 'vw',
      landscapeWidth: 568
    },
    'postcss-preset-env': {}
  }
}
