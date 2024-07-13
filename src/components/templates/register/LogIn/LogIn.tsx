import { FaGooglePlusG, FaLinkedinIn } from "react-icons/fa6";
import { FaFacebookF, FaGithub } from "react-icons/fa";
import MyIconBtn from "@/src/components/shared/icon-button/IconButton";
import MyInput from "@/src/components/shared/input/Input";
import { FieldValues, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLogin } from "@/src/api/auth/auth.queries";
import { useState } from "react";
import { TbEyeClosed } from "react-icons/tb";
import { CgEye } from "react-icons/cg";
import Link from "next/link";

interface LoginFormValues {
  username: string;
  password: string;
}

export default function LogInTemplate({ active }: { active: boolean }) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { t } = useTranslation();

  const { mutate: loginMutate } = useLogin();

  const handleLogin = (data: FieldValues) => {
    const loginData = data as LoginFormValues;
    loginMutate(loginData);
  };

  return (
    <div
      className={`absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2 z-2 ${
        active ? "translate-x-full" : "translate-x-0"
      }`}
    >
      <form
        className="flex flex-col justify-center items-center py-10 h-full"
        onSubmit={handleSubmit(handleLogin)}
      >
        <h3 className="font-bold text-3xl">{t("login")}</h3>
        {/* login options */}
        <div className="flex flex-row gap-3 my-4">
          <MyIconBtn>
            <FaGooglePlusG size={20} color="black" />
          </MyIconBtn>
          <MyIconBtn>
            <FaFacebookF size={15} color="black" />
          </MyIconBtn>
          <MyIconBtn>
            <FaGithub size={15} color="black" />
          </MyIconBtn>
          <MyIconBtn>
            <FaLinkedinIn size={15} color="black" />
          </MyIconBtn>
        </div>
        {/* inputs */}
        <p className="text-xs">{t("use-username-password")}</p>
        <MyInput
          type="text"
          placeholder={t("username")}
          name="username"
          register={register}
          required={true}
          pattern={/^.{4,15}$/}
        />
        {/* username error message */}
        <p
          className={`text-rose-400 text-xs w-2/3 text-center ${
            errors.username ? "visible" : "invisible"
          }`}
        >
          {t("username-input-error")}
        </p>
        <MyInput
          type={`${showPassword ? "text" : "password"}`}
          placeholder={t("password")}
          name="password"
          register={register}
          required={true}
          pattern={/^(?=.*\d)(?=.*[a-z]).{6,}$/}
          icon={
            showPassword ? (
              <CgEye onClick={() => setShowPassword(false)} />
            ) : (
              <TbEyeClosed onClick={() => setShowPassword(true)} />
            )
          }
        />
        {/* password error message */}
        <p
          className={`text-rose-400 text-xs w-3/4 text-center ${
            errors.password ? "visible" : "invisible"
          }`}
        >
          {t("password-input-error")}
        </p>

        <Link
          href="/#"
          className="text-gray-800 text-xs no-underline my-4 block"
        >
          {t("forget-password")}
        </Link>
        <button
          type="submit"
          className="bg-axLightPurple text-white text-xs py-4 px-14 rounded-lg font-semibold tracking-wide uppercase mt-2 hover:bg-axDarkPurple"
        >
          {t("login")}
        </button>
      </form>
    </div>
  );
}
