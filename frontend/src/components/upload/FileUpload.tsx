'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import apiClient from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { ApiResponse } from '@/lib/api/types';

interface UploadResult {
  key: string;
  url: string;
  bucket: string;
}

interface FileUploadProps {
  onUploadSuccess?: (result: UploadResult) => void;
  onUploadError?: (error: string) => void;
  folder?: string;
  makePublic?: boolean;
}

export function FileUpload({
  onUploadSuccess,
  onUploadError,
  folder = 'uploads',
  makePublic = false,
}: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);
      formData.append('makePublic', makePublic.toString());

      // Don't set Content-Type header - axios will set it automatically with boundary
      const response = await apiClient.post<ApiResponse<UploadResult>>(
        API_ENDPOINTS.upload.upload,
        formData
      );
      return response.data.data!;
    },
    onSuccess: (data) => {
      onUploadSuccess?.(data);
      setSelectedFile(null);
      setPreview(null);
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.error?.message || 'Upload failed';
      onUploadError?.(errorMessage);
    },
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      uploadMutation.mutate(selectedFile);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select File
        </label>
        <input
          type="file"
          onChange={handleFileSelect}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          disabled={uploadMutation.isPending}
        />
      </div>

      {preview && (
        <div>
          <img src={preview} alt="Preview" className="max-w-xs rounded-md" />
        </div>
      )}

      {selectedFile && (
        <div className="text-sm text-gray-600">
          <p>Selected: {selectedFile.name}</p>
          <p>Size: {(selectedFile.size / 1024).toFixed(2)} KB</p>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!selectedFile || uploadMutation.isPending}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {uploadMutation.isPending ? 'Uploading...' : 'Upload File'}
      </button>

      {uploadMutation.isError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {uploadMutation.error instanceof Error
            ? uploadMutation.error.message
            : 'Upload failed'}
        </div>
      )}

      {uploadMutation.isSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          File uploaded successfully!
        </div>
      )}
    </div>
  );
}

