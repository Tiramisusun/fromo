interface FilterChipProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function FilterChip({ label, isActive, onClick }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors
        ${isActive
          ? 'bg-teal-500 text-white'
          : 'bg-white border border-gray-300 text-gray-700 hover:border-gray-400'
        }
      `}
    >
      {label}
    </button>
  );
}
