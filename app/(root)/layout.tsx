import Footer from "@/components/footer";
import Header from "@/components/shared/header";
import { protectRoute } from "@/lib/protect-route";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await protectRoute();
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1 wrapper">
        {children}
      </main>
      <Footer />
    </div>
  );
}