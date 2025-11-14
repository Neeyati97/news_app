import { useState } from 'react';
import NewsList from './pages/NewsList';
import ArticleDetail from './components/ArticleDetail';

function App() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div className="app">
      <NewsList onArticleClick={handleArticleClick} />
      <ArticleDetail
        article={selectedArticle}
        open={dialogOpen}
        onClose={handleCloseDialog}
        loading={false}
      />
    </div>
  );
}

export default App;
