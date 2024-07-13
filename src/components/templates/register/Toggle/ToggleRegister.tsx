import ToLogIn from "@/src/components/templates/register/Toggle/ToLogIn/ToLogIn";
import ToSignUp from "@/src/components/templates/register/Toggle/ToSignUp/ToSignUp";
import { useTranslation } from "react-i18next";

export default function ToggleRegister({
  setActive,
  active,
}: {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  active: boolean;
}) {
  const { i18n } = useTranslation();
  return (
    <div
      className={`absolute top-0 start-1/2 w-1/2 h-full overflow-hidden transition-all duration-600 ease-in-out ${
        active
          ? i18n.dir() === "ltr"
            ? "-translate-x-full rounded-[0_150px_100px_0]"
            : "translate-x-full rounded-[150px_0_0_100px]"
          : i18n.dir() === "ltr"
          ? "translate-x-0 rounded-[150px_0_0_100px]"
          : "translate-x-0 rounded-[0_150px_100px_0]"
      } z-[1000] hidden sm:block`}
    >
      <div className="bg-gradient-to-r from-axLightPurple to-axDarkPurple h-full text-white relative transition-all duration-600 ease-in-out">
        <ToSignUp setActive={setActive} active={active} />
        <ToLogIn setActive={setActive} active={active} />
      </div>
    </div>
  );
}
