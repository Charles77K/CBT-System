/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				brandBlue: "#3385ff",
				brandWhite: " #ffffff",
				brandGrey: "#999999",
			},
			screens: {
				sm: "480px",
				md: "760px",
				lg: "1080px",
				xl: "1280px",
			},
			keyframes: {
				scroll: {
					"0%": { transform: "translateX(100%)" },
					"100%": { transform: "translateX(-100%)" },
				},
			},
			animation: {
				scroll: "scroll 20s linear infinite",
			},
		},
	},
	plugins: [],
};
