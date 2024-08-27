import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: {
        'box-bg': '#221f1f',
        'message-bg-success': '#d4edda',
        'message-bg-error': '#f8d7da',
        'insert-modal-bg': '#181616',
        'main-color': '#2974f7',
      },
      maxWidth: {
        '150px': '150px',
        'insert': '500px',
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
        'login-form': '34px',
      },
      height: {
        'social-item': '30px',
        '100': '25rem',
        'insert-image': '762px',
        'login-image': '594px',
        'google-button': '50px',
        'sign-up-image': '714px',
        'gender-pages-image-mobile': '500px',
        'gender-pages-image': '700px'
      },
      width: {
        'social-item': '30px',
        'nav-header': '90%',
        'login-image': '384px',
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
        'text-color': '#ffffff',
        'main-color': '#2974f7',
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
      },
    },
  },
  plugins: [],
};
export default config;