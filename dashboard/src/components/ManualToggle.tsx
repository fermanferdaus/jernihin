interface Props {
  active: boolean;
  onToggle: () => void;
}

export default function ManualToggle({ active, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      className={`px-5 py-2 rounded-lg font-semibold shadow-lg transition ${
        active
          ? "bg-green-600 text-white hover:bg-green-500"
          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
      }`}
    >
      {active ? "Mati" : "Hidup"}
    </button>
  );
}
