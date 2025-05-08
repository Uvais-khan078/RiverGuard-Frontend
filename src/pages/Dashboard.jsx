import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SalaryChart from "../components/SalaryChart";
import Map from "../components/Map";

function Dashboard() {
  const navigate = useNavigate();
  const [clearance, setClearance] = useState(1); // default to 1
  const [excelData, setExcelData] = useState([]);

  useEffect(() => {
    // Assume you stored the clearance level after login/signup
    const userData = JSON.parse(localStorage.getItem("user"));
    console.log("Dashboard loaded, user data from localStorage:", userData);
    if (userData && userData.clearance) {
      setClearance(parseInt(userData.clearance));
    }

    // Fetch Excel data from backend
    fetch("http://127.0.0.1:5000/fetch-excel-data")
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          setExcelData(data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching Excel data:", error);
      });
  }, []);

  const handleFactoryRegister = () => {
    console.log("Factory register clicked, user clearance:", clearance, "type:", typeof clearance);
    if (clearance >= 2) {
      navigate("/adminpage");
    } else {
      alert("you don't have clearance to access this page");
    }
  };

  
  return (
    <>
      <div className="bg-gray-100 font-sans">
        <header className="bg-white shadow">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold text-blue-600">RiverGuard</h1>
            <Link to="/" onClick={() => localStorage.removeItem("user")} className="text-blue-600 hover:text-blue-800">
              Logout
            </Link>
          </div>
        </header>

        <main className="mx-auto max-w-6xl p-6">
          <section className="mb-8 rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">Live IoT Sensor Data</h2>
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-200 text-gray-600">
                  <th className="border px-4 py-2">State</th>
                  <th className="border px-4 py-2">District</th>
                  <th className="border px-4 py-2">Factory</th>
                  <th className="border px-4 py-2">BOD</th>
                  <th className="border px-4 py-2">COD</th>
                  <th className="border px-4 py-2">pH</th>
                  <th className="border px-4 py-2">Nitrate</th>
                  <th className="border px-4 py-2">DO</th>
                  <th className="border px-4 py-2">TDS</th>
                  <th className="border px-4 py-2">Zone</th>
                </tr>
              </thead>
              <tbody>
                {excelData.length > 0 ? (
                  excelData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-100">
                      <td className="border px-4 py-2">{item.state_name}</td>
                      <td className="border px-4 py-2">{item.district_name}</td>
                      <td className="border px-4 py-2">{item.factory_name}</td>
                      <td className="border px-4 py-2">{item.bod}</td>
                      <td className="border px-4 py-2">{item.cod}</td>
                      <td className="border px-4 py-2">{item.ph}</td>
                      <td className="border px-4 py-2">{item.nitrate}</td>
                      <td className="border px-4 py-2">{item.do}</td>
                      <td className="border px-4 py-2">{item.tds}</td>
                      <td className="border px-4 py-2">{item.zone}</td>
                    </tr>
                  ))
                ) : (
                  <tr className="hover:bg-gray-100">
                    <td className="border px-4 py-2" colSpan="10" align="center">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>

     
         <Map/>

    <section className="mb-8 rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">Water Quality Trends</h2>
      <div className="border-2 border-dashed border-blue-300 p-10 rounded-xl bg-white max-w-4xl mx-auto">
         <SalaryChart/>
      </div>
    </section>

    <section className="rounded-lg bg-white p-6 shadow text-center">
      <h2 className="mb-4 text-xl font-semibold">Admin Panel Access</h2>
      <p className="mb-4 text-gray-700">Only special authority members can register new factories. Click the button below to go to the admin panel.</p>
      <button onClick={handleFactoryRegister} className="rounded bg-blue-600 px-6 py-3 text-white text-lg font-semibold transition hover:bg-blue-700" type="button">
        + Go to Admin Panel
      </button>
    </section>
  </main>
</div>

   
    </>
  )
}

export default Dashboard
