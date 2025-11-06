import { Suspense } from "react";
import { EditUserFormData } from "../components/edit-user-form-data";
import { UserFormSkeleton } from "../components/skeletons/user-form-skeleton";

export default async function EditUsersPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <Suspense fallback={<UserFormSkeleton />}>
        <EditUserFormData userId={id} />
      </Suspense>
    </div>
  );
}
