import { useState } from "react";
import api from "../../api";

export default function UploadPost() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an image");

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      // Let the browser set the Content-Type (including the multipart boundary)
      const res = await api.post("/api/posts", formData);

      setCaption(res.data.post.caption);
      setPreview(res.data.post.image); // backend ka uploaded image url
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error uploading image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
          Upload Image & Generate Caption
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0
                       file:text-sm file:font-semibold
                       file:bg-indigo-50 file:text-indigo-600
                       hover:file:bg-indigo-100"
          />

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Generating Caption..." : "Upload & Generate"}
          </button>
        </form>

        {caption && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-inner">
            <h3 className="text-lg font-semibold text-gray-800">Generated Caption:</h3>
            <p className="text-gray-600 mt-2">{caption}</p>
          </div>
        )}
      </div>
    </div>
  );
}
