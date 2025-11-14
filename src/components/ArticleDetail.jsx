import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Chip,
  Box,
  CircularProgress,
} from '@mui/material';
import { Close, AccessTime, CalendarToday } from '@mui/icons-material';

function ArticleDetail({ article, open, onClose, loading }) {
  if (!article && !loading) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: '90vh',
        },
      }}
    >
      <DialogTitle className="sticky top-0 bg-white z-10 border-b border-gray-200">
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent className="p-0">
        {loading ? (
          <Box className="flex justify-center items-center py-20">
            <CircularProgress />
          </Box>
        ) : (
          <div>
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-64 md:h-80 object-cover"
            />

            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Chip
                  label={article.category}
                  sx={{
                    backgroundColor: '#1976d2',
                    color: 'white',
                    fontWeight: 600,
                  }}
                />
                <div className="flex items-center text-gray-600 text-sm">
                  <AccessTime sx={{ fontSize: 18, mr: 0.5 }} />
                  <span>{article.readTime} min read</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <CalendarToday sx={{ fontSize: 16, mr: 0.5 }} />
                  <span>{formatDate(article.publishedDate)}</span>
                </div>
              </div>

              <Typography
                variant="h4"
                component="h2"
                className="font-bold mb-4"
                sx={{ lineHeight: 1.3 }}
              >
                {article.title}
              </Typography>

              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <Typography variant="subtitle1" className="font-semibold">
                    {article.author.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Author
                  </Typography>
                </div>
              </div>

              <Typography
                variant="h6"
                className="text-gray-700 mb-4 font-medium"
                sx={{ lineHeight: 1.6 }}
              >
                {article.summary}
              </Typography>

              <Typography
                variant="body1"
                className="text-gray-800 whitespace-pre-line"
                sx={{
                  lineHeight: 1.8,
                  fontSize: '1.05rem',
                }}
              >
                {article.content}
              </Typography>

              <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-200">
                {article.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={`#${tag}`}
                    variant="outlined"
                    size="small"
                    sx={{
                      borderColor: '#1976d2',
                      color: '#1976d2',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ArticleDetail;
