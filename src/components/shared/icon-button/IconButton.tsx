export default function MyIconBtn({ children }: { children: React.ReactNode }) {
  return (
    <button className='inline-flex h-11 w-11 items-center justify-center rounded-[20%] border border-gray-300'>
      {children}
    </button>
  );
}
