interface NGO {
  name: string
  city: string
}

interface Props {
  ngo: NGO
}

export default function NGOCard({
  ngo,
}: Props) {
  return (
    <div className="rounded-3xl border bg-card p-6">
      <h3 className="text-2xl font-bold">
        {ngo.name}
      </h3>

      <p className="mt-3 text-muted-foreground">
        {ngo.city}
      </p>

      <button className="mt-6 rounded-2xl bg-green-600 px-6 py-3 text-white">
        Donate Produce
      </button>
    </div>
  )
}