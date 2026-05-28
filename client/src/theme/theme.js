// src/theme/theme.js

export const theme = {
  layout: {
    appBg: "bg-gray-50 min-h-screen",
    container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    page: "min-h-screen py-6 space-y-6 bg-gray-50",
    section: "space-y-6",
  },

  text: {
    primary: "text-gray-900",
    secondary: "text-gray-600",
    muted: "text-gray-400",
    white: "text-white",
  },

  surface: {
    card: "bg-white rounded-2xl border border-gray-200 shadow-sm",
    navbar: "bg-white border-b border-gray-200",
    sidebar: "bg-slate-900",
  },

  card: {
    base: `
      bg-white
      border border-gray-200
      rounded-2xl
      shadow-sm
    `,
  },

  input: {
    base: `
      w-full
      border border-gray-300
      rounded-xl
      px-4 py-2.5
      outline-none
      focus:ring-2 focus:ring-indigo-500
    `,
  },

  button: {
    primary: `
      bg-indigo-600
      hover:bg-indigo-700
      text-white
      rounded-xl
      px-5 py-2.5
      transition-all
      duration-200
    `,
  },

  sidebar: {
    base: "bg-slate-900 text-gray-200",
    item: `
      flex items-center gap-3
      px-4 py-3 rounded-xl
      text-gray-300
      hover:bg-slate-800
      transition-all
    `,
    active: "bg-indigo-600 text-white",
  },
};
