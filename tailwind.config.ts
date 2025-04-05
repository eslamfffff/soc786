
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				quiz: {
					correct: 'rgba(74, 222, 128, 0.7)',
					incorrect: 'rgba(248, 113, 113, 0.7)',
					neutral: 'rgba(203, 213, 225, 0.1)',
					hover: 'rgba(186, 230, 253, 0.2)',
					timer: 'rgba(59, 130, 246, 0.9)'
				},
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
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			boxShadow: {
				glow: '0 0 15px rgba(59, 130, 246, 0.5)',
				'glow-gold': '0 0 20px rgba(245, 158, 11, 0.6)',
				'glow-red': '0 0 15px rgba(239, 68, 68, 0.5)',
				'glow-gray': '0 0 12px rgba(156, 163, 175, 0.4)',
				'glow-success': '0 0 15px rgba(16, 185, 129, 0.6)',
				'glow-info': '0 0 15px rgba(6, 182, 212, 0.6)',
				'inner-glow': 'inset 0 0 20px rgba(255, 255, 255, 0.2)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(10px)' }
				},
				'pulse-light': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'timer-bar': {
					'0%': { width: '100%' },
					'100%': { width: '0%' }
				},
				'glow-pulse': {
					'0%, 100%': { boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)' },
					'50%': { boxShadow: '0 0 20px rgba(255, 255, 255, 0.8)' }
				},
				'star-shine': {
					'0%, 100%': { filter: 'brightness(1)' },
					'50%': { filter: 'brightness(1.5)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-out': 'fade-out 0.5s ease-out',
				'pulse-light': 'pulse-light 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'scale-in': 'scale-in 0.3s ease-out',
				'timer-bar': 'timer-bar linear',
				'glow-pulse': 'glow-pulse 2s infinite',
				'star-shine': 'star-shine 1.5s ease-in-out infinite'
			},
			fontFamily: {
				'inter': ['Inter', 'system-ui', 'sans-serif'],
				'cairo': ['Cairo', 'system-ui', 'sans-serif'],
			},
			spacing: {
				'18': '4.5rem',
				'22': '5.5rem',
			},
			transitionProperty: {
				'size': 'height, width',
			},
			backgroundImage: {
				'gradient-blue': 'linear-gradient(90deg, hsla(221, 45%, 73%, 1) 0%, hsla(220, 78%, 29%, 1) 100%)',
				'gradient-warm': 'linear-gradient(90deg, hsla(39, 100%, 77%, 1) 0%, hsla(22, 90%, 57%, 1) 100%)',
				'gradient-green': 'linear-gradient(90deg, hsla(139, 70%, 75%, 1) 0%, hsla(63, 90%, 76%, 1) 100%)',
				'gradient-gold': 'linear-gradient(135deg, #ffd700 0%, #ffcc33 100%)',
				'gradient-red': 'linear-gradient(135deg, #ff4e50 0%, #f9d423 100%)',
				'gradient-gray': 'linear-gradient(135deg, #808080 0%, #a9a9a9 100%)',
				'history-bg-light': 'linear-gradient(135deg, #ffecc7 0%, #d0b978 100%)',
				'history-bg-dark': 'linear-gradient(135deg, #3d3114 0%, #5e4a1c 100%)',
				'geography-bg-light': 'linear-gradient(135deg, #e0f7fa 0%, #80cbc4 100%)',
				'geography-bg-dark': 'linear-gradient(135deg, #0d3331 0%, #164e4a 100%)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
