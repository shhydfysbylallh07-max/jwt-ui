import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

// Sample API endpoints and their payloads
const API_ENDPOINTS = [
  {
    id: 'submit-job',
    name: 'Submit Job',
    url: 'https://agent-service.emergentagent.com/jobs/v0/submit-queue/',
    method: 'POST',
    description: 'Submit a new job to the queue',
    payload: {
      payload: {
        processor_type: "env_only",
        is_cloud: true,
        env_image: "us-central1-docker.pkg.dev/emergent-default/emergent-container-hub/fastapi_react_mongo_base_image_cloud:6b87a8a1047190d35c9ae911e054a6cb6f93b411",
        branch: "",
        repository: "",
        prompt_name: "mukund_test_agent",
        prompt_version: "latest",
        work_space_dir: "",
        task: "Create a frontend app which has sign in email/password setup using supabase. after signing in, it has an option of copy-jwt-to-clipboard button. We want this app because we use this jwt to make authenticated api calls from some scripts.",
        model_name: "claude-3-7-sonnet-20250219?thinking_mode=true",
        per_instance_cost_limit: 10,
        agentic_skills: [
          "deep_testing_cloud",
          "planner_agent_cloud",
          "integration_playbook_expert"
        ],
        portMapping: [
          {
            id: "port-frontend",
            hostPort: "55485",
            containerPort: "55485",
            service: "frontend"
          },
          {
            id: "port-backend",
            hostPort: "55229",
            containerPort: "55229",
            service: "backend"
          },
          {
            id: "port-vscode",
            hostPort: "55262",
            containerPort: "55262",
            service: "vscode"
          },
          {
            id: "port-mongo",
            hostPort: "55469",
            containerPort: "55469",
            service: "mongo"
          },
          {
            id: "port-extra1",
            hostPort: "55339",
            containerPort: "55339",
            service: "extra1"
          },
          {
            id: "port-extra2",
            hostPort: "55903",
            containerPort: "55903",
            service: "extra2"
          }
        ],
        plugin_version: "release-07032025-1"
      },
      model_name: "claude-3-7-sonnet-20250219?thinking_mode=true",
      resume: false,
      client_ref_id: "8d4e9c2a-b7f5-4193-ae68-f12d90c83e5d"
    }
  },
  {
    id: 'job-status',
    name: 'Job Status',
    url: 'https://agent-service.emergentagent.com/jobs/v0/ref/8d4e9c2a-b7f5-4193-ae68-f12d90c83e5d',
    method: 'GET',
    description: 'Check the status of a job',
    payload: null
  },
  {
    id: 'get-trajectory',
    name: 'Get Trajectory',
    url: 'https://agent-service.emergentagent.com/trajectories/v0/?job_id=8d4e9c2a-b7f5-4193-ae68-f12d90c83e5d',
    method: 'GET',
    description: 'Get the trajectory of a job',
    payload: null
  },
  {
    id: 'send-hitl',
    name: 'Send Human-in-the-loop Message',
    url: 'https://agent-service.emergentagent.com/jobs/v0/submit-queue/',
    method: 'POST',
    description: 'Send a human-in-the-loop message for an ongoing trajectory',
    payload: {
      payload: {
        processor_type: "env_only",
        is_cloud: true,
        env_image: "",
        branch: "",
        repository: "",
        task: "Proceed for now without the keys",
        prompt_name: "",
        prompt_version: "latest",
        work_space_dir: "",
        model_name: "claude-3-7-sonnet-20250219?thinking_mode=true"
      },
      model_name: "claude-3-7-sonnet-20250219?thinking_mode=true",
      resume: true,
      id: "8d4e9c2a-b7f5-4193-ae68-f12d90c83e5d",
      client_ref_id: "8d4e9c2a-b7f5-4193-ae68-f12d90c83e5d"
    }
  }
];

