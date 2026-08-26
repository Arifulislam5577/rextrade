import { homeContent } from '@/data/content'

import { ProductCategoriesSlider } from '@/components/home/product-categories-slider'

export function ProductCategories() {
  const { productCategories } = homeContent

  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="bg-linear-to-b from-white to-sky-50 py-20 lg:py-28"
    >
      <div className="main-container">
        <p className="eyebrow text-ink/50 text-center">{productCategories.eyebrow}</p>
        <h2
          id="products-heading"
          className="font-display text-ink mx-auto mt-4 max-w-3xl text-center text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl"
        >
          Nine categories, one <span className="text-sky-500">supplier.</span>
        </h2>
        <p className="text-slate-body mx-auto mt-3 max-w-xl text-center text-base leading-relaxed text-pretty">
          {productCategories.lead}
        </p>

        <ProductCategoriesSlider categories={productCategories.categories} />
      </div>
    </section>
  )
}
