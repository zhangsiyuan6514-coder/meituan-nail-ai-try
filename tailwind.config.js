export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', 'SF Pro Text', 'system-ui', 'sans-serif']
      },
      colors: {
        glass: 'rgba(255,255,255,.58)',
        ink: '#17201b',
        mist: '#f5f6f4',
        sage: '#91bfa6'
      },
      boxShadow: {
        glass: '0 24px 70px rgba(35, 48, 42, .13)'
      }
    }
  },
  plugins: []
}
