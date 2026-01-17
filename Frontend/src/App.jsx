import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Trash2,
  Download,
  CloudSun,
  Sun,
  CloudRain,
  Wind,
  Loader,
  Edit2,
  Save,
  X,
} from "lucide-react";


export default function App() {
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [records, setRecords] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [globalLoading, setGlobalLoading] = useState(false);
  
  // Edit state
  const [editingId, setEditingId] = useState(null);
  const [editCity, setEditCity] = useState("");
  const [editStartDate, setEditStartDate] = useState(null);
  const [editTemp, setEditTemp] = useState(0);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const fetchRecords = async () => {
    setGlobalLoading(true);
    try {
      const res = await fetch(import.meta.env.VITE_API_URL);
      const data = await res.json();
      setRecords(data);
    } catch (err) {
      console.error(err);
    }
    setGlobalLoading(false);
  };

  const fetch_city_weather = async (city = "London", days = 5) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_WEATHER_API_URL}/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${city}&days=${days}`
      );
      const data = await res.json();
      console.log(data);
      if (data.error) {
        alert("Invalid city name");
        return weatherData;
      }
      setWeatherData(data);
      return data;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  useEffect(() => {
    fetchRecords();
    fetch_city_weather();
  }, []);

  const fetchWeather = async () => {
    if (!city || !startDate || !endDate) {
      alert("All fields required");
      return;
    }

    if (startDate >= endDate) {
      alert("End date must be after start date");
      return;
    }

    const diffTime = endDate - startDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 10) {
      alert("Date range cannot be greater than 10 days");
      return;
    }

    const start_date = formatDate(startDate);

    setGlobalLoading(true);
    
    const data = await fetch_city_weather(city, diffDays);
    
    if (!data) {
      setGlobalLoading(false);
      return;
    }
    
    try {
      await fetch(import.meta.env.VITE_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          city, 
          date: start_date, 
          temperature: data.current.temp_c 
        }),
      });

      setCity("");
      setStartDate(new Date());
      setEndDate(null);
      await fetchRecords();
    } catch (err) {
      console.error(err);
    }
    setGlobalLoading(false);
  };

  const deleteRecord = async (uid) => {
    setGlobalLoading(true);
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/${uid}`, { method: "DELETE" });
      await fetchRecords();
    } catch (err) {
      console.error(err);
    }
    setGlobalLoading(false);
  };

  const startEdit = (record) => {
    setEditingId(record.uid);
    setEditCity(record.city);
    setEditStartDate(new Date(record.date));
    setEditTemp(record.temperature);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditCity("");
    setEditStartDate(null);
    setEditTemp(0);
  };

  const saveEdit = async (uid) => {
    if (!editCity || !editStartDate || editTemp === 0 || !editTemp) {
      alert("All fields required");
      return;
    }

    const start_date = formatDate(editStartDate);

    setGlobalLoading(true);
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/${uid}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          city: editCity, 
          temperature: editTemp, 
          date: start_date 
        }),
      });
      
      cancelEdit();
      await fetchRecords();
    } catch (err) {
      console.error(err);
      alert("Failed to update record");
    }
    setGlobalLoading(false);
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(records, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "weather_records.json";
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6 relative">
      {/* Global Loading Overlay */}
      {globalLoading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <Loader className="animate-spin text-white" size={48} />
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <h1 className="text-4xl font-bold flex items-center gap-3">
          <CloudSun className="text-yellow-400" /> Advanced Weather App
        </h1>

        {/* Form */}
        <div className="bg-gray-900 p-6 rounded-2xl shadow-lg flex flex-wrap gap-4 items-center">
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            className="px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-white flex-1"
          />

          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            dateFormat="yyyy-MM-dd HH:mm"
            placeholderText="Start Date"
            className="px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-white"
          />

          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            dateFormat="yyyy-MM-dd HH:mm"
            placeholderText="End Date"
            className="px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-white"
          />

          <button
            onClick={fetchWeather}
            disabled={globalLoading || !city}
            className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-xl shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {globalLoading ? "Processing..." : "Fetch & Save Weather"}
          </button>
        </div>

        {/* Weather Display */}
        {weatherData && (
          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg text-white flex flex-col md:flex-row gap-6 items-center mt-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold">
                {weatherData.location.name}
              </h2>
              <p className="text-gray-300">
                {weatherData.location.region}, {weatherData.location.country}
              </p>
            </div>
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <div className="flex items-center gap-2 bg-gray-800 p-2 rounded-xl shadow">
                <Sun className="text-yellow-400" />{" "}
                <span>{weatherData.current.temp_c}°C</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-800 p-2 rounded-xl shadow">
                <CloudRain className="text-blue-400" />{" "}
                <span>{weatherData.current.condition.text}</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-800 p-2 rounded-xl shadow">
                <img src={weatherData.current.condition.icon} alt="icon" />
              </div>
              <div className="flex items-center gap-2 bg-gray-800 p-2 rounded-xl shadow">
                <Wind className="text-gray-400" />{" "}
                <span>{weatherData.current.wind_kph} kph</span>
              </div>
            </div>
          </div>
        )}

        {/* Weather Forecast Display */}
        {weatherData?.forecast?.forecastday && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
            {weatherData.forecast.forecastday.map((day) => (
              <div
                key={day.date}
                className="bg-gray-800 p-4 rounded-xl shadow flex flex-col items-center text-center"
              >
                <h3 className="font-semibold mb-2">
                  {new Date(day.date).toLocaleDateString()}
                </h3>
                <img
                  src={day.day.condition.icon}
                  alt={day.day.condition.text}
                  className="w-16 h-16 mb-2"
                />
                <p className="text-gray-300 mb-1">{day.day.condition.text}</p>
                <p className="mb-1">
                  <span className="font-bold">{day.day.maxtemp_c}°C</span> /{" "}
                  {day.day.mintemp_c}°C
                </p>
                <p className="text-blue-400 text-sm">
                  ☔ {day.day.daily_chance_of_rain}%
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <button
          onClick={downloadJSON}
          className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 shadow mt-4"
        >
          <Download size={16} /> Download JSON
        </button>

        {/* Table */}
        <div className="bg-gray-900 rounded-2xl shadow-lg overflow-x-auto mt-4">
          <table className="w-full text-left">
            <thead className="bg-gray-800">
              <tr>
                <th className="p-3">City</th>
                <th className="p-3">Date</th>
                <th className="p-3">Temperature (°C)</th>
                <th className="p-3">Updated At</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
                    No records found
                  </td>
                </tr>
              )}

              {records.map((r) => (
                <tr
                  key={r.uid}
                  className="border-t border-gray-800 hover:bg-gray-800 transition-colors"
                >
                  {editingId === r.uid ? (
                    // Edit mode
                    <>
                      <td className="p-3">
                        <input
                          value={editCity}
                          onChange={(e) => setEditCity(e.target.value)}
                          className="px-2 py-1 rounded bg-gray-700 border border-gray-600 text-white w-full"
                        />
                      </td>
                      <td className="p-3">
                        <DatePicker
                          selected={editStartDate}
                          onChange={(date) => setEditStartDate(date)}
                          showTimeSelect
                          timeFormat="HH:mm"
                          dateFormat="yyyy-MM-dd HH:mm"
                          className="px-2 py-1 rounded bg-gray-700 border border-gray-600 text-white w-full"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          value={editTemp}
                          onChange={(e) => setEditTemp(parseFloat(e.target.value))}
                          className="px-2 py-1 rounded bg-gray-700 border border-gray-600 text-white w-full"
                        />
                      </td>
                      <td className="p-3 text-sm text-gray-400">
                        {new Date(r.updated_at).toLocaleString()}
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => saveEdit(r.uid)}
                            className="text-green-400 hover:text-green-300"
                            title="Save"
                          >
                            <Save size={16} />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="text-gray-400 hover:text-gray-300"
                            title="Cancel"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    // View mode
                    <>
                      <td className="p-3">{r.city}</td>
                      <td className="p-3">
                        {new Date(r.date).toLocaleString()}
                      </td>
                      <td className="p-3">{r.temperature}°C</td>
                      <td className="p-3 text-sm text-gray-400">
                        {new Date(r.updated_at).toLocaleString()}
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit(r)}
                            className="text-blue-400 hover:text-blue-300"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => deleteRecord(r.uid)}
                            className="text-red-400 hover:text-red-300"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dark mode fix for DatePicker */}
      <style>{`
        .react-datepicker {
          background-color: #111827;
          color: white;
          border: 1px solid #374151;
        }
        .react-datepicker__header {
          background-color: #1f2937;
          border-bottom: 1px solid #374151;
        }
        .react-datepicker__day,
        .react-datepicker__time-list-item {
          color: white;
        }
        .react-datepicker__day--selected,
        .react-datepicker__time-list-item--selected {
          background-color: #2563eb;
        }
        .react-datepicker__current-month,
        .react-datepicker__day-name {
          color: white;
        }
      `}</style>
    </div>
  );
}