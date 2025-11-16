const months = {
  januari: 0,
  februari: 1,
  maart: 2,
  april: 3,
  mei: 4,
  juni: 5,
  juli: 6,
  augustus: 7,
  september: 8,
  oktober: 9,
  november: 10,
  december: 11
};

export function parseDutchDate(dateStr) {
  const [day, monthStr, year] = dateStr.split(' ');
  return new Date(year, months[monthStr.toLowerCase()], day);
}
