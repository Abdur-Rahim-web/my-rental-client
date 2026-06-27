
import Hero from "@/components/home/Hero";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CustomerReviews from "@/components/home/CustomerReviews";
import ExtraSections from "@/components/home/ExtraSections";
import FeaturedProperties from "@/components/home/FeaturedProperties";

export default function HomePage() {

  return (
    <main className="w-full min-h-screen bg-background">
      <Hero />
      <FeaturedProperties  />
      <WhyChooseUs />
      <CustomerReviews />
      <ExtraSections />
    </main>
  );
}