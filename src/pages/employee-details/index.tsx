import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployees } from "@/features/employee/employeeSlice";
import type { RootState } from "@/app/store";
  


export default function EmployeeDetailsPage() {
  const dispatch = useDispatch();
  const { employees, loading, error } = useSelector((state: RootState) => state.employee);
  useEffect(() => {
    // @ts-ignore
    dispatch(fetchEmployees() as any);
  }, [dispatch]);
  return (
    <main className="mx-auto w-full max-w-7xl px-6 md:px-10 pb-10 flex flex-col h-full overflow-hidden">
      <div className="flex-1 min-h-0 overflow-auto pr-1">
        <div className="bg-white shadow-sm w-full">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="px-4 py-3 border-b text-left font-semibold whitespace-nowrap align-middle">Employee Code</th>
                <th className="px-4 py-3 border-b text-left font-semibold whitespace-nowrap align-middle">Short Name</th>
                <th className="px-4 py-3 border-b text-left font-semibold whitespace-nowrap align-middle">Employee Name</th>
                <th className="px-4 py-3 border-b text-left font-semibold whitespace-pre-line align-middle">Designation</th>
                <th className="px-4 py-3 border-b text-left font-semibold whitespace-nowrap align-middle">Has Signed HR Policy</th>
                <th className="px-4 py-3 border-b text-left font-semibold whitespace-nowrap align-middle">Has Signed InfoSec Policy</th>
                <th className="px-4 py-3 border-b text-left font-semibold whitespace-nowrap align-middle">Has Signed Rules of Behaviour</th>
                <th className="px-4 py-3 border-b text-left font-semibold whitespace-nowrap align-middle">Email Id</th>
                <th className="px-4 py-3 border-b text-left font-semibold whitespace-nowrap align-middle">Contact Number</th>
                <th className="px-4 py-3 border-b text-left font-semibold whitespace-nowrap align-middle">Alternate Number</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={10} className="text-center py-6">Loading...</td></tr>
              ) : error ? (
                <tr><td colSpan={10} className="text-center py-6 text-red-500">{error}</td></tr>
              ) : employees && employees.length === 0 ? (
                <tr><td colSpan={10} className="text-center py-6">No employees found.</td></tr>
              ) : (
                employees && employees.map((emp, idx) => (
                  <tr key={emp.EmployeeCode || emp.id || idx} className={idx % 2 === 0 ? "bg-white" : "bg-muted/50"}>
                    <td className="px-4 py-3 border-b align-middle whitespace-nowrap">{emp.EmployeeCode}</td>
                    <td className="px-4 py-3 border-b align-middle whitespace-nowrap">{emp.ShortName}</td>
                    <td className="px-4 py-3 border-b align-middle whitespace-nowrap">{emp.EmployeeName || emp.FullName}</td>
                    <td className="px-4 py-3 border-b align-middle whitespace-pre-line">{emp.Designation}</td>
                    <td className="px-4 py-3 border-b align-middle whitespace-nowrap">{emp.HasSignedHRPolicy ? "Yes" : "No"}</td>
                    <td className="px-4 py-3 border-b align-middle whitespace-nowrap">{emp.HasSignedInfoSecPolicy ? "Yes" : "No"}</td>
                    <td className="px-4 py-3 border-b align-middle whitespace-nowrap">{emp.HasSignedRulesOfBehaviour ? "Yes" : "No"}</td>
                    <td className="px-4 py-3 border-b align-middle whitespace-nowrap">{emp.EmailId}</td>
                    <td className="px-4 py-3 border-b align-middle whitespace-nowrap">{emp.ContactNumber}</td>
                    <td className="px-4 py-3 border-b align-middle whitespace-nowrap">{emp.AlternateNumber}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
