import type { Metadata } from "next";
import "./globals.css";
import "./custom.css";
import enMessages from "../../messages/en.json";
import { I18nProvider } from "@/app/i18n-provider";
import ErrorBoundary from "@/app/components/ErrorBoundary";
import ClassicControls from "@/app/components/classiccontrols/ClassicControls";
import MainShell from "@/app/MainShell";

export const metadata: Metadata = {
  title: {
    default: "Xscriptor Colors",
    template: "%s | Xscriptor Colors",
  },
  description:
    "Open-source resources from the Xscriptor Colors organization — themes, tools, and customizations for VS Code, JetBrains, Obsidian, terminal, and more.",
  keywords: [
    "Xscriptor",
    "themes",
    "colors",
    "VS Code",
    "JetBrains",
    "Obsidian",
    "terminal",
    "open-source",
  ],
  authors: [{ name: "Xscriptor Colors" }],
  openGraph: {
    title: "Xscriptor Colors",
    description:
      "Open-source resources from the Xscriptor Colors organization — themes, tools, and customizations.",
    siteName: "Xscriptor Colors",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark');else document.documentElement.classList.add('light')}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-yellow-400 focus:text-black focus:font-bold focus:rounded">
          Skip to content
        </a>
        <ErrorBoundary>
          <I18nProvider locale="en" messages={enMessages}>
            <MainShell>{children}</MainShell>
            <ClassicControls />
          </I18nProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
