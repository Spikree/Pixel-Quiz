/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pixelify : ['"Pixelify Sans"', "sans-serif"], 
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
		border: 'hsl(var(--border))',
		input: 'hsl(var(--input))',
		ring: 'hsl(var(--ring))',
		background: 'hsl(var(--background))',
		foreground: 'hsl(var(--foreground))',
		primary: {
			DEFAULT: 'hsl(var(--primary))',
			foreground: 'hsl(var(--primary-foreground))'
		},
		secondary: {
			DEFAULT: 'hsl(var(--secondary))',
			foreground: 'hsl(var(--secondary-foreground))'
		},
		destructive: {
			DEFAULT: 'hsl(var(--destructive))',
			foreground: 'hsl(var(--destructive-foreground))'
		},
		muted: {
			DEFAULT: 'hsl(var(--muted))',
			foreground: 'hsl(var(--muted-foreground))'
		},
		accent: {
			DEFAULT: 'hsl(var(--accent))',
			foreground: 'hsl(var(--accent-foreground))'
		},
		popover: {
			DEFAULT: 'hsl(var(--popover))',
			foreground: 'hsl(var(--popover-foreground))'
		},
		card: {
			DEFAULT: 'hsl(var(--card))',
			foreground: 'hsl(var(--card-foreground))'
		},
		pixel: {
			'brown': '#8B5927',
			'green': '#5B8731',
			'dark-green': '#3B5923',
			'dirt': '#8F7748',
			'stone': '#7F7F7F',
			'blue': '#3C44AA',
			'light-blue': '#7FB2F0',
			'black': '#191919',
			'white': '#F8F8F8',
		},
		minecraft: {
			'grass': '#7FB238',
			'dirt': '#8F7748',
			'stone': '#7F7F7F',
			'wood': '#866526',
			'leaves': '#6AAC2D',
			'water': '#3F76E4',
		}
	},
	fontFamily: {
		'pixel': ['"Press Start 2P"', 'cursive'],
		'minecraft': ['"VT323"', 'monospace'],
	},
	borderRadius: {
		lg: 'var(--radius)',
		md: 'calc(var(--radius) - 2px)',
		sm: 'calc(var(--radius) - 4px)',
	},
	keyframes: {
		'accordion-down': {
			from: { height: '0' },
			to: { height: 'var(--radix-accordion-content-height)' },
		},
		'accordion-up': {
			from: { height: 'var(--radix-accordion-content-height)' },
			to: { height: '0' },
		},
		'pixel-bounce': {
			'0%, 100%': { transform: 'translateY(0)' },
			'50%': { transform: 'translateY(-4px)' },
		},
		'pixel-appear': {
			'0%': { transform: 'scale(0)' },
			'80%': { transform: 'scale(1.1)' },
			'100%': { transform: 'scale(1)' },
		},
		'pixel-fade': {
			'0%': { opacity: '0' },
			'100%': { opacity: '1' },
		},
	},
	animation: {
		'accordion-down': 'accordion-down 0.2s ease-out',
		'accordion-up': 'accordion-up 0.2s ease-out',
		'pixel-bounce': 'pixel-bounce 0.5s ease-in-out',
		'pixel-appear': 'pixel-appear 0.3s ease-out',
		'pixel-fade': 'pixel-fade 0.3s ease-in',
	},
	backgroundImage: {
		'pixel-pattern': "url('/pixel-bg.png')",
	},
    },
  },
  plugins: [require("tailwindcss-animate")],
};
