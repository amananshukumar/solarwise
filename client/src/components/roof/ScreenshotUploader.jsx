import React, { useState, useRef } from 'react';
import { UploadCloud, Image, Trash2, CheckCircle2, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';

export default function ScreenshotUploader({ onImageSelected, onAnalyze, isAnalyzing }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [base64Data, setBase64Data] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const processFile = (file) => {
    setErrorMsg('');
    if (!file) return;

    // Validate type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrorMsg('Unsupported format. Please upload JPG, JPEG, PNG, or WEBP image.');
      return;
    }

    // Validate size (10 MB max)
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('File size exceeds 10 MB limit. Please compress or crop screenshot.');
      return;
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // Convert to Base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const b64 = reader.result;
      setBase64Data(b64);
      if (onImageSelected) {
        onImageSelected({ file, previewUrl: objectUrl, base64: b64, mimeType: file.type });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setBase64Data('');
    setErrorMsg('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-base font-extrabold text-slate-950 dark:text-white flex items-center gap-2">
          <UploadCloud className="w-5 h-5 text-emerald-500" />
          <span>Upload Satellite Rooftop Screenshot</span>
        </h4>
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          JPG, PNG, WEBP • Max 10MB
        </span>
      </div>

      {!previewUrl ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 scale-[1.01]'
              : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 hover:border-emerald-500/50'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])}
            accept="image/jpeg,image/jpg,image/png,image/webp"
            className="hidden"
          />

          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 p-0.5 shadow-lg flex items-center justify-center">
            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
              <UploadCloud className="w-8 h-8 text-emerald-400" />
            </div>
          </div>

          <p className="text-base font-extrabold text-slate-900 dark:text-white">
            Drag & Drop Satellite Screenshot Here
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
            or click to browse your computer files
          </p>
        </div>
      ) : (
        <div className="glass-card p-4 rounded-2xl border border-emerald-500/40 bg-white dark:bg-slate-900 space-y-4 shadow-md">
          <div className="relative rounded-xl overflow-hidden max-h-64 border border-slate-200 dark:border-slate-800 bg-slate-950">
            <img src={previewUrl} alt="Rooftop Satellite Screenshot" className="w-full object-cover" />
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <button
                type="button"
                onClick={handleRemove}
                className="p-2 rounded-xl bg-slate-900/80 hover:bg-red-600 text-white transition-all shadow-md"
                title="Remove Image"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 font-semibold">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="truncate max-w-[200px]">{selectedFile?.name}</span>
            </div>
            <span>{(selectedFile?.size / (1024 * 1024)).toFixed(2)} MB</span>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {previewUrl && (
        <button
          type="button"
          onClick={() => onAnalyze(base64Data, selectedFile?.type)}
          disabled={isAnalyzing}
          className="w-full py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 hover:from-emerald-500 hover:to-amber-400 text-white font-extrabold text-base rounded-2xl shadow-xl shadow-emerald-500/25 transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2.5 disabled:opacity-50"
        >
          <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
          <span>Run Gemini Vision AI Rooftop Analysis</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
