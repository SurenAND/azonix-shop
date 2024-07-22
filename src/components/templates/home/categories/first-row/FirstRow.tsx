import Image1 from "@/src/assets/images/category/earphone.png";
import Image3 from "@/src/assets/images/category/macbook.png";
import Image2 from "@/src/assets/images/category/watch.png";
import MyButton from "@/src/components/shared/button/Button";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const FirstRow = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="py-8">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* first col */}
          <div className="py-10 ps-5 bg-gradient-to-br from-black/90 to-black/70 text-white rounded-3xl relative h-[320px] flex items-end">
            <div>
              <div className="mb-2">
                <p className="mb-2 text-gray-400">{t("enjoy")}</p>
                <p className="text-2xl font-semibold mb-2">{t("with")}</p>
                <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-4">
                  {t("earphone")}
                </p>
                <MyButton
                  text={t("browse")}
                  bgColor="bg-primary"
                  textColor="text-white"
                />
              </div>
              <Image
                src={Image1}
                alt={t("earphone")}
                className={`w-[320px] absolute bottom-0 ${
                  i18n.dir() === "rtl" ? "start-24" : ""
                }`}
              />
            </div>
          </div>

          {/* second col */}
          <div className="py-10 ps-5 bg-gradient-to-br from-axYellow to-axYellow/90 text-white rounded-3xl relative h-[320px] flex items-end">
            <div>
              <div className="mb-2">
                <p className="mb-2 text-white">{t("enjoy")}</p>
                <p className="text-2xl font-semibold mb-2">{t("with")}</p>
                <p className="text-4xl xl:text-5xl font-bold opacity-40 mb-4">
                  {t("gadget")}
                </p>
                <MyButton
                  text={t("browse")}
                  bgColor="bg-white"
                  textColor="text-axYellow"
                />
              </div>
              <Image
                src={Image2}
                alt={t("gadget")}
                className="w-[320px] absolute -end-4 lg:top-[40px]"
              />
            </div>
          </div>

          {/* third col */}
          <div className="col-span-2 py-10 ps-5 bg-gradient-to-br from-primary to-primary/90 text-white rounded-3xl relative h-[320px] flex items-end">
            <div>
              <div className="mb-2">
                <p className="mb-2 text-white">{t("enjoy")}</p>
                <p className="text-2xl font-semibold mb-2">{t("with")}</p>
                <p className="text-4xl xl:text-5xl font-bold opacity-40 mb-4">
                  {t("laptop")}
                </p>
                <MyButton
                  text={t("browse")}
                  bgColor="bg-white"
                  textColor="text-primary"
                />
              </div>
              <Image
                src={Image3}
                alt={t("laptop")}
                className="w-[420px] absolute top-1/2 -translate-y-1/2 -end-0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstRow;
