import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: {
        'box-bg-light': '#f0f0f0',
        'box-bg-dark': '#221f1f',
        'body-bg-light': '#ffffff',
        'body-bg-dark': '#181616',
        'message-bg-success': '#d4edda',
        'message-bg-error': '#f8d7da',
        'insert-modal-bg': '#181616',
        'main-color-light': '#2974f7',
        'main-color-dark': '#1e40af',
        'gender-bg': '#25262A',
        'contact-form-light': '#ffffff',
        'contact-form-dark': '#221f1f',
        'contact-info-light': '#ffffff',
        'contact-info-dark': '#221f1f',
        'insert-light': '#ffffff',
        'insert-dark': '#221f1f',
        'users-light': '#ffffff',
        'users-dark': '#221f1f',
      },
      maxWidth: {
        '150px': '150px',
        'insert': '500px',
        'last': '1240px',
      },
      minWidth: {
        'insert-image': '1000px',
      },
      margin: {
        'footer-logo': '-2.5rem',
      },
      padding: {
        'copyright': '10px',
        'insert-form': '54px',
        'login-form': '35.5px',
      },
      height: {
        'social-item': '30px',
        '100': '25rem',
        'insert-image': '762px',
        'login-image': '594px',
        'google-button': '50px',
        'sign-up-image': '766px',
        'gender-pages-image-mobile': '500px',
        'gender-pages-image': '700px',
        'gender-item': '208px',
        'contact-info': '664px',
        'forgot-password-image': '456px',
        'reset-password-image': '456px',
      },
      width: {
        'social-item': '30px',
        'nav-header': '90%',
        'login-image': '384px',
        'gender-item': '430px',
        'forgot-password-image': '384px',
        'reset-password-image': '384px'
      },
      borderRadius2: {
        'social-item': '50%',
      },
      textColor: {
        'main-color': '#2974f7',
        'message-color-success': '#155724',
        'message-color-error': '#721c24',
      },
      colors: {
        'text-color-light': '#ffffff',
        'text-color-dark': '#e0e0e0',
        'main-color-light': '#2974f7',
        'main-color-dark': '#1e40af',
        'drop-color': '#aaaaaa',
        'select-color': '#aaaaaa',
        'message-border-success': '#c3e6cb',
        'message-border-error': '#f5c6cb',
      },
      fontSize: {
        'main-size': '16px',
        'logo-footer': '25px',
      },
      borderColor: {
        'body-bg': '#181616',
        'insert-border': '#ffffff',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        'main-color': '#2974f7',
        'color-light': '#f0f0f0'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      gap: {
        'insert': '50px',
      },
      borderWidth: {
        'insert': '1px',
      },
      top: {
        'reproduction': '33px',
      },
      left: {
        'reproduction': '33px',
      },
      translate: {
        '1/2': '-50%',
      },
      transitionDuration: {
        '500': '500ms',
      },
      screens: {
        'insert-image': '1000px',
        'terms-privacy': '1400px',
        'gender-item': '1550px',
        'dashboard-user': '1300px'
      },
      ringColor: {
        'main-color': '#2974f7'
      },
      keyframes: {
        skeletonFade: {
          '0%': { opacity: '0.4' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0.4' },
        },
      },
      animation: {
        'skeleton-fade': 'skeletonFade 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;