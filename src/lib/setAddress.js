export const separateAddress = (address) => {
  const addressArray = address.split(" ");
  const addressAry = addressArray.slice(1, addressArray.length);

  const region = {};
  // const region = new Map();
  region.address = address;

  const district = addressArray[0];
  // region.set("district", district);
  region.district = district;

  const regSi = new RegExp("시$", "g");
  const [si] = addressAry.filter((adres) => regSi.test(adres));
  // region.set("si", si == undefined ? "" : si);
  region.si = si == undefined ? "" : si;

  const regGun = new RegExp("군$", "g");
  const [gun] = addressAry.filter((adres) => regGun.test(adres));
  // region.set("gun", gun == undefined ? "" : gun);
  region.gun = gun == undefined ? "" : gun;

  const regGu = new RegExp("구$", "g");
  const [gu] = addressAry.filter((adres) => regGu.test(adres));
  // region.set("gu", gu == undefined ? "" : gu);
  region.gu = gu == undefined ? "" : gu;

  const regEup = new RegExp("읍$", "g");
  const [eup] = addressAry.filter((adres) => regEup.test(adres));
  // region.set("eup", eup == undefined ? "" : eup);
  region.eup = eup == undefined ? "" : eup;

  const regMyeon = new RegExp("면$", "g");
  const [myeon] = addressAry.filter((adres) => regMyeon.test(adres));
  // region.set("myeon", myeon == undefined ? "" : myeon);
  region.myeon = myeon == undefined ? "" : myeon;

  const regDong = new RegExp("동$", "g");
  const [dong] = addressAry.filter((adres) => regDong.test(adres));
  // region.set("dong", dong == undefined ? "" : dong);
  region.dong = dong == undefined ? "" : dong;

  const regLi = new RegExp("리$", "g");
  const [li] = addressAry.filter((adres) => regLi.test(adres));
  // region.set("li", li == undefined ? "" : li);
  region.li = li == undefined ? "" : li;

  return region;
};
