type HeadingProps = {
  title: string;
  subtitle: string;
};

const Heading = ({ title, subtitle }: HeadingProps) => {
  return (
    <div className='mx-auto mb-10 max-w-[600px] space-y-2 text-center'>
      <h2 className='text-3xl font-bold lg:text-4xl'>{title}</h2>
      <p className='text-sm text-gray-400'>{subtitle}</p>
    </div>
  );
};

export default Heading;
