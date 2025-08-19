const Skeleton = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse rounded bg-gray-200 ${className}`} />
);

export default function PageSkeletons() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero skeleton */}
      <section className="relative h-[400px] w-full bg-gray-100 flex flex-col justify-center items-center">
        <Skeleton className="h-10 w-2/3 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-8" />
        <div className="flex gap-4">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-52" />
        </div>
      </section>

      {/* Text section skeleton */}
      <section className="bg-gray-50 px-6 md:px-24 py-9">
        <div className="border border-gray-100 shadow-lg bg-white rounded-lg p-6 md:p-10">
          <div className="max-w-[70ch] space-y-4">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
            <ul className="space-y-2 pl-8">
              <li>
                <Skeleton className="h-4 w-3/4" />
              </li>
              <li>
                <Skeleton className="h-4 w-2/3" />
              </li>
              <li>
                <Skeleton className="h-4 w-1/2" />
              </li>
            </ul>
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </section>

      {/* Bottom hero skeleton */}
      <section className="relative h-[300px] w-full bg-gray-100 flex flex-col justify-center items-center">
        <Skeleton className="h-8 w-1/2 mb-6" />
        <Skeleton className="h-10 w-60" />
      </section>

      {/* Footer skeleton */}
      <footer className="bg-gray-100 py-10 flex flex-col items-center">
        <Skeleton className="h-4 w-1/3 mb-3" />
        <Skeleton className="h-4 w-1/4 mb-3" />
        <Skeleton className="h-4 w-1/2" />
      </footer>
    </main>
  );
}
