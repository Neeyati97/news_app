import articlesData from '../data/articles.json';

let shouldSimulateError = false;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const toggleErrorSimulation = () => {
  shouldSimulateError = !shouldSimulateError;
  return shouldSimulateError;
};

export const getArticles = async () => {
  await delay(1500);

  if (shouldSimulateError) {
    throw new Error('Failed to fetch articles. Please check your connection.');
  }

  return articlesData;
};

export const getArticleBySlug = async (slug) => {
  await delay(1000);

  if (shouldSimulateError) {
    throw new Error('Failed to fetch article. Please check your connection.');
  }

  const article = articlesData.find(article => article.slug === slug);

  if (!article) {
    throw new Error('Article not found');
  }

  return article;
};

export const searchArticles = async (query, category = 'all') => {
  await delay(800);

  if (shouldSimulateError) {
    throw new Error('Failed to search articles. Please check your connection.');
  }

  let results = articlesData;

  if (category !== 'all') {
    results = results.filter(article =>
      article.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (query) {
    const lowerQuery = query.toLowerCase();
    results = results.filter(article =>
      article.title.toLowerCase().includes(lowerQuery) ||
      article.summary.toLowerCase().includes(lowerQuery) ||
      article.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }

  return results;
};

export const getCategories = () => {
  const categories = [...new Set(articlesData.map(article => article.category))];
  return ['all', ...categories];
};
