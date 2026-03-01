import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        customBlue: '#8653FF',
        customPink: '#00DAE5',
        darkBlue: '#534988',
        customOrange: '#FF9580',
        cardbg: '#EDE9FA',
        purple: '#D2C7F3',
        blue: '#5553C4',
        darkpurple: '#685AAD',
        purpleBtn: '#DBCAFF',
        btnbg: '#9184F0',
        questionbg: '#EDE8FA',
        lightpurple: '#9B85C8',
        formpurple: '#8458F8',
        lightgray: '#534988',
        lightblue: '#635BFF',
        reviewbg: '#DAD1F2',
        color2: '#6B5692',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      fontFamily: {
        roboto: ['var(--font-roboto-condensed)', 'sans-serif'],
        azonix: ['azonix'],
        roboto_medium: ['roboto_medium'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'slide-in-left': {
          '0%': {
            opacity: '0',
            transform: 'translateX(-50px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'slide-in-right': {
          '0%': {
            opacity: '0',
            transform: 'translateX(50px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'text-reveal': {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-in-delay': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '50%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'bounce-subtle': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-5px)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        'card-appear': {
          '0%': {
            opacity: '0',
            transform: 'translateY(50px) scale(0.9)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0) scale(1)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.8s ease-out',
        'slide-in-left': 'slide-in-left 1s ease-out',
        'slide-in-right': 'slide-in-right 1s ease-out',
        'text-reveal': 'text-reveal 1.2s ease-out',
        'fade-in-delay': 'fade-in-delay 1.5s ease-out',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        'card-appear': 'card-appear 0.8s ease-out forwards',
      },
    },
    screens: {
      sm: {
        min: '640px',
      },
      md: {
        min: '768px',
      },
      'custom-lg': {
        min: '1024px',
      },
      'custom-xl': {
        min: '1280px',
      },
      'custom-2xl': {
        min: '1536px',
      },
      'custom-nav': {
        min: '1140px',
      },
      mb: {
        min: '280px',
        max: '1000px',
      },
      tb: {
        min: '600px',
        max: '1000px',
      },
      lg: {
        min: '1000px',
        max: '1300px',
      },
      xl: {
        min: '1300px',
        max: '1700px',
      },
      '2xl': {
        min: '1600px',
      },
      '3xl': {
        min: '1920px',
      },
    },
  },
  plugins: [require('tailwind-scrollbar'), require('tailwindcss-animate')],
};

export default config;
