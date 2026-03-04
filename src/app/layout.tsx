import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ProjectProvider } from "@/context/ProjectContext";
import { ToastProvider } from "@/context/ToastContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Obras Manizales | Visor Estratégico",
  description: "Portal de seguimiento y transparencia de obras públicas de la ciudad de Manizales.",
  icons: {
    icon: '/favicon.png?v=2',
    shortcut: '/favicon.png?v=2',
    apple: '/favicon.png?v=2',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased font-sans`}
      >
        <ToastProvider>
          <ProjectProvider>
            {children}
          </ProjectProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
