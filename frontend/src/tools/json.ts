export function exportJson(paragraphs: string[][], effects: string[][]) {
  return JSON.stringify(
    paragraphs.map((page, pageIndex) => {
      return page.map((paragraph, paragraphIndex) => {
        return {
          content: paragraph,
          effect: effects[pageIndex][paragraphIndex] ?? "",
        };
      });
    })
  );
}