export default function ApiDocs() {
  const { jwt } = useAuth();
  const [selectedEndpoint, setSelectedEndpoint] = useState(API_ENDPOINTS[0]);
  const [editedPayload, setEditedPayload] = useState('');
  const [useFilePayload, setUseFilePayload] = useState(false);
  const [payloadFilename, setPayloadFilename] = useState('payload.json');
  const [exportCommand, setExportCommand] = useState('');

  useEffect(() => {
    if (selectedEndpoint && selectedEndpoint.payload) {
      setEditedPayload(JSON.stringify(selectedEndpoint.payload, null, 2));
    } else {
      setEditedPayload('');
    }
  }, [selectedEndpoint]);

  useEffect(() => {
    if (jwt) {
      // Create export command for different shells
      const bashExport = `export JWT_TOKEN="${jwt}"`;
      setExportCommand(bashExport);
    }
  }, [jwt]);

  const handleEndpointChange = (endpointId) => {
    const endpoint = API_ENDPOINTS.find(ep => ep.id === endpointId);
    setSelectedEndpoint(endpoint);
  };

  const handlePayloadChange = (e) => {
    setEditedPayload(e.target.value);
  };

  const handleFilenameChange = (e) => {
    setPayloadFilename(e.target.value);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success('Copied to clipboard!');
      })
      .catch((error) => {
        toast.error('Failed to copy: ' + error.message);
      });
  };

  const generateCurlCommand = () => {
    let curlCommand = `curl '${selectedEndpoint.url}' \\\n`;
    
    // Add headers
    curlCommand += `  -H 'accept: application/json, text/plain, */*' \\\n`;
    curlCommand += `  -H 'accept-language: en-GB' \\\n`;
    curlCommand += `  -H 'authorization: Bearer $JWT_TOKEN' \\\n`;
    
    if (selectedEndpoint.method === 'POST') {
      curlCommand += `  -H 'content-type: application/json' \\\n`;
    }
    
    curlCommand += `  -H 'priority: u=1, i' \\\n`;
    curlCommand += `  -H 'sec-ch-ua: "Not?A_Brand";v="99", "Chromium";v="130"' \\\n`;
    curlCommand += `  -H 'sec-ch-ua-mobile: ?0' \\\n`;
    curlCommand += `  -H 'sec-ch-ua-platform: "macOS"' \\\n`;
    curlCommand += `  -H 'sec-fetch-dest: empty' \\\n`;
    curlCommand += `  -H 'sec-fetch-mode: cors' \\\n`;
    curlCommand += `  -H 'sec-fetch-site: cross-site' \\\n`;
    curlCommand += `  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.170 Safari/537.36'`;
    
    // Add payload for POST requests
    if (selectedEndpoint.method === 'POST' && editedPayload) {
      if (useFilePayload) {
        curlCommand += ` \\\n  -d @${payloadFilename}`;
      } else {
        // Escape double quotes and format JSON for inline use
        const escapedPayload = editedPayload.replace(/"/g, '\\"');
        curlCommand += ` \\\n  -d "${escapedPayload}"`;
      }
    }
    
    return curlCommand;
  };

  const generatePayloadFileContent = () => {
    try {
      return editedPayload;
    } catch (error) {
      return '// Error: Invalid JSON';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">API Documentation</h1>
      
      {/* JWT Export Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">JWT Authentication</h2>
        <p className="mb-4">
          To use the API, you need to export your JWT token as an environment variable.
          Copy and run the following command in your terminal:
        </p>
        
        <div className="bg-gray-100 p-4 rounded-md mb-4 relative">
          <pre className="font-mono text-sm overflow-x-auto">{exportCommand}</pre>
          <button 
            onClick={() => copyToClipboard(exportCommand)}
            className="absolute top-2 right-2 bg-indigo-600 text-white px-2 py-1 rounded text-xs hover:bg-indigo-700"
          >
            Copy
          </button>
        </div>
        
        <p className="text-sm text-gray-600">
          This will set the JWT_TOKEN environment variable that can be used in the curl commands below.
        </p>
      </div>
      
      {/* API Endpoints Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">API Endpoints</h2>
        
        {/* Endpoint Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Endpoint
          </label>
          <select
            value={selectedEndpoint.id}
            onChange={(e) => handleEndpointChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            {API_ENDPOINTS.map(endpoint => (
              <option key={endpoint.id} value={endpoint.id}>
                {endpoint.name} ({endpoint.method})
              </option>
            ))}
          </select>
        </div>
        
        {/* Endpoint Details */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">{selectedEndpoint.name}</h3>
          <p className="text-gray-600 mb-2">{selectedEndpoint.description}</p>
          <div className="bg-gray-100 p-3 rounded-md mb-2">
            <span className="font-semibold">{selectedEndpoint.method}</span> {selectedEndpoint.url}
          </div>
        </div>
        
        {/* Payload Editor (for POST requests) */}
        {selectedEndpoint.method === 'POST' && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Request Payload
              </label>
              <div className="flex items-center">
                <label className="inline-flex items-center mr-4">
                  <input
                    type="checkbox"
                    checked={useFilePayload}
                    onChange={() => setUseFilePayload(!useFilePayload)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">Use file payload</span>
                </label>
                {useFilePayload && (
                  <input
                    type="text"
                    value={payloadFilename}
                    onChange={handleFilenameChange}
                    placeholder="filename.json"
                    className="px-2 py-1 text-sm border border-gray-300 rounded-md"
                  />
                )}
              </div>
            </div>
            <div className="relative">
              <textarea
                value={editedPayload}
                onChange={handlePayloadChange}
                rows={12}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
              />
              <button 
                onClick={() => {
                  try {
                    const formatted = JSON.stringify(JSON.parse(editedPayload), null, 2);
                    setEditedPayload(formatted);
                    toast.success('JSON formatted');
                  } catch (e) {
                    toast.error('Invalid JSON');
                  }
                }}
                className="absolute bottom-2 right-2 bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs hover:bg-gray-300"
              >
                Format JSON
              </button>
            </div>
          </div>
        )}
        
        {/* Generated curl Command */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              curl Command
            </label>
            <button 
              onClick={() => copyToClipboard(generateCurlCommand())}
              className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700"
            >
              Copy Command
            </button>
          </div>
          <div className="bg-gray-100 p-4 rounded-md">
            <pre className="font-mono text-sm overflow-x-auto whitespace-pre-wrap">{generateCurlCommand()}</pre>
          </div>
        </div>
        
        {/* Payload File Content (if using file payload) */}
        {selectedEndpoint.method === 'POST' && useFilePayload && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                {payloadFilename} Content
              </label>
              <button 
                onClick={() => copyToClipboard(generatePayloadFileContent())}
                className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700"
              >
                Copy File Content
              </button>
            </div>
            <div className="bg-gray-100 p-4 rounded-md">
              <pre className="font-mono text-sm overflow-x-auto whitespace-pre-wrap">{generatePayloadFileContent()}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
