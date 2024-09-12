import Footer from "@/components/footer";
import { Banner } from "@/components/banner";
import HeaderAndVideo from "@/components/headerandvido";
import { InViewContextProvider } from "@/components/inviewcontext";
import { AppContextProvider } from "@/components/_context/appcontext";
import Header from "@/components/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col min-h-screen">
        <Banner />
        <InViewContextProvider>
        <Header />
         <section className="flex-1">
         {children}
         </section>
         <Footer />
         </InViewContextProvider>
    </main>

  );
}
