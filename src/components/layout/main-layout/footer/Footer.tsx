import {
  ImportantLinks,
  QuickLinks,
} from "@/src/components/layout/main-layout/footer/data";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { FaMobileAlt } from "react-icons/fa";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
} from "react-icons/fa6";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <div className="dark:bg-gray-950">
      <div className="container">
        <div className="grid md:grid-cols-3 pb-20 pt-5">
          {/* company details */}
          <div className="py-9 px-4">
            <Link
              href="#"
              className="text-primary font-bold tracking-widest text-2xl uppercase sm:text-3xl"
            >
              {t("company-name")}
            </Link>
            <p className="text-gray-600 dark:text-white/70 lg:pe-24 pt-3">
              {t("company-info")}
            </p>
            <p className="text-gray-500 mt-4">{t("made-by")}</p>
            <Link
              href="https://github.com/SurenAND"
              target="_blank"
              className="inline-block bg-primary/90 text-white py-2 px-4 text-sm rounded-full mt-4"
            >
              {t("more-projects")}
            </Link>
          </div>

          {/* Footer links */}
          <div className="col-span-2 grid grid-cols-2 sm:grid-cols-3 md:ps-10">
            {/* Important links */}
            <div className="py-8 px-4">
              <h1 className="text-xl dark:text-white font-bold sm:text-start mb-3">
                {t("important-links")}
              </h1>
              <ul className="space-y-3">
                {ImportantLinks.map((data) => (
                  <li key={data.id}>
                    <Link
                      href={data.links}
                      className="text-gray-600 dark:text-gray-400 hover:dark:text-white hover:text-black duration-300"
                    >
                      {t(data.title)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick links */}
            <div className="py-8 px-4">
              <h1 className="text-xl dark:text-white font-bold sm:text-start mb-3">
                {t("quick-links")}
              </h1>
              <ul className="space-y-3">
                {QuickLinks.map((data) => (
                  <li key={data.id}>
                    <Link
                      href={data.links}
                      className="text-gray-600 dark:text-gray-400 hover:dark:text-white hover:text-black duration-300"
                    >
                      {t(data.title)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Address */}
            <div className="py-8 px-4 col-span-2 sm:col-auto">
              <h1 className="text-xl dark:text-white font-bold sm:text-start mb-3">
                {t("address")}
              </h1>
              <div>
                <div className="flex dark:text-gray-400 items-center  gap-3">
                  <FaLocationArrow />
                  <p>{t("company-address")}</p>
                </div>
                <div className="flex dark:text-gray-400 items-center gap-3 mt-6">
                  <FaMobileAlt />
                  <p>{t("company-phone")}</p>
                </div>

                {/* Social links */}
                <div className="flex dark:text-gray-400 items-center gap-3 mt-6">
                  <Link href="#">
                    <FaInstagram className="text-3xl hover:text-primary duration-300" />
                  </Link>
                  <Link href="#">
                    <FaFacebook className="text-3xl hover:text-primary duration-300" />
                  </Link>
                  <Link href="https://www.linkedin.com/in/ashkan-zojaji/">
                    <FaLinkedin className="text-3xl hover:text-primary duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
