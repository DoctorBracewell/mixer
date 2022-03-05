const config = {
  content: ["./src/**/*.{html,js,svelte,ts}", "./index.html"],

  theme: {
    extend: {
      fontFamily: {
        serif: ["Josefin Slab", "serif"],
      },
      colors: {
        orange: "#ff7d25",
      },
    },
  },

  plugins: [],
};

module.exports = config;
