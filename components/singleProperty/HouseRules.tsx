import { Baby, PawPrint, CigaretteOff, MegaphoneOff } from "lucide-react";

function HouseRules() {
  return (
    <>
      <h2 className="font-bold text-main text-3xl mb-5">House Rules</h2>

      <div className="flex flex-col gap-2 mb-5">
        <span className="text-xs text-main">Minimum age to rent: 21</span>
        <span className="text-xs text-main">Check in after 3:00 PM</span>
        <span className="text-xs text-main">Check out before 10:00 AM</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div>
          <div className="gap-4 items-center flex">
            <Baby className="size-6 text-primary" />
            <h3 className="text-main font-semibold text-xl">Children</h3>
          </div>
          <span className="text-xs text-main">Children allowed: ages 0-17</span>
        </div>
        <div>
          <div className="gap-4 items-center flex">
            <PawPrint className="size-6 text-primary" />
            <h3 className="text-main font-semibold text-xl">Pets</h3>
          </div>
          <span className="text-xs text-main">Pets allowed</span>
        </div>
        <div>
          <div className="gap-4 items-center flex">
            <CigaretteOff className="size-6 text-primary" />
            <h3 className="text-main font-semibold text-xl">No Smoking</h3>
          </div>
          <span className="text-xs text-main">Smoking is not permitted</span>
        </div>{" "}
        <div>
          <div className="gap-4 items-center flex">
            <MegaphoneOff className="size-6 text-primary" />
            <h3 className="text-main font-semibold text-xl">No Events</h3>
          </div>
          <span className="text-xs text-main">
            No events or parties allowed
          </span>
        </div>
      </div>

      <h4 className="font-bold text-main text-2xl mb-2">
        Damage and incidentals
      </h4>
      <p className="text-sm text-main">
        You will be responsible for any damage to the rental property caused by
        you or your party during your stay.
      </p>
    </>
  );
}
export default HouseRules;
