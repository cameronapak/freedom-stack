/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			container: {
				center: true,
				padding: '24px',
				maxWidth: '1000px',
			},
		},
	},
	plugins: [require("@tailwindcss/typography"), require("daisyui")],
}
