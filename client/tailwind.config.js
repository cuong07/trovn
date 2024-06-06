/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            height: {
                "custom-calc": "calc(100% - 80px)",
            },
            borderRadius: {
                "payment-img": "37% 58% 42% 63% / 51% 49% 70% 30%",
            },
        },
    },

    plugins: [],
};
