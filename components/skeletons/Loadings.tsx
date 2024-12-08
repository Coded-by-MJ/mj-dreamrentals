import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

function LoadingCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <Skeleton className="w-full h-12 rounded" />
      </CardHeader>
    </Card>
  );
}

export function LoadingCardContainer({
  cardAmount,
  className,
}: {
  cardAmount: number;
  className: string;
}) {
  return (
    <div className={className}>
      {Array.from({ length: cardAmount }, (_, i) => {
        return <LoadingCard key={i} />;
      })}
    </div>
  );
}

export function DashboardLoading() {
  return (
    <section className="flex flex-col gap-6 p-3">
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between w-full ">
        <Card className="w-full">
          <CardHeader>
            <Skeleton className="w-full h-20 rounded" />
          </CardHeader>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <Skeleton className="w-full h-20 rounded" />
          </CardHeader>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <Skeleton className="w-full h-20 rounded" />
          </CardHeader>
        </Card>
      </div>
      <LoadingCardContainer
        cardAmount={4}
        className="flex flex-col gap-4 justify-start items-start w-full"
      />
    </section>
  );
}
export function HomeLoading() {
  return (
    <section className="my-8 p-6">
      <Skeleton className="w-full max-w-[300px] mx-auto h-10 rounded mb-3" />
      <LoadingCardContainer
        cardAmount={3}
        className="items-center justify-between w-full gap-4 grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 py-3 "
      />
    </section>
  );
}

export function AuthLoading() {
  return (
    <section className="flex justify-center items-center gap-3 p-3">
      <Card>
        <CardHeader>
          <Skeleton className="w-full h-6 rounded" />
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-24 rounded" />
        </CardContent>
      </Card>
    </section>
  );
}

export function PropertiesLoading() {
  return (
    <section className="flex flex-col justify-center items-center gap-7">
      <LoadingCardContainer
        cardAmount={3}
        className="flex flex-col md:flex-row gap-3 items-center justify-between w-full max-w-[750px]"
      />

      <div className="grid lg:grid-cols-70/30 gap-4 w-full">
        <div className="flex-col flex gap-4 ">
          <div className="flex  w-full justify-between items-center">
            <Skeleton className="w-[100px] h-6 rounded" />
            <Skeleton className="w-[100px] h-6 rounded" />
          </div>

          <LoadingCardContainer
            cardAmount={4}
            className="flex flex-col gap-4 justify-start items-start w-full"
          />
        </div>
        <Skeleton className="h-[400px] hidden lg:block w-full rounded" />
      </div>
    </section>
  );
}

export function PageLoading() {
  return (
    <section className="flex flex-col items-start justify-start gap-6 p-3">
      <LoadingCardContainer
        cardAmount={1}
        className="flex flex-wrap gap-6 items-center justify-between w-full"
      />
      <LoadingCardContainer
        cardAmount={4}
        className="flex flex-col gap-4 justify-start items-start w-full"
      />
    </section>
  );
}

export function SinglePropertyLoading() {
  return (
    <section>
      <div className="flex flex-col sm:flex-row items-start gap-3 mb-2 justify-between">
        <Skeleton className="w-[70%] h-4 rounded" />

        <div className="flex-shrink-0 flex items-center gap-2">
          <Skeleton className="size-8 rounded" />
          <Skeleton className="size-8 rounded" />
        </div>
      </div>
      <Skeleton className="w-full h-[288px] rounded" />
      <div className="grid w-full m items-start grid-cols-1 gap-7 lg:grid-cols-12  my-10">
        <Skeleton className="w-full lg:col-span-8 flex flex-col gap-4 h-[600px]" />
        <div className="lg:mt-[50px] border lg:col-span-4 rounded-lg  py-5 ">
          <div className="px-4 space-y-3">
            <Skeleton className="w-[40] h-4 rounded" />
            <div className="flex justify-between gap-3 w-full items-center">
              <Skeleton className="w-1/2 h-10 rounded" />
              <Skeleton className="w-1/2 h-10 rounded" />
            </div>
            <Skeleton className="w-full h-20 rounded" />
          </div>
        </div>
      </div>
    </section>
  );
}
