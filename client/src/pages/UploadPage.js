import React, { useState, useEffect } from 'react';

import { useRequest } from "../_hooks/fetch";
import { useToast } from '../_hooks/message';

export const UploadPage = () => {
  const toast = useToast();
  const [file, setFile] = useState({file: null});

  const { 
    error,
    clearError,
    loading, 
    request
  } = useRequest();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('file', file);
      const res = await request('/api/upload', 'POST', data);
      toast(res.message, true);
    } catch (err) {}
  }

  useEffect(() => {
    toast(error);
    clearError();
  }, [toast, error, clearError]);

  return (
    <form action="#" onSubmit={handleSubmit}>
      <div className="file-field inpsut-field">
        <div className="btn btn-flat">
          <span>File</span>
          <input 
            type="file"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept=".txt"
            required
          />
        </div>
          <div className="file-path-wrapper">
          <input 
            className="file-path"
            type="text"
            placeholder="Choose file to upload"
          />
        </div>
      </div>
      <button type="submit" className="btn red lighten-1 right" disabled={loading}>Upload</button>
    </form>
  );
}