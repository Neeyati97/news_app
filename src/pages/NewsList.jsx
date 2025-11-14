import { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  Typography,
  Box,
} from '@mui/material';
import { Search, Refresh } from '@mui/icons-material';
import NewsCard from '../components/NewsCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { searchArticles, getCategories, toggleErrorSimulation } from '../services/articleService';

function NewsList({ onArticleClick }) {
  const [articles, setArticles] = useState([]);
  const [displayedArticles, setDisplayedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const articlesPerPage = 6;

  useEffect(() => {
    setCategories(getCategories());
    fetchArticles();
  }, []);

  useEffect(() => {
    const startIndex = 0;
    const endIndex = page * articlesPerPage;
    setDisplayedArticles(articles.slice(startIndex, endIndex));
  }, [articles, page]);

  const fetchArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchArticles(searchQuery, category);
      setArticles(data);
      setPage(1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchArticles();
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleRetry = () => {
    fetchArticles();
  };

  const handleSimulateError = () => {
    const isError = toggleErrorSimulation();
    alert(isError ? 'Error simulation enabled' : 'Error simulation disabled');
  };

  const hasMore = displayedArticles.length < articles.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <Container maxWidth="lg" className="py-6">
          <Typography
            variant="h4"
            component="h1"
            className="font-bold mb-4"
            sx={{ color: '#1976d2' }}
          >
            Latest News
          </Typography>

          <div className="flex flex-col md:flex-row gap-3 mb-4">
            <TextField
              fullWidth
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ flex: 1 }}
            />

            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{ minWidth: 120 }}
            >
              Search
            </Button>
          </div>

          <Button
            size="small"
            variant="outlined"
            onClick={handleSimulateError}
            startIcon={<Refresh />}
            sx={{ mt: 1 }}
          >
            Toggle Error Simulation
          </Button>
        </Container>
      </div>

      <Container maxWidth="lg" className="py-8">
        {error && (
          <Alert
            severity="error"
            className="mb-6"
            action={
              <Button color="inherit" size="small" onClick={handleRetry}>
                Retry
              </Button>
            }
          >
            {error}
          </Alert>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <LoadingSkeleton key={index} />
            ))}
          </div>
        ) : displayedArticles.length === 0 ? (
          <Box className="text-center py-16">
            <Typography variant="h5" className="text-gray-600 mb-2">
              No Results Found
            </Typography>
            <Typography variant="body1" className="text-gray-500">
              Try adjusting your search or filters
            </Typography>
          </Box>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedArticles.map((article) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  onClick={onArticleClick}
                />
              ))}
            </div>

            {hasMore && (
              <div className="text-center mt-8">
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleLoadMore}
                  sx={{
                    paddingX: 4,
                    paddingY: 1.5,
                    fontSize: '1rem',
                  }}
                >
                  Load More
                </Button>
              </div>
            )}

            {!hasMore && articles.length > 0 && (
              <Typography
                variant="body2"
                className="text-center text-gray-500 mt-8"
              >
                You've reached the end of the list
              </Typography>
            )}
          </>
        )}
      </Container>
    </div>
  );
}

export default NewsList;
