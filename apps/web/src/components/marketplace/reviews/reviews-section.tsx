"use client"

import { Star, ThumbsUp, Check } from "lucide-react"

const reviewList = [
  {
    name: "Vikram Sen",
    rating: 5,
    title: "Exceptional seed quality!",
    comment: "Planted the organic tomato seeds in my South Balcony slot. The germination rate was literally 100%! Already seeing tiny seedlings pop out on Day 4. High-yield strains for sure.",
    date: "1 week ago",
    verified: true,
  },
  {
    name: "Sunita Deshmukh",
    rating: 4,
    title: "Very rich organic compost mix",
    comment: "Soil is airy, smells earthy, and retains optimal moisture perfectly. My spinach leaves are visibly wider. Shipping was slightly delayed by 1 day, but the product quality is outstanding.",
    date: "2 weeks ago",
    verified: true,
  },
]

export default function ReviewsSection() {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-6">
      <h3 className="text-xl font-bold tracking-tight">Customer Reviews</h3>

      {/* Review breakdown */}
      <div className="grid gap-6 md:grid-cols-3 border border-border/50 bg-muted/15 rounded-2xl p-5">
        {/* Main average score */}
        <div className="text-center flex flex-col justify-center items-center">
          <span className="text-5xl font-black text-foreground">4.8</span>
          <div className="flex gap-0.5 mt-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="h-4.5 w-4.5 fill-yellow-400 text-yellow-500" />
            ))}
          </div>
          <span className="text-[10px] text-muted-foreground mt-2 block font-medium">Average Seller Rating</span>
        </div>

        {/* Horizontal rating bar indicators */}
        <div className="md:col-span-2 space-y-2 text-xs">
          {[
            { stars: 5, pct: 85 },
            { stars: 4, pct: 12 },
            { stars: 3, pct: 3 },
            { stars: 2, pct: 0 },
            { stars: 1, pct: 0 },
          ].map((row) => (
            <div key={row.stars} className="flex items-center gap-3">
              <span className="font-semibold text-muted-foreground w-3 text-right">{row.stars}</span>
              <Star className="h-3 w-3 fill-muted-foreground/60 text-muted-foreground/80 shrink-0" />
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${row.pct}%` }} />
              </div>
              <span className="font-semibold text-muted-foreground w-7 text-right">{row.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Feed list */}
      <div className="space-y-6">
        {reviewList.map((rev, idx) => (
          <div key={idx} className="border-t border-border/50 pt-5 text-xs leading-normal">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground">{rev.name}</span>
                {rev.verified && (
                  <span className="flex items-center gap-0.5 text-[8px] bg-green-500/10 text-green-700 font-bold px-1.5 py-0.5 rounded-full uppercase">
                    <Check className="h-2.5 w-2.5" />
                    Verified Buyer
                  </span>
                )}
              </div>
              <span className="text-[10px] text-muted-foreground/80">{rev.date}</span>
            </div>

            {/* Stars row */}
            <div className="flex gap-0.5 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < rev.rating ? "fill-yellow-400 text-yellow-500" : "fill-muted text-muted-foreground/30"
                  }`}
                />
              ))}
            </div>

            <h4 className="font-bold text-foreground mt-3 text-sm">{rev.title}</h4>
            <p className="text-muted-foreground mt-2 leading-relaxed bg-muted/15 border border-border/40 p-3.5 rounded-2xl">
              {rev.comment}
            </p>

            <div className="flex gap-4 items-center mt-3 pl-1 text-[10px] text-muted-foreground font-semibold">
              <button className="flex items-center gap-1 hover:text-foreground">
                <ThumbsUp className="h-3.5 w-3.5" />
                Helpful (2)
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
