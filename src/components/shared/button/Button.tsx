type ButtonPropsType = {
  text: string;
  bgColor: string;
  textColor: string;
  handler?: () => void;
};
const MyButton = ({
  text,
  bgColor,
  textColor,
  handler = () => {},
}: ButtonPropsType) => {
  return (
    <button
      onClick={handler}
      className={`${bgColor} ${textColor} relative z-10 cursor-pointer rounded-full px-8 py-2 duration-300 hover:scale-105`}
    >
      {text}
    </button>
  );
};

export default MyButton;
