import Columns, { Estimate } from "../../../../components/(table)/columns";
import { DataTable } from "../../../../components/(table)/data-table";
import { listEstimate } from "@/app/actions/estimate";
import { auth } from "../../../../../auth";

export default async function EstimateTable() {
  const session = await auth();
  if (session) {
    const data = await listEstimate(session.user.role);

    return (
      <div className="container mx-auto py-10">
        <DataTable columns={Columns} data={data} />
      </div>
    );
  }
}
