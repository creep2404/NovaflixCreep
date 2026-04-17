import { CastMember } from "@/src/shared/types"

interface CastAndCrewProps {
  members: CastMember[];
}

export default function CastAndCrew({ members }: CastAndCrewProps) {
  return (
    <section className="px-8 md:px-16 editorial-gap">
      <h2 className="font-headline text-2xl font-bold tracking-tight mb-8">Top Cast & Crew</h2>
      <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide">
        {members?.map((member) => (
          <div key={member.id} className="group flex-shrink-0 w-40 transition-transform duration-300 hover:scale-105 cursor-pointer">
            <div className="w-40 h-40 rounded-2xl overflow-hidden mb-4 bg-surface-container-high">
              <img alt={member.imageAlt} className="w-full h-full object-cover" src={member.imageUrl} />
            </div>
            <p className="font-semibold text-white">{member.name}</p>
            <p className="text-sm text-on-surface-variant">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
