"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";

import useRoleRedirect from "@/hooks/useRoleRedirect";

export default function DashboardPage() {

  useRoleRedirect();

  return (

    <DashboardLayout>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-xl font-bold">
            Farmer Status
          </h2>

          <p className="mt-3 text-gray-600">
            Onboarding Pending
          </p>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-xl font-bold">
            Calories Burned
          </h2>

          <p className="mt-3 text-gray-600">
            0 Calories
          </p>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-xl font-bold">
            Active Crops
          </h2>

          <p className="mt-3 text-gray-600">
            No crops added
          </p>

        </div>

      </div>

    </DashboardLayout>
  );
}