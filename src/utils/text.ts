export function textToSlug(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, '-');
}

export function slugToText(slug: string): string {
  return slug
    .split('-')
    .map((word, index) => {
      if (index === 0) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}
