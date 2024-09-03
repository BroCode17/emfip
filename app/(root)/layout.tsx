import Footer from "@/components/footer";
import { Banner } from "@/components/banner";
import HeaderAndVideo from "@/components/headerandvido";
import { InViewContextProvider } from "@/components/inviewcontext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Banner />
      <InViewContextProvider>
        <HeaderAndVideo />
        {children}
        <Footer />
      </InViewContextProvider>
    </>

  );
}
