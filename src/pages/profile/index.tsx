import ProfileLayout from "@/src/components/layout/profile-layout/Layout";
import ProfileTemplate from "@/src/components/templates/profile/Profile";
import { ReactElement } from "react";

export default function Profile() {
  return <ProfileTemplate />;
}

Profile.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>;
};
