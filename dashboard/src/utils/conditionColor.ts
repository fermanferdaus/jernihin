export function conditionColor(condition: string) {
  switch (condition?.toLowerCase()) {
    case "jernih":
      return "text-green-400";
    case "sedang":
      return "text-yellow-400";
    case "keruh":
      return "text-red-400";
    default:
      return "text-gray-300";
  }
}
