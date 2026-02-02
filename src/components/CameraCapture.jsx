import { useState, useRef } from 'react';
import { FaCamera, FaVideo, FaTrash, FaRedo } from 'react-icons/fa';

const CameraCapture = ({ onFileSelected }) => {
  const [preview, setPreview] = useState(null); // URL of the file
  const [fileType, setFileType] = useState(null); // 'image' or 'video'
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setFileType(file.type.startsWith('video') ? 'video' : 'image');
      onFileSelected(file);
    }
  };

  const clearFile = () => {
    setPreview(null);
    setFileType(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    onFileSelected(null);
  };

  const triggerInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      <input
        type="file"
        accept="image/*,video/*"
        capture="environment" // Hints mobile browsers to use the rear camera
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {!preview ? (
        <button
          type="button"
          onClick={triggerInput}
          className="w-full h-56 border-2 border-dashed border-zinc-700 hover:border-red-500/50 rounded-3xl flex flex-col items-center justify-center gap-4 text-zinc-400 hover:text-white transition-all bg-zinc-800/20 hover:bg-zinc-800/40 group cursor-pointer overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="p-5 bg-zinc-800 group-hover:bg-red-600 rounded-full transition-all group-hover:scale-110 duration-300 shadow-xl group-hover:shadow-red-600/30 z-10">
            <FaCamera className="text-3xl" />
          </div>
          <span className="font-bold z-10 text-lg">التقط صورة أو فيديو</span>
          <span className="text-xs text-zinc-500 z-10">للتوثيق السريع</span>
        </button>
      ) : (
        <div className="relative rounded-3xl overflow-hidden border border-zinc-700 shadow-2xl bg-black group">
          {fileType === 'video' ? (
            <video src={preview} controls className="w-full max-h-[500px] object-contain bg-black" />
          ) : (
            <img src={preview} alt="Captured accident" className="w-full max-h-[500px] object-cover" />
          )}
          
          <div className="absolute top-4 left-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={triggerInput}
              type="button"
              className="p-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-white/20 transition-all shadow-lg"
              title="Retake"
            >
              <FaRedo size={16} />
            </button>
            <button
              onClick={clearFile}
              type="button"
              className="p-3 bg-red-500/80 backdrop-blur-md border border-red-400/30 text-white rounded-full hover:bg-red-600 transition-all shadow-lg hover:shadow-red-900/50"
              title="Remove"
            >
              <FaTrash size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraCapture;
