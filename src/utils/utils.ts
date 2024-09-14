export function formatText(text: string) {
  return text.toUpperCase().split("_").join("<br>");
}
