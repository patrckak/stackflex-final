import Columns, { Estimate } from "./columns";
import { DataTable } from "./data-table";
import { listEstimate } from "../../../../actions/estimate";
import { auth } from "../../../../../../auth";

export const dynamic = "force-dynamic";

export default async function EstimateTable() {
  const session = await auth();

  if (session) {
    const data = await listEstimate(session.user.role);
    console.log(data);

    return (
      <div className="container mx-auto py-10">
        <DataTable columns={Columns} data={data} />
      </div>
    );
  }
}
