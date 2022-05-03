module.exports = {
  content: ["./views/*.{html,js,ejs}"],
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['Montserrat'],
      'display' : ['"Major Mono Display"']
    }
  },
  plugins: [    require('@tailwindcss/forms')],
}
