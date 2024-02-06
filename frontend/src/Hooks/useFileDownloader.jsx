import { useCallback } from 'react';

export const useFileDownloader = () => {
  const downloadFile = useCallback(async (url, filename, token) => {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const blob = await response.blob();
    //used for troubleshooting
    //console.log(blob);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const urlBlob = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = urlBlob;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }, []);

  return { downloadFile };
}