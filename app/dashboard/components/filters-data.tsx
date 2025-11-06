import { getConsultants } from "../actions";
import { FilterBar } from "./filter-bar";
import { MobileFilterDrawer } from "./mobile-filter-drawer";

export async function FiltersData() {
  const consultants = await getConsultants();

  return (
    <>
      <div className="flex items-center gap-2 lg:hidden">
        <MobileFilterDrawer consultants={consultants} />
      </div>
      <div className="hidden lg:block">
        <FilterBar consultants={consultants} />
      </div>
    </>
  );
}
