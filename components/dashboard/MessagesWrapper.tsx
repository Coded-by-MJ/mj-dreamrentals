"use client";

import { Message, Profile, Property } from "@prisma/client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "../ui/button";
import { deleteMessageAction, updateMessageRead } from "@/utils/actions";
import FormContainer from "../form/FormContainer";
import { IconButton } from "../form/Buttons";
import EmptyList from "../home/EmptyList";
import { toast } from "@/hooks/use-toast";

type MessageWithSender = Message & {
  sender: Profile;
  property: Property;
};

function MessagesWrapper({
  allMessages,
}: {
  allMessages: MessageWithSender[];
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [activeMessage, setActiveMessage] = useState<
    MessageWithSender | undefined
  >(undefined);

  const handleReadMessage = async (id: string) => {
    setIsLoading(true);
    const selectedMessage = allMessages.find((m) => m.id === id);

    if (!selectedMessage?.read) {
      const { message, variant } = await updateMessageRead(id);
      if (variant === "destructive") {
        toast({
          description: message,
          variant,
        });
      }
    }
    setActiveMessage(selectedMessage);
    setIsLoading(false);
  };

  if (allMessages.length === 0) {
    return (
      <EmptyList heading="No messages yet. Once you receive messages, they'll appear here" />
    );
  }

  return (
    <section className="flex flex-col gap-5 items-start justify-start">
      <h4 className="capitalize">
        total messages received : {allMessages.length}
      </h4>
      <div className="w-full flex gap-4 items-center p-2  overflow-x-auto  scrollbar-thumb-primary scrollbar-track-muted scrollbar-thumb-rounded-md scrollbar-track-rounded-md scrollbar-thin">
        {allMessages.map((message) => {
          const { sender } = message;
          return (
            <button
              disabled={isLoading}
              onClick={() => handleReadMessage(message.id)}
              className={cn(
                "size-[50px] outline outline-offset-2 block  hover:outline-muted-foreground transition-all rounded-full cursor-pointer  relative",
                activeMessage?.id === message.id
                  ? "outline-primary"
                  : "outline-transparent"
              )}
              key={message.id}
            >
              {!message.read && (
                <span
                  className={cn(
                    "absolute bg-blue-500 rounded-full z-20  top-1 right-0  size-3 items-center justify-center"
                  )}
                ></span>
              )}

              <Image
                alt={sender.firstName}
                src={sender.imageUrl}
                fill
                sizes="100px"
                quality={90}
                priority
                placeholder="empty"
                className="rounded-full object-cover "
              />
            </button>
          );
        })}
      </div>

      <div className="w-full relative flex-grow rounded-md border p-4 h-full max-h-[500px] overflow-y-auto  scrollbar-thumb-primary scrollbar-track-muted scrollbar-thumb-rounded-md scrollbar-track-rounded-md scrollbar-thin">
        {activeMessage ? (
          <>
            <DeleteMessage messageId={activeMessage.id} />
            <h2 className="text-lg mb-3 text-muted-foreground">
              <span className="font-semibold">Property Inquiry:</span>{" "}
              {activeMessage.property.name}
            </h2>

            <p className="rounded-md p-4 border text-base  max-w-[400px]">
              {activeMessage.body}
            </p>
            <div className="max-w-[400px] flex items-center justify-between flex-wrap ">
              <span className="block text-xs flex-shrink-0">
                <strong>Sender:</strong> {activeMessage.sender.firstName}{" "}
                {activeMessage.sender.lastName}
              </span>

              <span className="block text-xs flex-shrink-0">
                <strong>Received:</strong>{" "}
                {new Date(activeMessage.createdAt).toLocaleString()}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-start gap-4">
              <div>
                <strong>Reply Email:</strong>{" "}
                <Button asChild variant={"link"}>
                  <a href={`mailto:${activeMessage.email}`}>
                    {activeMessage.email}
                  </a>
                </Button>
              </div>
              <div>
                <strong>Reply Phone:</strong>{" "}
                <Button asChild variant={"link"}>
                  <a href={`tel:${activeMessage.phone}`}>
                    {activeMessage.phone}
                  </a>
                </Button>
              </div>
            </div>
          </>
        ) : (
          <p className="text-primary text-base capitalize">
            click on a profile icon to display message
          </p>
        )}
      </div>
    </section>
  );
}

const DeleteMessage = ({ messageId }: { messageId: string }) => {
  const deleteMessage = deleteMessageAction.bind(null, { messageId });
  return (
    <FormContainer action={deleteMessage} className="absolute top-3 right-3">
      <IconButton actionType="delete" />
    </FormContainer>
  );
};
export default MessagesWrapper;
