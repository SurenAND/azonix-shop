import Image1 from "@/src/assets/images/category/gaming.png";
import Image3 from "@/src/assets/images/category/speaker.png";
import Image2 from "@/src/assets/images/category/vr.png";
import MyButton from "@/src/components/shared/button/Button";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const SecondRow = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="py-8">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* first col */}
          <div
            className={`sm:col-span-2 py-10 ps-5 from-gray-400/90 to-gray-100 text-white rounded-3xl relative h-[320px] flex items-end ${
              i18n.dir() === "ltr" ? "bg-gradient-to-br" : "bg-gradient-to-bl"
            }`}
          >
            <div>
              <div className="mb-2">
                <p className="mb-2 text-white">{t("enjoy")}</p>
                <p className="text-2xl font-semibold mb-2">{t("with")}</p>
                <p className="text-4xl xl:text-5xl font-bold opacity-40 mb-4">
                  {t("console")}
                </p>
                <MyButton
                  text={t("browse")}
                  bgColor="bg-primary"
                  textColor="text-white"
                />
              </div>
              <Image
                src={Image1}
                alt={t("console")}
                className="w-[280px] sm:w-[380px] absolute top-1/2 -translate-y-1/2 -end-0"
              />
            </div>
          </div>

          {/* second col */}
          <div className="py-10 ps-5 bg-gradient-to-br from-axGreen/90 to-axGreen/90 text-white rounded-3xl relative h-[320px] flex items-start">
            <div>
              <div className="mb-2">
                <p className="mb-2 text-white">{t("enjoy")}</p>
                <p className="text-2xl font-semibold mb-2">{t("with")}</p>
                <p className="text-4xl xl:text-5xl font-bold opacity-50 mb-4">
                  {t("oculus")}
                </p>
                <MyButton
                  text={t("browse")}
                  bgColor="bg-white"
                  textColor="text-axGreen"
                />
              </div>
              <Image
                src={Image2}
                alt={t("oculus")}
                className="w-[320px] absolute bottom-0"
              />
            </div>
          </div>

          {/* third col */}
          <div className="py-10 ps-5 bg-gradient-to-br from-axBlue to-axBlue/90 text-white rounded-3xl relative h-[320px] flex items-start">
            <div>
              <div className="mb-2">
                <p className="mb-2 text-white">{t("enjoy")}</p>
                <p className="text-2xl font-semibold mb-2">{t("with")}</p>
                <p className="text-4xl xl:text-5xl font-bold opacity-40 mb-4">
                  {t("speaker")}
                </p>
                <MyButton
                  text={t("browse")}
                  bgColor="bg-white"
                  textColor="text-axBlue"
                />
              </div>
              <Image
                src={Image3}
                alt={t("speaker")}
                className={`w-[200px] absolute bottom-0 end-0 ${
                  i18n.dir() === "rtl" ? "[transform:rotateY(180deg)]" : ""
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondRow;
