import { CustomizationBand } from '@/components/home/customization-band'
import { FeaturedProducts } from '@/components/home/featured-products'
import { FinalCta } from '@/components/home/final-cta'
import { GiftSolutions } from '@/components/home/gift-solutions'
import { Hero } from '@/components/home/hero'
import { IndustriesServed } from '@/components/home/industries-served'
import { ProductCategories } from '@/components/home/product-categories'
import { SupplyProcess } from '@/components/home/supply-process'
import { TrustStrip } from '@/components/home/trust-strip'
import { WhoWeAre } from '@/components/home/who-we-are'
import { WhyChooseUs } from '@/components/home/why-choose-us'

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <TrustStrip />
      <WhoWeAre />
      <ProductCategories />
      <FeaturedProducts />
      <CustomizationBand />
      <GiftSolutions />
      <SupplyProcess />
      <IndustriesServed />
      <WhyChooseUs />
      <FinalCta />
    </main>
  )
}
