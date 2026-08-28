import { homeContent } from '@/data/content'

import { SupplyProcessTimeline } from '@/components/home/supply-process-timeline'

export function SupplyProcess() {
  const { supplyProcess } = homeContent

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="bg-linear-to-b from-sky-50 to-white py-20 lg:py-28"
    >
      <div className="main-container">
        <p className="eyebrow text-ink/50 text-center">{supplyProcess.eyebrow}</p>
        <h2 id="process-heading" className="section-heading mx-auto mt-4 max-w-3xl text-center">
          You know where the <span className="text-sky-500">order stands</span> at each one
        </h2>
        <p className="section-lead mx-auto mt-3 max-w-3xl text-center">{supplyProcess.lead}</p>

        <SupplyProcessTimeline steps={supplyProcess.steps} />
      </div>
    </section>
  )
}
