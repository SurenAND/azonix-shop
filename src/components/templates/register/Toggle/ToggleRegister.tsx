import ToLogIn from "@/src/components/templates/register/Toggle/ToLogIn/ToLogIn";
import ToSignUp from "@/src/components/templates/register/Toggle/ToSignUp/ToSignUp";

export default function ToggleRegister({
  setActive,
  active,
}: {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  active: boolean;
}) {
  return (
    <div
      className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-600 ease-in-out ${
        active
          ? "-translate-x-full rounded-[0_150px_100px_0]"
          : "translate-x-0 rounded-[150px_0_0_100px]"
      } z-[1000]`}
    >
      <div className="bg-gradient-to-r from-axLightPurple to-axDarkPurple h-full text-white relative transition-all duration-600 ease-in-out">
        <ToSignUp setActive={setActive} active={active} />
        <ToLogIn setActive={setActive} active={active} />
      </div>
    </div>
  );
}
