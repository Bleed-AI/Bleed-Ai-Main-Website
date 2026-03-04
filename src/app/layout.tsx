import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import PopupNotifications from "@/components/PopupNotifications";
import Preloader from "@/components/Preloader";
import NavigationProgress from "@/components/NavigationProgress";
import { generateMetadata, organizationSchema, viewport as defaultViewport } from "@/lib/seo";
import "./globals.css";

export const viewport: Viewport = defaultViewport;

export const metadata: Metadata = generateMetadata({
  title: "BleedAI | AI-Powered Outbound Marketing That Drives Revenue",
  description: "AI-powered outbound campaigns that convert. Free pilot available. Get market validation, expert strategy, and proven results. Start in 1 week.",
  path: "/",
  keywords: [
    "AI outbound marketing",
    "lead generation",
    "outbound campaigns",
    "B2B marketing",
    "email campaigns",
    "sales automation",
    "AI marketing",
    "outbound infrastructure",
    "signal campaigns",
    "pilot campaign"
  ],
});

// Script to set theme before hydration to prevent flash
const themeScript = `
  (function() {
    const theme = localStorage.getItem('bleedai-theme') || 'dark';
    document.documentElement.classList.add(theme);
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />

        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-EV5EF53JYP"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-EV5EF53JYP');
            `
          }}
        />

        {/* RB2B Visitor Tracking */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(key) {if (window.reb2b) return;window.reb2b = {loaded: true};var s = document.createElement("script");s.async = true;s.src = "https://b2bjsstore.s3.us-west-2.amazonaws.com/b/" + key + "/" + key + ".js.gz";document.getElementsByTagName("script")[0].parentNode.insertBefore(s, document.getElementsByTagName("script")[0]);}("4N210H5LZL6Z");`
          }}
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body className="antialiased bg-white dark:bg-[#050508] text-black dark:text-white transition-colors" suppressHydrationWarning>
        <ThemeProvider>
          <Preloader />
          <NavigationProgress />
          {children}
          <PopupNotifications />
        </ThemeProvider>
      </body>
    </html>
  );
}
