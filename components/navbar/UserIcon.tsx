import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { LuUser2 } from "react-icons/lu";

async function UserIcon() {
  const user = await currentUser();
  const profileImage = user?.imageUrl;
  if (profileImage) {
    return (
      <Image
        src={profileImage}
        alt={user?.firstName || "user"}
        width={28}
        height={28}
        priority
        className="w-7 h-7 rounded-full object-cover"
      />
    );
  }
  return <LuUser2 className="w-6 h-6 bg-primary rounded-full text-white" />;
}
export default UserIcon;
