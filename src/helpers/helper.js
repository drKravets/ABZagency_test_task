const getFileWidthAndHeigh = (file) => {
  let reader = new FileReader();
  const onloadPromise = new Promise((resolve, reject) => {
    reader.onload = function (e) {
      const image = new Image();
      const promise = new Promise((resolve, reject) => {
        image.onload = () => {
          const width = image.naturalWidth;
          const height = image.naturalHeight;
          resolve({ width, height });
        };

        image.onerror = reject;
      });

      image.src = e.target?.result;

      reader.onerror = reject;
      resolve(promise);
    };

    reader.readAsDataURL(file);
  });

  return onloadPromise;
};

export { getFileWidthAndHeigh };
