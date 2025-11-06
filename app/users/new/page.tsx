import { Suspense } from "react";
import { NewUserFormData } from "../components/new-user-form-data";
import { UserFormSkeleton } from "../components/skeletons/user-form-skeleton";

export default function NewUserPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <Suspense fallback={<UserFormSkeleton />}>
        <NewUserFormData />
      </Suspense>
    </div>
  );
}
