import "../blocks/globals.css";
import ClientLayout from "../components/ClientLayout";

export const metadata = {
  title: "Ericky Dias | Full Stack Developer",
  description:
    "Portfolio of Ericky Dias — Full Stack Developer experienced in React, Next.js, TypeScript, Node.js, and MongoDB.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Open+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
