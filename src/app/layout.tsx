import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layouts/Navbar";
import { ThemeProvider } from "../components/theme-provider";
import Footer from "../components/layouts/Footer";
import { siteUrl } from "../lib/site-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: siteUrl,

  title: {
    default: "Chakriova - বাংলাদেশের চাকরি প্রস্তুতির প্ল্যাটফর্ম",
    template: "%s | Chakriova",
  },

  description:
    "বাংলাদেশের সরকারি চাকরি, ব্যাংক, NTRCA ও অন্যান্য প্রতিযোগিতামূলক পরীক্ষার প্রস্তুতি নিন MCQ প্র্যাকটিস, মডেল টেস্ট, অনলাইন পরীক্ষা ও গুরুত্বপূর্ণ নোটের মাধ্যমে।",

  applicationName: "Chakriova",

  keywords: [
    "Chakriova",
    "চাকরির প্রস্তুতি",
    "বাংলাদেশ চাকরি প্রস্তুতি",
    "সরকারি চাকরির প্রস্তুতি",
    "ব্যাংক জব প্রস্তুতি",
    "NTRCA প্রস্তুতি",
    "চাকরির MCQ",
    "অনলাইন মডেল টেস্ট",
    "বিসিএস প্রস্তুতি",
    "বাংলা ব্যাকরণ MCQ",
    "English grammar MCQ",
    "সাধারণ জ্ঞান",
    "ICT MCQ",
    "job preparation Bangladesh",
    "online exam Bangladesh",
  ],

  authors: [{ name: "Chakriova Team" }],

  creator: "Chakriova",
  publisher: "Chakriova",

  alternates: {
    canonical: "/",
    languages: {
      "bn-BD": "/",
      "en": "/en",
    },
  },

  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "/",
    siteName: "Chakriova",
    title: "Chakriova - বাংলাদেশের চাকরি প্রস্তুতির প্ল্যাটফর্ম",
    description:
      "MCQ প্র্যাকটিস, মডেল টেস্ট, গুরুত্বপূর্ণ নোট ও অনলাইন পরীক্ষার মাধ্যমে চাকরির প্রস্তুতি নিন।",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Chakriova - Job Preparation Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Chakriova - বাংলাদেশের চাকরি প্রস্তুতির প্ল্যাটফর্ম",
    description:
      "চাকরির প্রস্তুতির জন্য MCQ, মডেল টেস্ট, নোট ও অনলাইন পরীক্ষা।",
    images: ["/opengraph-image"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "education",
};


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">



        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}

          <Footer />


        </ThemeProvider>



      </body>
    </html>
  );
}
