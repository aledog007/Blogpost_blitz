export const formatDate = (date: Date) =>
  new Date(date).toLocaleDateString("de-CH", { day: "2-digit", month: "long", year: "numeric" })

export const excerpt = (text: string, length = 160) =>
  text.length > length ? `${text.slice(0, length).trimEnd()} …` : text
