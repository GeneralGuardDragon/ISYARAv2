import Header from "./components/Header";
import FeatureGrid from "./components/FeatureGrid";
import FooterNav from "./components/FooterNav";
import BannerCarousel from "./components/BannerCarousel";

export default function HomePage() {
  return (
    <div>
      <div className="flex flex-col min-h-screen justify-between bg-gradient-to-b from-white to-sky-100">
        <Header />

        <main className="items-center px-50 py-40 space-y-5">
          <BannerCarousel />
          <FeatureGrid />
        </main>

        <FooterNav />
      </div>
    </div>
  );
}
