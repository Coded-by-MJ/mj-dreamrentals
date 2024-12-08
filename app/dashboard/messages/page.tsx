import MessagesWrapper from "@/components/dashboard/MessagesWrapper";
import { fetchMessages } from "@/utils/actions";

async function MessagesPage() {
  const allMessages = await fetchMessages();
  return <MessagesWrapper allMessages={allMessages} />;
}
export default MessagesPage;
