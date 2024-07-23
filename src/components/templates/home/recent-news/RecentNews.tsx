import Heading from "@/src/components/shared/heading/Heading";
import { blogsData } from "@/src/constant/blogsData";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const RecentNews = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="my-12">
      <div className="container">
        {/* Heading section */}
        <Heading
          title={t("recent-news-title")}
          subtitle={t("recent-news-subtitle")}
        />

        {/* Recent News section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-4 md:gap-7">
          {/* Blog Card */}
          {blogsData.map((blog) => (
            <div key={blog.id} className="bg-white dark:bg-gray-900">
              {/* Image section */}
              <div className="overflow-hidden rounded-2xl mb-2">
                <Image
                  src={blog.image}
                  alt={blog.titleEN}
                  className="w-full h-[220px] object-cover rounded-2xl hover:scale-105 duration-500"
                />
              </div>

              {/* Content section */}
              <div className="space-y-2">
                <p className="text-xs text-gray-500">
                  {i18n.dir() === "ltr" ? blog.publishedEN : blog.publishedFA}
                </p>
                <p className="font-bold line-clamp-1">
                  {i18n.dir() === "ltr" ? blog.titleEN : blog.titleFA}
                </p>
                <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                  {i18n.dir() === "ltr"
                    ? blog.descriptionEN
                    : blog.descriptionFA}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentNews;
