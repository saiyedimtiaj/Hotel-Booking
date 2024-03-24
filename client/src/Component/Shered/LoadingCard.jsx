import { Skeleton } from "@mui/material";

const arr = [0,1,2,3,4,5,6,7]

const LoadingCard = () => {
  return (
    <div className="grid justify-center mt-10 mb-16 gap-8 px-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {
        arr.map(arr=><div key={arr}>
          <Skeleton variant="rounded" className="w-full" height={230} />
          <Skeleton variant="rounded" className="mt-2 w-full" height={15} />
          <Skeleton variant="rounded" className="mt-1.5" width={180} height={10} />
        </div>)
      }
    </div>
  );
};

export default LoadingCard;
