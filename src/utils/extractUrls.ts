export const extractUrls = (text: string) => {
  const regex = /\b(https?:\/\/|www\.)?([a-zA-Z0-9-]+\.)+(com|org|net|io|dev|ai|app|co|me|edu|gov|info|biz|xyz|tech|store|online|eg|de|uk|fr|us|ca|be)([\/?#][^\s]*)?\b/g;

  const results: { url: string; index: number }[] = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    results.push({
      url: match[0],
      index: match.index,
    });
  }

  return results;
};