import './globals.css';
import { Fraunces, Manrope, IBM_Plex_Mono, Noto_Sans_Thai, Noto_Sans_Khmer } from 'next/font/google';
import MotionProvider from '@/components/MotionProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const serif = Fraunces({ subsets:['latin'], variable:'--f-serif', display:'swap' });
const sans = Manrope({ subsets:['latin'], variable:'--f-sans', display:'swap' });
const mono = IBM_Plex_Mono({ subsets:['latin'], weight:['400','500'], variable:'--f-mono', display:'swap' });
const thai = Noto_Sans_Thai({ subsets:['thai'], weight:['400','600'], variable:'--f-thai', display:'swap' });
const khmer = Noto_Sans_Khmer({ subsets:['khmer'], weight:['400','600'], variable:'--f-khmer', display:'swap' });

export const metadata = {
  title: { default:'Witamala — AI innovation company', template:'%s — Witamala' },
  description: 'Witamala is an AI innovation company built from the Global South, on a Bangkok–Florianópolis axis. AI Innovation. Partnerships. Public Policy.',
  icons: { icon:'/brand/logo-favicon.svg' }
};
export const viewport = { themeColor:'#670A0A', width:'device-width', initialScale:1 };

export default function RootLayout({ children }) {
  const cls = [serif.variable, sans.variable, mono.variable, thai.variable, khmer.variable].join(' ');
  return (
    <html lang='en' className={cls}>
      <body>
        <MotionProvider>
          <a href='#main' className='skip'>Skip to content</a>
          <Header />
          <main id='main'>{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
