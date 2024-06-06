/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        'sky-blue': '#BEE2FD',
        'light-blue': '#ABBCFF',
        'brilliant': '#164A8A',
        'grey': '#374151',
        'light-grey': '#F8F9FF',
        'red-err': '#d71d30',
        'denim' : '#022959',
        'my-purple': '#483EFF',
        'mbg': '#EFF5FF',
        'bc': '#D6D9E6'
      },
      fontFamily: {
        sans: ['Ubuntu', 'sans-serif'],
      },
      screens: {
        mobile: {'max': '768px'},
        tablet: {'min': '768px'},
        desktop: {'min': '992px'}
      },
      backgroundImage: {
        'header-mobile': "url('assets/images/bg-sidebar-mobile.svg')",
        'header-tablet': "url('assets/images/bg-sidebar-desktop.svg')"
      },
      boxShadow: {
        'ninja': '0px 25px 40px -20px rgba(0, 0, 0, 0.10)'
      },
      minHeight: {
        'form': 'calc(100vh - 100px)',
      }
    },
  },
  plugins: [],
}

