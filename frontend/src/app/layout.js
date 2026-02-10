import "./globals.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export const metadata = {
  title: "Monitoring Dashboard",
  description: "Modern dashboard UI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-800">
        <div className="flex min-h-screen">
          <Sidebar />

          <main className="flex-1 p-8">
            <Header />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
