import React, { useState } from 'react';

const ServerCreationForm = () => {
  const [serverName, setServerName] = useState('');
  const [serverRegion, setServerRegion] = useState('us-west');
  const [serverIcon, setServerIcon] = useState(null);
  const [serverIconPreview, setServerIconPreview] = useState(null);

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setServerIcon(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setServerIconPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to the backend
    console.log({
      serverName,
      serverRegion,
      serverIcon,
    });
  };

  return (
    <div className="max-w-md absolute mx-auto  left-16 bg-gray-800 text-white p-6 rounded-lg shadow-lg z-10">
      <h2 className="text-2xl font-bold mb-4">Create a Server</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="serverName" className="block text-sm font-medium">Server Name</label>
          <input
            id="serverName"
            type="text"
            value={serverName}
            onChange={(e) => setServerName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        
       {/*  <div>
          <label htmlFor="serverRegion" className="block text-sm font-medium">Server Region</label>
          <select
            id="serverRegion"
            value={serverRegion}
            onChange={(e) => setServerRegion(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="us-west">US West</option>
            <option value="us-east">US East</option>
            <option value="eu-west">EU West</option>
            <option value="eu-east">EU East</option>
          </select>
        </div> */}

        <div>
          <label htmlFor="serverIcon" className="block text-sm font-medium">Server Icon</label>
          <input
            id="serverIcon"
            type="file"
            accept="image/*"
            onChange={handleIconChange}
            className="mt-1 block w-full text-sm text-gray-300
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-500 file:text-white
              hover:file:bg-indigo-600"
          />
          {serverIconPreview && (
            <img
              src={serverIconPreview}
              alt="Server Icon Preview"
              className="mt-2 w-20 h-20 rounded-full object-cover"
            />
          )}
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-500 hover:bg-indigo-600 rounded-md shadow-sm font-medium text-white"
          >
            Create Server
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServerCreationForm;
