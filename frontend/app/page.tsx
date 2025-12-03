"use client";

import { useState, useEffect } from "react";

// Campaign object structure
interface Campaign {
  id: number;
  name: string;
  status: string;
  clicks: number;
  cost: number;
  impressions: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function Home() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch campaigns from API
  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = `${API_URL}/campaigns`;
        if (filter !== "All") {
          url += `?status=${filter}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch campaigns");
        }
        const data = await response.json();
        setCampaigns(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [filter]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">Campaign Analytics Dashboard</h1>
        <p className="text-gray-500 mb-6">Track your marketing campaign performance</p>

        {/* Filter Dropdown */}
        <div className="mb-4">
          <label className="mr-2 font-medium text-gray-700">Filter by Status:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Paused">Paused</option>
          </select>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
            Error: {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <p className="text-gray-600">Loading campaigns...</p>
        ) : (
          /* Campaigns Table */
          <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="text-left p-4 font-semibold text-gray-700">Campaign Name</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Clicks</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Cost</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Impressions</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="p-4 text-gray-900 font-medium">{campaign.name}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          campaign.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {campaign.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-900">{campaign.clicks.toLocaleString()}</td>
                    <td className="p-4 text-gray-900">${campaign.cost.toFixed(2)}</td>
                    <td className="p-4 text-gray-900">{campaign.impressions.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {campaigns.length === 0 && (
              <p className="p-4 text-center text-gray-500">No campaigns found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
