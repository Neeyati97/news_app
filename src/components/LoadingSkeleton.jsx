import { Card, CardContent, Skeleton } from '@mui/material';

function LoadingSkeleton() {
  return (
    <Card className="h-full" sx={{ borderRadius: 2, border: '1px solid #e0e0e0' }}>
      <Skeleton variant="rectangular" height={200} />
      <CardContent>
        <div className="flex items-center gap-2 mb-2">
          <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 4 }} />
          <Skeleton variant="text" width={100} />
        </div>
        <Skeleton variant="text" width="90%" height={30} />
        <Skeleton variant="text" width="80%" height={30} />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="95%" />
        <div className="flex gap-1 my-3">
          <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 1 }} />
        </div>
        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-2">
            <Skeleton variant="circular" width={32} height={32} />
            <Skeleton variant="text" width={100} />
          </div>
          <Skeleton variant="text" width={80} />
        </div>
      </CardContent>
    </Card>
  );
}

export default LoadingSkeleton;
