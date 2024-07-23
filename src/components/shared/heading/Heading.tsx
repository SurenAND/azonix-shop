type HeadingProps = {
  title: string;
  subtitle: string;
};

const Heading = ({ title, subtitle }: HeadingProps) => {
  return (
    <div className="text-center mb-10 max-w-[600px] mx-auto space-y-2">
      <h2 className="text-3xl lg:text-4xl font-bold">{title}</h2>
      <p className="text-sm text-gray-400">{subtitle}</p>
    </div>
  );
};

export default Heading;
