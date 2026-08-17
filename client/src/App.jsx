      import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [reportType, setReportType] = useState("CBC");
  const [reportDate, setReportDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !title || !reportDate) {
      setMessage("Please fill all fields and select a file.");
      return;
    }

    const formData = new FormData();

    formData.append("report", file);
    formData.append("title", title);
    formData.append("reportType", reportType);
    formData.append("reportDate", reportDate);

    try {
      setMessage("Uploading...");

      const response = await fetch(
        "https://regally-senator-entitle.ngrok-free.dev/api/reports",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Upload failed");
      }

      setMessage("Report uploaded successfully!");

      console.log(data);
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h1>AI Medical Records</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Report Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="CBC Report"
          />
        </div>

        <div>
          <label>Report Type</label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <option value="CBC">CBC</option>
            <option value="LFT">LFT</option>
            <option value="KFT">KFT</option>
            <option value="Prescription">Prescription</option>
            <option value="Discharge Summary">
              Discharge Summary
            </option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label>Report Date</label>
          <input
            type="date"
            value={reportDate}
            onChange={(e) => setReportDate(e.target.value)}
          />
        </div>

        <div>
          <label>Report File</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <button type="submit">
          Upload Report
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default App;