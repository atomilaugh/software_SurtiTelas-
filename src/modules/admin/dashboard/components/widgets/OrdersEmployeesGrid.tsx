import RecentOrdersTable from "../tables/RecentOrdersTable";
import EmployeesWidget from "./EmployeesWidget";

const OrdersEmployeesGrid = () => {
  return (
    <section
      className="
        grid
        grid-cols-1
        xl:grid-cols-[2fr_1fr]
        gap-6
        mt-8
      "
    >
      <RecentOrdersTable />

      <EmployeesWidget />
    </section>
  );
};

export default OrdersEmployeesGrid;