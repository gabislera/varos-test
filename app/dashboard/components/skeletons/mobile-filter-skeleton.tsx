import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileFilterSkeleton() {
  return (
    <Button variant="ghost" size="icon" className="lg:hidden" disabled>
      <Filter className="w-5 h-5" />
    </Button>
  );
}
