module.exports = {
  content: ['./src/**/*.{js,vue}', './index.html'],
  theme: {
    extend: {
      keyframes: {
        'fade-out': {
          '0%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
          },
        },
      }
    },
  },
  plugins: [],
}
