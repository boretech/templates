const { addDynamicIconSelectors } = require('@iconify/tailwind');

module.exports = {
  content: ['./index.html', './src/**/*.{js,vue}'],
  theme: {
    extend: {},
  },
  plugins: [
    addDynamicIconSelectors({
      prefix: 'i'
    })
  ],
}

