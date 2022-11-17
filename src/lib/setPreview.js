import EXIF from "exif-js";

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

export const exifImage = async (fileObjects) => {
  const files = Object.values(fileObjects);
  const filesInfo = Promise.all(
    files.map(async (file) => {
      let exifData = await new Promise((resolve) => {
        EXIF.getData(file, () => {
          resolve(EXIF.getAllTags(file));
        });
      });
      return {
        ...file,
        exifData,
      };
    })
  );
  // const filesInfo = files.map((file, index) => {
  //   var latitude, longitude, date;
  //   EXIF.getData(file, () => {
  //     if (EXIF.pretty(file)) {
  //       var latRef = EXIF.getTag(file, "GPSLatitudeRef");
  //       var lat = EXIF.getTag(file, "GPSLatitude");
  //       latitude =
  //         latRef === "S"
  //           ? -1 * lat[0] + (60 * lat[1] + -1 * lat[2]) / 3600
  //           : lat[0] + (60 * lat[1] + lat[2]) / 3600;
  //       var longRef = EXIF.getTag(file, "GPSLongitudeRef");
  //       var long = EXIF.getTag(file, "GPSLongitude");
  //       longitude =
  //         longRef === "W"
  //           ? -1 * long[0] + (60 * long[1] + -1 * long[2]) / 3600
  //           : long[0] + (60 * long[1] + long[2]) / 3600;
  //       date = EXIF.getTag(file, "DateTime");
  //     }
  //   });
  //   return {
  //     latitude,
  //     longitude,
  //     date,
  //   };
  // });
  console.log(filesInfo);
  return filesInfo;
};
