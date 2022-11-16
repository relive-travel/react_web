import EXIF from "exif-js";

export const preivewImage = (fileObjects) => {
  const $preview = document.querySelector(".photo-preview");
  while ($preview.firstChild) {
    $preview.removeChild($preview.firstChild);
  }

  const files = Object.values(fileObjects);
  files.forEach((file, index) => {
    var width, height;
    EXIF.getData(file, () => {
      if (EXIF.pretty(file)) {
        width = EXIF.getTag(file, "ImageWidth");
        height = EXIF.getTag(file, "ImageHeight");
      }
    });
    const $image = document.createElement("article");
    const $img = document.createElement("img");
    $img.classList = `preview-${index}`;
    width > height ? ($img.style.width = "100%") : ($img.style.height = "100%");

    $image.appendChild($img);
    $preview.appendChild($image);

    const reader = new FileReader();

    reader.addEventListener("load", () => {
      $img.src = reader.result;
    });

    reader.readAsDataURL(file);
  });
};
