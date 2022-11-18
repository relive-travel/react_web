import loadImage from "blueimp-load-image";

export const preivewImage = (fileObjects) => {
  const $preview = document.querySelector(".photo-preview");
  while ($preview.firstChild) {
    $preview.removeChild($preview.firstChild);
  }

  const files = Object.values(fileObjects);
  files.forEach(async (file, index) => {
    const fileExifData = await loadImage(file);
    const width = fileExifData.originalWidth;
    const height = fileExifData.originalHeight;

    const $img = document.createElement("img");
    $img.classList = `preview-${index}`;
    width > height ? ($img.style.height = "100%") : ($img.style.width = "100%");
    $preview.appendChild($img);

    const reader = new FileReader();

    reader.addEventListener("load", () => {
      $img.src = reader.result;
    });

    reader.readAsDataURL(file);
  });
};
