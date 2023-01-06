import loadImage from "blueimp-load-image";

import { clearPreview } from "../jsUtils";

export const preivewImage = ($preview, fileObjects) => {
  clearPreview($preview);

  const files = Object.values(fileObjects);
  files.forEach(async (file, index) => {
    const fileExifData = await loadImage(file);
    const width = fileExifData.originalWidth;
    const height = fileExifData.originalHeight;

    const $section = document.createElement("section");
    const $img = document.createElement("img");
    $img.classList = `preview-${index}`;
    width > height ? ($img.style.height = "100%") : ($img.style.width = "100%");
    $section.appendChild($img);
    $preview.appendChild($section);

    const reader = new FileReader();

    reader.addEventListener("load", () => {
      $img.src = reader.result;
    });

    reader.readAsDataURL(file);
  });
};
