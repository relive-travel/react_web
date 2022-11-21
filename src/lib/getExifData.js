// var latRef = EXIF.getTag(file, "GPSLatitudeRef");
// var lat = EXIF.getTag(file, "GPSLatitude");
// latitude =
//   latRef === "S"
//     ? -1 * lat[0] + (60 * lat[1] + -1 * lat[2]) / 3600
//     : lat[0] + (60 * lat[1] + lat[2]) / 3600;
// var longRef = EXIF.getTag(file, "GPSLongitudeRef");
// var long = EXIF.getTag(file, "GPSLongitude");
// longitude =
//   longRef === "W"
//     ? -1 * long[0] + (60 * long[1] + -1 * long[2]) / 3600
//     : long[0] + (60 * long[1] + long[2]) / 3600;
// date = EXIF.getTag(file, "DateTime");

import EXIF from "exif-js";

export const getExifData = async (fileObject) => {
  const [file] = Object.values(fileObject);
  let exifdata = await new Promise((resolve) => {
    EXIF.getData(file, () => {
      var width = EXIF.getTag(file, "ImageWidth");
      var height = EXIF.getTag(file, "ImageHeight");
      var lat = EXIF.getTag(file, "GPSLatitude");
      var latRef = EXIF.getTag(file, "GPSLatitudeRef");
      var long = EXIF.getTag(file, "GPSLongitude");
      var longRef = EXIF.getTag(file, "GPSLongitudeRef");
      var latitude =
        latRef === "S"
          ? -1 * lat[0] + (60 * lat[1] + -1 * lat[2]) / 3600
          : lat[0] + (60 * lat[1] + lat[2]) / 3600;
      var longitude =
        longRef === "W"
          ? -1 * long[0] + (60 * long[1] + -1 * long[2]) / 3600
          : long[0] + (60 * long[1] + long[2]) / 3600;
      var dateTime = EXIF.getTag(file, "DateTimeOriginal").split(" ");
      var date = dateTime[0].replace(/\:/g, "-") + " " + dateTime[1];
      resolve({
        width,
        height,
        latitude,
        longitude,
        date,
      });
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
        EXIF.getData(file, () => {
          resolve(EXIF.getAllTags(file));
        });
      });
      return {
        ...file,
        exifdata,
      };
    })
  );
  return filesInfo;
};
