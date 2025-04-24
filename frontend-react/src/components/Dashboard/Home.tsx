import { useState, ChangeEvent, FormEvent } from "react";
import { request } from "../../services/api";

interface UploadStatusType {
  success: boolean;
  message: string;
}

const Home: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<UploadStatusType | null>(
    null,
  );

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadStatus(null);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      setUploadStatus({
        success: false,
        message: "Please select a file first.",
      });
      return;
    }

    if (!file.name.endsWith(".sql")) {
      setUploadStatus({
        success: false,
        message: "Only .sql files are accepted.",
      });
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("dump_file", file);

      // Replace with your actual endpoint
      const response = await request("post", "/dump", formData);

      if (response.ok) {
        setUploadStatus({
          success: true,
          message: "Dump restored successfully!",
        });
        setFile(null);
      } else {
        const errorData = await response.json();
        setUploadStatus({
          success: false,
          message: errorData.message || "Upload failed.",
        });
      }
    } catch (error) {
      setUploadStatus({
        success: false,
        message: "Error uploading file. Please try again.",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-center pb-12">
      <h1 className="text-7xl font-bold">
        <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
          Researcher Network
        </span>
      </h1>
      <p className="mt-3 text-4xl text-gray-300">
        Connect, collaborate, and innovate.
      </p>
      <img src="/logo.svg" alt="Logo" className="mt-8 h-48" />

      <div className="mt-12 w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="w-full rounded-md border border-gray-600 bg-gray-800 p-4">
            <div className="mb-4">
              <label
                htmlFor="file-upload"
                className="block text-sm font-medium text-gray-300"
              >
                Upload .sql dump File
              </label>
              <input
                id="file-upload"
                type="file"
                accept=".sql"
                onChange={handleFileChange}
                className="mt-1 block w-full rounded-md border border-gray-500 bg-gray-700 px-3 py-2 text-gray-200 file:mr-4 file:rounded-md file:border-0 file:bg-gray-600 file:px-4 file:py-2 file:text-gray-200 hover:file:bg-gray-500"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={uploading}
                className="rounded-md bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 font-medium text-white hover:from-orange-600 hover:to-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>

            {uploadStatus && (
              <div
                className={`mt-4 rounded-md p-3 ${uploadStatus.success ? "bg-green-800 text-green-100" : "bg-red-800 text-red-100"}`}
              >
                {uploadStatus.message}
              </div>
            )}

            {file && !uploading && !uploadStatus && (
              <div className="mt-4 text-center text-sm text-gray-300">
                Ready to upload: {file.name}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
