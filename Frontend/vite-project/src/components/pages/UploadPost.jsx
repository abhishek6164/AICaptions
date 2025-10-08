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
      const res = await api.post("/api/posts", formData);
      setCaption(res.data.post.caption);
      setPreview(res.data.post.image);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error uploading image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-pink-100 p-6">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-white/20 transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
        <h2 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
          Upload & Auto-Generate Caption
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative group">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-600 cursor-pointer
                         file:mr-4 file:py-3 file:px-5
                         file:rounded-lg file:border-0
                         file:text-sm file:font-semibold
                         file:bg-gradient-to-r file:from-indigo-500 file:to-pink-500 
                         file:text-white hover:file:opacity-90
                         transition-all duration-300"
            />
          </div>

          {preview && (
            <div className="relative overflow-hidden rounded-xl shadow-md mt-4">
              <img
                src={preview}
                alt="preview"
                className="w-full h-56 object-cover rounded-xl transform hover:scale-105 transition duration-300 ease-in-out"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-2 rounded-xl font-semibold text-white 
                        bg-gradient-to-r from-indigo-600 to-pink-600 
                        hover:from-indigo-500 hover:to-pink-500 
                        transition-all duration-300 shadow-md hover:shadow-lg 
                        disabled:opacity-50`}
          >
            {loading ? "✨ Generating Caption..." : "🚀 Upload & Generate"}
          </button>
        </form>

        {caption && (
          <div className="mt-6 p-5 bg-white/80 backdrop-blur-md border border-gray-100 rounded-xl shadow-inner transition-all">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              ✨ Generated Caption
            </h3>
            <p className="text-gray-700 italic leading-relaxed">
              “{caption}”
            </p>
          </div>
        )}
      </div>

      <p className="mt-10 text-gray-500 text-sm">
        Crafted with 💜 by Abhishek — powered by Gemini AI ⚡
      </p>
    </div>
  );
}