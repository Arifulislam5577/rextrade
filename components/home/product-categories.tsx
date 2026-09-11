import { homeContent } from '@/data/content'

import { ProductCategoriesSlider } from '@/components/home/product-categories-slider'

export function ProductCategories() {
  const { productCategories } = homeContent

  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="scroll-mt-8 bg-linear-to-b from-white to-sky-50 py-20 lg:py-28"
    >
      <div className="main-container">
        <p className="eyebrow text-ink/50 text-center">{productCategories.eyebrow}</p>
        <h2 id="products-heading" className="section-heading mx-auto mt-4 max-w-3xl text-center">
          Nine categories, one <span className="text-sky-500">supplier.</span>
        </h2>
        <p className="section-lead mx-auto mt-3 max-w-xl text-center">{productCategories.lead}</p>

        <ProductCategoriesSlider categories={productCategories.categories} />
      </div>
    </section>
  )
}
