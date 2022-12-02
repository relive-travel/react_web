import loadImage from "blueimp-load-image";

export const previewClearImage = ($preview) => {
  while ($preview.lastChild) {
    if ($preview.lastChild.tagName === "ARTICLE") {
      $preview.removeChild($preview.lastChild);
    } else {
      break;
    }
  }
};

export const preivewImage = ($preview, fileObjects) => {
  previewClearImage($preview);

  const files = Object.values(fileObjects);
  files.forEach(async (file, index) => {
    const fileExifData = await loadImage(file);
    const width = fileExifData.originalWidth;
    const height = fileExifData.originalHeight;

    const $article = document.createElement("article");
    const $img = document.createElement("img");
    $img.classList = `preview-${index}`;
    width > height ? ($img.style.height = "100%") : ($img.style.width = "100%");
    $article.appendChild($img);
    $preview.appendChild($article);

    const reader = new FileReader();

    reader.addEventListener("load", () => {
      $img.src = reader.result;
    });

    reader.readAsDataURL(file);
  });
};
