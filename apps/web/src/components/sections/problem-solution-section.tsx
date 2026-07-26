import { ShieldAlert, Flame, Sprout, Heart, Compass } from "lucide-react"
import Container from "@/components/shared/layout/container"

export default function ProblemSolutionSection() {
  const problems = [
    {
      title: "Sedentary City Life",
      desc: "Modern professionals spend 90% of their time sitting, leading to widespread metabolic health issues.",
    },
    {
      title: "Logistics Carbon Footprint",
      desc: "Average store-bought salads travel over 1,500 miles, creating excessive emissions and losing fresh nutrients.",
    },
    {
      title: "Urban Loneliness & Waste",
      desc: "City dwellers often lack community roots, while food surplus ends up in landfills instead of supporting local food banks.",
    },
  ]

  const solutions = [
    {
      title: "Eco-Gym Workouts",
      desc: "Watering plants, lifting soil bags, and tilling balcony beds burn up to 400 kcal per hour — a productive full-body exercise.",
      icon: Flame,
    },
    {
      title: "Balcony Micro-Farming",
      desc: "Produce organic tomatoes, spinach, and herbs right at home with 0% logistics emissions and 100% nutritional retention.",
      icon: Sprout,
    },
    {
      title: "NGO Sharing Network",
      desc: "Share your surplus crops with local community networks or arrange a simple automated courier pickup for local NGOs.",
      icon: Heart,
    },
  ]

  return (
    <section id="community" className="py-24 bg-muted/30">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2 items-start">
          {/* Problem Block */}
          <div className="rounded-3xl border border-border bg-card p-8 md:p-12 shadow-sm">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-600 mb-6">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">The Modern City Dilemma</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Living in high-rise buildings often disconnects us from nature, reduces physical agility, and exacerbates green space shortages in dense neighborhoods.
            </p>

            <div className="mt-10 space-y-8">
              {problems.map((prob) => (
                <div key={prob.title} className="flex gap-4">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700 text-xs font-bold mt-1">
                    !
                  </span>
                  <div>
                    <h4 className="font-semibold text-lg">{prob.title}</h4>
                    <p className="text-muted-foreground mt-1 text-sm">{prob.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Solution Block */}
          <div className="rounded-3xl border border-green-600/20 bg-green-500/[0.02] p-8 md:p-12 shadow-sm">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/10 text-green-600 mb-6">
              <Compass className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-green-800 dark:text-green-300">The FarmGym Solution</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We turn home crop growth into an structured fitness ecosystem where physical exercises have real, tangible, and ecological value.
            </p>

            <div className="mt-10 space-y-8">
              {solutions.map((sol) => {
                const Icon = sol.icon
                return (
                  <div key={sol.title} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-600/10 text-green-700 mt-1">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-semibold text-lg text-green-950 dark:text-green-200">{sol.title}</h4>
                      <p className="text-muted-foreground mt-1 text-sm">{sol.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
