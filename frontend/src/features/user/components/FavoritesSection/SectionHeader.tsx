interface SectionHeaderProps {
  title: string;
}

export const SectionHeader = ({ title }: SectionHeaderProps) => {
  return (
    <div className="flex items-baseline justify-between mb-6">
      <h2 className="text-on-surface-variant font-headline text-xs font-bold uppercase tracking-[0.2em]">
        {title}
      </h2>

      <div className="h-px flex-1 ml-6 bg-gradient-to-r from-outline-variant/30 to-transparent" />
    </div>
  );
};