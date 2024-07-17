export default function MyIconBtn({ children }: { children: React.ReactNode }) {
  return (
    <button className="border border-gray-300 rounded-[20%] inline-flex justify-center items-center w-11 h-11">
      {children}
    </button>
  );
}
