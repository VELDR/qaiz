const LoadingPage = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-slate-900 dark:border-slate-100"></div>

        <div className="text-center mt-4">
          <p className="text-2xl font-bold">Loading...</p>
          <p className="text-muted-foreground">
            Your destination is just a moment away.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
