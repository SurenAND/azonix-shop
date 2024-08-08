export default function LoadingPage() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='flex gap-2'>
        <div className='h-10 w-10 animate-pulse rounded-full bg-axDarkPurple'></div>
        <div className='h-10 w-10 animate-pulse rounded-full bg-axDarkPurple'></div>
        <div className='h-10 w-10 animate-pulse rounded-full bg-axDarkPurple'></div>
      </div>
    </div>
  );
}
