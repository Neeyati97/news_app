import { Card, CardContent, CardMedia, Chip, Typography } from '@mui/material';
import { AccessTime, CalendarToday } from '@mui/icons-material';

function NewsCard({ article, onClick }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card
      onClick={() => onClick(article)}
      className="cursor-pointer hover:shadow-xl transition-all duration-300 h-full flex flex-col"
      sx={{
        borderRadius: 2,
        border: '1px solid #e0e0e0',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={article.image}
        alt={article.title}
        className="object-cover"
        sx={{ height: 200 }}
      />
      <CardContent className="flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <Chip
            label={article.category}
            size="small"
            sx={{
              backgroundColor: '#1976d2',
              color: 'white',
              fontWeight: 500,
              fontSize: '0.75rem',
            }}
          />
          <div className="flex items-center text-gray-500 text-sm">
            <AccessTime sx={{ fontSize: 16, mr: 0.5 }} />
            <span>{article.readTime} min read</span>
          </div>
        </div>

        <Typography
          variant="h6"
          component="h3"
          className="font-semibold mb-2 line-clamp-2"
          sx={{
            fontSize: '1.125rem',
            lineHeight: 1.4,
            minHeight: '3rem',
          }}
        >
          {article.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          className="mb-3 line-clamp-2 flex-1"
          sx={{ lineHeight: 1.6 }}
        >
          {article.summary}
        </Typography>

        <div className="flex flex-wrap gap-1 mb-3">
          {article.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-gray-700">
              {article.author.name}
            </span>
          </div>
          <div className="flex items-center text-gray-500 text-xs">
            <CalendarToday sx={{ fontSize: 14, mr: 0.5 }} />
            <span>{formatDate(article.publishedDate)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default NewsCard;
