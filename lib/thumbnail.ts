export const generateThumbnail = (videoFile: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    video.onloadedmetadata = () => {
      canvas.width = 320;
      canvas.height = 568; // 9:16 aspect ratio
      
      video.currentTime = 1; // Capture at 1 second
    };

    video.onseeked = () => {
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const thumbnail = canvas.toDataURL('image/jpeg', 0.8);
        resolve(thumbnail);
      } else {
        reject(new Error('Canvas context not available'));
      }
    };

    video.onerror = () => reject(new Error('Video load error'));
    video.src = URL.createObjectURL(videoFile);
  });
};
