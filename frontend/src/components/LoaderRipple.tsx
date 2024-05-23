export default function LoaderRipple() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-130px)]">
      <div className="relative inline-flex">
        <div className="w-8 h-8 bg-orange-900 rounded-full" />
        <div className="w-8 h-8 bg-orange-900 rounded-full absolute top-0 left-0 animate-ping" />
        <div className="w-8 h-8 bg-orange-900 rounded-full absolute top-0 left-0 animate-pulse" />
      </div>
    </div>
  );
}
