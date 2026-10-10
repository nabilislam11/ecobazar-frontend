export const getImageUrl = (image) => {
  if (!image) return "";

  if (typeof image === "string") {
    return image.startsWith("http")
      ? image
      : `http://localhost:5000/${image.replace(/\\/g, "/")}`;
  }

  if (image.url) {
    return image.url.startsWith("http")
      ? image.url
      : `http://localhost:5000/${image.url.replace(/\\/g, "/")}`;
  }

  return "";
};

export const getMainImage = (images = []) => {
  if (!Array.isArray(images) || images.length === 0) return null;

  return images.find((image) => image?.isMain === true) || images[0];
};
