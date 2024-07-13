import { MainRoutes } from "@/src/constant/routes";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { Suspense, useEffect, useState } from "react";
import Loading from "@/src/components/shared/loading/Loading";
import SignUpTemplate from "@/src/components/templates/register/SignUp/SignUp";
import LogInTemplate from "@/src/components/templates/register/LogIn/LogIn";
import ToggleRegister from "@/src/components/templates/register/Toggle/ToggleRegister";
import { Toaster } from "sonner";
import { useTranslation } from "react-i18next";
import IrFlag from "@/src/assets/images/languages/fa.png";
import UsFlag from "@/src/assets/images/languages/en.png";
import Image, { StaticImageData } from "next/image";

const lngs: Record<"en" | "fa", { flag: StaticImageData }> = {
  en: { flag: UsFlag },
  fa: { flag: IrFlag },
};

export default function RegisterTemplate() {
  const [active, setActive] = useState(false);
  const { push: pushRouter } = useRouter();
  const searchParams = useSearchParams().get("view");
  const isSignUp = searchParams === "signup";

  const handleClick = () => {
    if (active) {
      setActive(false);
      pushRouter(`${MainRoutes.REGISTER}?view=login`);
    } else {
      setActive(true);
      pushRouter(`${MainRoutes.REGISTER}?view=signup`);
    }
  };

  // change direction of the layout based on the language
  const [dir, setDir] = useState("ltr");
  const { t, i18n } = useTranslation();
  useEffect(() => {
    setDir(i18n.dir());
  }, [i18n.resolvedLanguage]);

  useEffect(() => {
    if (isSignUp) {
      setActive(true);
    }
  }, [isSignUp]);

  if (searchParams && !isSignUp && searchParams !== "login") {
    pushRouter(MainRoutes.NOTFOUND);
  }

  return (
    <>
      <main
        className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-[#e2e2e2] to-[#c9d6ff] gap-4 select-none p-5"
        dir={dir}
      >
        <div className="relative overflow-hidden max-w-full w-[1000px] min-h-[600px] bg-white rounded-3xl shadow-lg">
          {isSignUp ? (
            <Suspense fallback={<Loading />}>
              <SignUpTemplate active={active} />
            </Suspense>
          ) : (
            <Suspense fallback={<Loading />}>
              <LogInTemplate active={active} />
            </Suspense>
          )}
          <ToggleRegister setActive={setActive} active={active} />
        </div>
        <div className="flex items-center gap-4" dir="ltr">
          <div className="sm:hidden text-axLightPurple">
            {active ? (
              <button
                className="text-xs text-white py-2 px-7 rounded-lg font-semibold tracking-wide uppercase mt-2 bg-axLightPurple"
                onClick={handleClick}
              >
                To {t("login")}
              </button>
            ) : (
              <button
                className="text-xs text-white py-2 px-7 rounded-lg font-semibold tracking-wide uppercase mt-2 bg-axLightPurple"
                onClick={handleClick}
              >
                To {t("signup")}
              </button>
            )}
          </div>
          {Object.keys(lngs).map((lng) => {
            return (
              <button
                key={lng}
                onClick={() => i18n.changeLanguage(lng)}
                disabled={i18n.resolvedLanguage === lng}
              >
                <Image
                  src={lngs[lng as "en" | "fa"].flag}
                  alt="language"
                  width={20}
                  height={20}
                />
              </button>
            );
          })}
        </div>
      </main>
      <Toaster richColors />
    </>
  );
}
