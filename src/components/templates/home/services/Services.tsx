import { ServicesData } from "@/src/components/templates/home/services/data";
import { useTranslation } from "react-i18next";

const Services = () => {
  const { i18n } = useTranslation();
  return (
    <div>
      <div className="container mt-14 md:mt-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 gap-y-8">
          {ServicesData.map((service) => (
            <div
              key={service.id}
              className="flex flex-col items-start sm:flex-row gap-4"
            >
              {service.icon}
              <div>
                <h1 className="lg:text-xl font-bold">
                  {i18n.dir() === "ltr" ? service.titleEN : service.titleFa}
                </h1>
                <h1 className="text-gray-400 text-sm">
                  {i18n.dir() === "ltr"
                    ? service.descriptionEN
                    : service.descriptionFa}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
