export function generateVideoThumbnail(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    video.addEventListener('loadedmetadata', () => {
      canvas.width = 320;
      canvas.height = 568;
      video.currentTime = 1;
    });

    video.addEventListener('seeked', () => {
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create thumbnail'));
          }
        }, 'image/jpeg', 0.8);
      }
    });

    video.addEventListener('error', () => {
      reject(new Error('Video load failed'));
    });

    video.src = URL.createObjectURL(file);
    video.load();
  });
}
