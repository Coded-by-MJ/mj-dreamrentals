import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import Link from "next/link";

type BreadcrumbProps = {
  propertyName: string;
};
function BreadCrumbs(props: BreadcrumbProps) {
  const { propertyName } = props;

  return (
    <div className="mb-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="capitalize text-sm text-main" asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash className="size-3" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink className="text-sm capitalize text-main" asChild>
              <Link href={"/properties"}>properties</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash className="size-3" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="capitalize text-sm text-main">
              {propertyName}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
export default BreadCrumbs;
