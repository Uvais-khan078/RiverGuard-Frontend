import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditableSalaryChart from "../components/EditableSalaryChart";

export default function AdminPage() {
  const [factoryName, setFactoryName] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [wasteType, setWasteType] = useState("Liquid Chemical");
  const [dischargeMethod, setDischargeMethod] = useState("");
  const [locationCoordinates, setLocationCoordinates] = useState("");
  const [licenseDocument, setLicenseDocument] = useState(null);
  const [message, setMessage] = useState("");
  const [excelFile, setExcelFile] = useState(null);
  const [excelUploadMessage, setExcelUploadMessage] = useState("");
  const [excelData, setExcelData] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchExcelData();
  }, []);

  const fetchExcelData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/fetch-excel-data");
      const data = await response.json();
      if (response.ok) {
        setExcelData(data.data);
      } else {
        console.error("Failed to fetch Excel data:", data.error);
      }
    } catch (error) {
      console.error("Error fetching Excel data:", error);
    }
  };

  const handleEditClick = (event, row) => {
    event.preventDefault();
    setEditRowId(row.id);
    setEditFormData({ ...row });
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    setEditFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:5000/update-excel-data/${editRowId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editFormData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Record updated successfully.");
        setEditRowId(null);
        fetchExcelData();
      } else {
        setMessage(data.error || "Failed to update record.");
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  const handleCancelClick = () => {
    setEditRowId(null);
  };

  const handleFileChange = (e) => {
    setLicenseDocument(e.target.files[0]);
  };

  const handleExcelFileChange = (e) => {
    setExcelFile(e.target.files[0]);
  };

  const handleExcelUpload = async () => {
    if (!excelFile) {
      setExcelUploadMessage("Please select an Excel file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", excelFile);

    try {
      const response = await fetch("http://127.0.0.1:5000/upload-excel", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setExcelUploadMessage(`Upload successful: ${data.message}`);
        setExcelFile(null);
        fetchExcelData();
      } else {
        setExcelUploadMessage(data.error || "Failed to upload Excel file.");
      }
    } catch (error) {
      setExcelUploadMessage("Error: " + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check user clearance
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || (user.clearance !== 2 && user.clearance !== 3)) {
      alert("Access Denied: You need Level 2 or 3 clearance to register a factory.");
      navigate("/dashboard");
      return;
    }

    // Prepare form data for file upload
    const formData = new FormData();
    formData.append("factoryName", factoryName);
    formData.append("licenseNumber", licenseNumber);
    formData.append("wasteType", wasteType);
    formData.append("dischargeMethod", dischargeMethod);
    formData.append("locationCoordinates", locationCoordinates);
    formData.append("registeredBy", user.email);
    if (licenseDocument) {
      formData.append("licenseDocument", licenseDocument);
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/register-factory", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Factory registered successfully!");
        // Clear form
        setFactoryName("");
        setLicenseNumber("");
        setWasteType("Liquid Chemical");
        setDischargeMethod("");
        setLocationCoordinates("");
        setLicenseDocument(null);
      } else {
        setMessage(data.error || "Failed to register factory.");
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div className="bg-gray-50 font-sans min-h-screen">
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Factory Registration</h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="text-blue-600 hover:underline"
        >
          ← Back to Dashboard
        </button>
      </header>

      <main className="p-6 max-w-7xl mx-auto space-y-10">
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">🏭 Register New Factory</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Factory Name</label>
              <input
                type="text"
                placeholder="e.g., GreenChem Industries"
                className="mt-1 w-full border rounded px-3 py-2"
                value={factoryName}
                onChange={(e) => setFactoryName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">License Number</label>
              <input
                type="text"
                placeholder="e.g., LIC-98234-2025"
                className="mt-1 w-full border rounded px-3 py-2"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Waste Type</label>
              <select
                className="mt-1 w-full border rounded px-3 py-2"
                value={wasteType}
                onChange={(e) => setWasteType(e.target.value)}
              >
                <option>Liquid Chemical</option>
                <option>Plastic</option>
                <option>Organic</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Discharge Method</label>
              <input
                type="text"
                placeholder="e.g., Underground pipeline, surface release"
                className="mt-1 w-full border rounded px-3 py-2"
                value={dischargeMethod}
                onChange={(e) => setDischargeMethod(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location Coordinates</label>
              <input
                type="text"
                placeholder="e.g., 28.7041, 77.1025"
                className="mt-1 w-full border rounded px-3 py-2"
                value={locationCoordinates}
                onChange={(e) => setLocationCoordinates(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Upload License Document</label>
              <input
                type="file"
                className="mt-1"
                onChange={handleFileChange}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit for Approval
            </button>
          </form>
          {message && (
            <p className="mt-4 text-center text-sm font-medium text-green-600">{message}</p>
          )}
        </section>

        <section className="bg-white p-6 rounded-lg shadow mt-10">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">📁 Upload Excel Sheet</h2>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleExcelFileChange}
            className="mb-4"
          />
          <button
            onClick={handleExcelUpload}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Upload Excel
          </button>
          {excelUploadMessage && (
            <p className="mt-2 text-sm font-medium text-green-600">{excelUploadMessage}</p>
          )}
        </section>

        <section className="mt-12 bg-gray-100 border-t border-gray-300 pt-8 px-6 rounded-lg shadow-inner">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Excel Data</h2>
          <form onSubmit={handleEditFormSubmit}>
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-2 py-1">State Name</th>
                  <th className="border px-2 py-1">District Name</th>
                  <th className="border px-2 py-1">Factory Name</th>
                  <th className="border px-2 py-1">BOD</th>
                  <th className="border px-2 py-1">COD</th>
                  <th className="border px-2 py-1">pH</th>
                  <th className="border px-2 py-1">Nitrate</th>
                  <th className="border px-2 py-1">DO</th>
                  <th className="border px-2 py-1">TDS</th>
                  <th className="border px-2 py-1">Zone</th>
                  <th className="border px-2 py-1">Actions</th>
                </tr>
              </thead>
              <tbody>
                {excelData.map((row) => (
                  <tr key={row.id} className="border">
                    {editRowId === row.id ? (
                      <>
                        <td className="border px-2 py-1">
                          <input
                            type="text"
                            name="state_name"
                            value={editFormData.state_name}
                            onChange={handleEditFormChange}
                            className="w-full border rounded px-1 py-0.5"
                          />
                        </td>
                        <td className="border px-2 py-1">
                          <input
                            type="text"
                            name="district_name"
                            value={editFormData.district_name}
                            onChange={handleEditFormChange}
                            className="w-full border rounded px-1 py-0.5"
                          />
                        </td>
                        <td className="border px-2 py-1">
                          <input
                            type="text"
                            name="factory_name"
                            value={editFormData.factory_name}
                            onChange={handleEditFormChange}
                            className="w-full border rounded px-1 py-0.5"
                          />
                        </td>
                        <td className="border px-2 py-1">
                          <input
                            type="text"
                            name="bod"
                            value={editFormData.bod}
                            onChange={handleEditFormChange}
                            className="w-full border rounded px-1 py-0.5"
                          />
                        </td>
                        <td className="border px-2 py-1">
                          <input
                            type="text"
                            name="cod"
                            value={editFormData.cod}
                            onChange={handleEditFormChange}
                            className="w-full border rounded px-1 py-0.5"
                          />
                        </td>
                        <td className="border px-2 py-1">
                          <input
                            type="text"
                            name="ph"
                            value={editFormData.ph}
                            onChange={handleEditFormChange}
                            className="w-full border rounded px-1 py-0.5"
                          />
                        </td>
                        <td className="border px-2 py-1">
                          <input
                            type="text"
                            name="nitrate"
                            value={editFormData.nitrate}
                            onChange={handleEditFormChange}
                            className="w-full border rounded px-1 py-0.5"
                          />
                        </td>
                        <td className="border px-2 py-1">
                          <input
                            type="text"
                            name="do"
                            value={editFormData.do}
                            onChange={handleEditFormChange}
                            className="w-full border rounded px-1 py-0.5"
                          />
                        </td>
                        <td className="border px-2 py-1">
                          <input
                            type="text"
                            name="tds"
                            value={editFormData.tds}
                            onChange={handleEditFormChange}
                            className="w-full border rounded px-1 py-0.5"
                          />
                        </td>
                        <td className="border px-2 py-1">
                          <input
                            type="text"
                            name="zone"
                            value={editFormData.zone}
                            onChange={handleEditFormChange}
                            className="w-full border rounded px-1 py-0.5"
                          />
                        </td>
                        <td className="border px-2 py-1 space-x-2">
                          <button
                            type="submit"
                            className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={handleCancelClick}
                            className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="border px-2 py-1">{row.state_name}</td>
                        <td className="border px-2 py-1">{row.district_name}</td>
                        <td className="border px-2 py-1">{row.factory_name}</td>
                        <td className="border px-2 py-1">{row.bod}</td>
                        <td className="border px-2 py-1">{row.cod}</td>
                        <td className="border px-2 py-1">{row.ph}</td>
                        <td className="border px-2 py-1">{row.nitrate}</td>
                        <td className="border px-2 py-1">{row.do}</td>
                        <td className="border px-2 py-1">{row.tds}</td>
                        <td className="border px-2 py-1">{row.zone}</td>
                        <td className="border px-2 py-1 space-x-2">
                          <button
                            type="button"
                            onClick={(event) => handleEditClick(event, row)}
                            className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                          >
                            Edit
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
          {message && (
            <p className="mt-4 text-center text-sm font-medium text-green-600">{message}</p>
          )}
        </section>
        <section className="bg-white p-6 rounded-lg shadow mt-10">
  <h2 className="text-xl font-semibold text-blue-800 mb-4">📊 Manage Salary Chart Data</h2>
  <EditableSalaryChart />
</section>

<section class="mt-12 bg-gray-100 border-t border-gray-300 pt-8 px-6 rounded-lg shadow-inner">
  <h2 class="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    AI-Generated Risk Insights for Zone A
  </h2>

  <div class="bg-white p-6 rounded-md shadow border border-blue-200 space-y-4">
    <div>
      <h3 class="text-lg font-semibold text-blue-800">📊 Forecasted Contamination</h3>
      <p class="text-gray-700">Based on recent sensor activity and predictive modeling, nitrate levels are expected to rise by <span class="font-semibold text-red-600">+23%</span> over the next 48 hours.</p>
    </div>

    <div>
      <h3 class="text-lg font-semibold text-blue-800">⚠️ Risk Assessment</h3>
      <ul class="list-disc pl-5 text-gray-700">
        <li><strong>Risk Level:</strong> High</li>
        <li><strong>Potential Source:</strong> Industrial Discharge (unregistered activity in Sector B)</li>
        <li><strong>Immediate Action:</strong> Issue investigation notice to Factory ID #A401</li>
      </ul>
    </div>

    <div>
      <h3 class="text-lg font-semibold text-blue-800">📍 Affected Zone Details</h3>
      <table class="w-full text-sm text-left text-gray-600 mt-2 border">
        <thead class="bg-blue-50 text-blue-800 font-medium">
          <tr>
            <th class="py-2 px-3 border">Zone</th>
            <th class="py-2 px-3 border">Last Inspection</th>
            <th class="py-2 px-3 border">Violation Detected</th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white">
            <td class="py-2 px-3 border">Zone A</td>
            <td class="py-2 px-3 border">2025-04-28</td>
            <td class="py-2 px-3 border text-red-600">Yes</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <p class="text-xs text-gray-500 mt-4">Insights generated by RiverGuard AI Engine (ver. 2.1). For official use only.</p>
</section>


      </main>

      <footer className="text-center text-sm text-gray-400 mt-10 py-6">© 2025 RiverGuard Authority</footer>
    </div>
  );
}
