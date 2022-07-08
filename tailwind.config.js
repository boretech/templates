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
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
      }
    },
  },
  plugins: [],
}
