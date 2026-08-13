import { auth } from "@/auth";
import { getReadingListByUserId } from "../services/reading-list";
import { redirect } from "next/navigation";
import MyProfile from "./MyProfile";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const readingList = await getReadingListByUserId(Number(session.user.id));

  return <MyProfile readingList={readingList} />;
}