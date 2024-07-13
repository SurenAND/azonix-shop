import { useEffect, useState } from "react";
import { AuthReducerAction } from "@/src/types/enums";
import { FaGooglePlusG, FaLinkedinIn } from "react-icons/fa6";
import { FaFacebookF, FaGithub } from "react-icons/fa";
import { toast } from "sonner";
import { useRouter } from "next/router";
import { useUserContext } from "@/src/context/authContext";
import { MainRoutes } from "@/src/constant/routes";
import MyIconBtn from "@/src/components/shared/icon-button/IconButton";
import MyInput from "@/src/components/shared/input/Input";
import { NewUserType } from "@/src/types/types";
import { setCookie } from "cookies-next";
import { FieldValues, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSignup } from "@/src/api/auth/auth.queries";
import { newUserType } from "@/src/api/auth/auth.type";
import { TbEyeClosed } from "react-icons/tb";
import { CgEye } from "react-icons/cg";

export default function SignUpTemplate({ active }: { active: boolean }) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { t } = useTranslation();

  const { mutate: signupMutate } = useSignup();

  const handleSignUp = (data: FieldValues) => {
    const newUser = data as newUserType;
    signupMutate(newUser);
  };

  return (
    <div
      className={`absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2 z-2 ${
        active ? "translate-x-full" : "translate-x-0"
      }`}
    >
      <form
        className="flex flex-col justify-center items-center py-10 h-full"
        onSubmit={handleSubmit(handleSignUp)}
      >
        <h3 className="font-bold text-3xl mb-5">{t("create-account")}</h3>
        {/* inputs */}
        <p className="text-xs">{t("use-details-for-registration")}</p>
        <MyInput
          type="text"
          placeholder={t("firstname")}
          name="firstname"
          register={register}
          required={true}
          pattern={/^[a-zA-Z].{4,}$/}
        />
        {/* firstname error message */}
        <p
          className={`text-rose-400 text-xs w-2/3 text-center ${
            errors.firstname ? "visible" : "invisible"
          }`}
        >
          {t("firstname-input-error")}
        </p>
        <MyInput
          type="text"
          placeholder={t("lastname")}
          name="lastname"
          register={register}
          required={true}
          pattern={/^[a-zA-Z].{4,}$/}
        />
        {/* lastname error message */}
        <p
          className={`text-rose-400 text-xs w-2/3 text-center ${
            errors.lastname ? "visible" : "invisible"
          }`}
        >
          {t("lastname-input-error")}
        </p>
        <MyInput
          type="text"
          placeholder={t("phone-number")}
          name="phoneNumber"
          register={register}
          required={true}
          pattern={/^\d{11}$/}
        />
        {/* phone number error message */}
        <p
          className={`text-rose-400 text-xs w-2/3 text-center ${
            errors.phoneNumber ? "visible" : "invisible"
          }`}
        >
          {t("phone-number-input-error")}
        </p>
        <MyInput
          type="text"
          placeholder={t("address")}
          name="address"
          register={register}
          required={true}
          pattern={/^.{4,}$/}
        />
        {/* address error message */}
        <p
          className={`text-rose-400 text-xs w-2/3 text-center ${
            errors.address ? "visible" : "invisible"
          }`}
        >
          {t("address-input-error")}
        </p>
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
          className={`text-rose-400 text-xs w-2/3 text-center ${
            errors.password ? "visible" : "invisible"
          }`}
        >
          {t("password-input-error")}
        </p>
        <button
          className="bg-axLightPurple text-white text-xs py-4 px-14 rounded-lg font-semibold tracking-wide uppercase mt-2 hover:bg-axDarkPurple"
          type="submit"
        >
          {t("signup")}
        </button>
      </form>
    </div>
  );
}
