import EXIF from "exif-js";
import loadImage from "blueimp-load-image";

export const getExifData = async (fileObject) => {
  const [file] = Object.values(fileObject);
  let exifdata = await new Promise((resolve) => {
    EXIF.getData(file, async () => {
      if (EXIF.pretty(file)) {
        const fileExifData = await loadImage(file);
        const width = fileExifData.originalWidth;
        const height = fileExifData.originalHeight;
        let lat = EXIF.getTag(file, "GPSLatitude");
        let latRef = EXIF.getTag(file, "GPSLatitudeRef");
        let long = EXIF.getTag(file, "GPSLongitude");
        let longRef = EXIF.getTag(file, "GPSLongitudeRef");
        if (!lat && !long) {
          resolve(null);
        } else {
          let latitude =
            latRef === "S"
              ? -1 * lat[0] + (60 * lat[1] + -1 * lat[2]) / 3600
              : lat[0] + (60 * lat[1] + lat[2]) / 3600;
          let longitude =
            longRef === "W"
              ? -1 * long[0] + (60 * long[1] + -1 * long[2]) / 3600
              : long[0] + (60 * long[1] + long[2]) / 3600;
          let dateTime = EXIF.getTag(file, "DateTimeOriginal").split(" ");
          let date = dateTime[0].replace(/\:/g, "-") + " " + dateTime[1];
          resolve({
            width,
            height,
            latitude,
            longitude,
            date,
          });
        }
      } else {
        resolve(null);
      }
    });
  });
  return {
    name: file.name,
    exifdata,
  };
};

export const getExifDataList = async (fileObjects) => {
  const files = Object.values(fileObjects);
  const filesInfo = Promise.all(
    files.map(async (file) => {
      let exifdata = await new Promise((resolve) => {
        EXIF.getData(file, async () => {
          const fileOriginal = await loadImage(file);
          const width = fileOriginal.originalWidth;
          const height = fileOriginal.originalHeight;

          let fileExifData = EXIF.getAllTags(file);
          fileExifData.ImageWidth = width;
          fileExifData.ImageHeight = height;
          resolve(fileExifData);
        });
      });
      return {
        name: file.name,
        exifdata,
      };
    })
  );
  return filesInfo;
};
