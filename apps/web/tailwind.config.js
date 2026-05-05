module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FDFCF8",
        surface: "#F4F1EB",
        primary: "#5B7FA6",
        accent: "#C9965A",
        text: "#2C2C2C",
        muted: "#6B7280",
        border: "#E5E0D8"
      },
      fontFamily: {
        heading: ["Fraunces", "serif"],
        body: ["DM Sans", "sans-serif"]
      }
    }
  },
  plugins: []
};
