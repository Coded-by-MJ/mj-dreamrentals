import Link from "next/link";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

function InfoBox({
  children,
  heading,
  buttonInfo,
  cardColor,
  textColor,
}: {
  children: React.ReactNode;
  heading: string;
  buttonInfo: {
    link: string;
    text: string;
    variant: "default" | "outline";
  };
  cardColor: string;
  textColor: string;
}) {
  return (
    <Card className={`${cardColor} p-6 `}>
      <h2 className={`text-2xl font-bold  ${textColor}`}>{heading}</h2>
      <p className={`mt-2 mb-4 ${textColor}`}>{children}</p>
      <Button asChild variant={buttonInfo.variant}>
        <Link href={buttonInfo.link}>{buttonInfo.text}</Link>
      </Button>
    </Card>
  );
}
export default InfoBox;
