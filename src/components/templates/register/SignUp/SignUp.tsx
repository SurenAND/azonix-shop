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

export default function SignUpTemplate({ active }: { active: boolean }) {
  const { register, handleSubmit } = useForm();
  const { t } = useTranslation();

  // const { push: pushRouter } = useRouter();
  // const { state, dispatch } = useUserContext();

  // useEffect(() => {
  //   state.isLogin && pushRouter(MainRoutes.HOME);
  // }, [state.isLogin]);

  const handleSignUp = (data: FieldValues) => {
    console.log(data);
    //   if (name && email && password) {
    //     const newUser: NewUserType = {
    //       firstname: name,
    //       lastname: "",
    //       username: name,
    //       password: password,
    //       phoneNumber: "",
    //       address: "",
    //     };
    //     postUserData(newUser).then(({ token, data: { user } }) => {
    //       setCookie("username", user.username);
    //       setCookie("accessToken", token.accessToken);
    //       dispatch({
    //         type: AuthReducerAction.LOGIN,
    //         payload: { ...user, accessToken: token.accessToken },
    //       });
    //       pushRouter(MainRoutes.HOME);
    //     });
    //   } else toast.error("Please enter valid Name,Email and Password!");
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
        <h3 className="font-bold text-3xl">{t("create-account")}</h3>
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
        <p className="text-xs">{t("use-details-for-registration")}</p>
        <MyInput
          type="text"
          placeholder={t("firstname")}
          name="firstname"
          register={register}
          required={true}
        />
        <MyInput
          type="text"
          placeholder={t("lastname")}
          name="lastname"
          register={register}
          required={true}
        />
        <MyInput
          type="text"
          placeholder={t("phone-number")}
          name="phoneNumber"
          register={register}
          required={true}
        />
        <MyInput
          type="text"
          placeholder={t("address")}
          name="address"
          register={register}
          required={true}
        />
        <MyInput
          type="text"
          placeholder={t("username")}
          name="username"
          register={register}
          required={true}
        />
        <MyInput
          type="password"
          placeholder={t("password")}
          name="password"
          register={register}
          required={true}
        />
        <button
          className="bg-axLightPurple text-white text-xs py-2 px-11 rounded-lg font-semibold tracking-wide uppercase mt-2 hover:bg-axDarkPurple"
          type="submit"
        >
          {t("signup")}
        </button>
      </form>
    </div>
  );
}
