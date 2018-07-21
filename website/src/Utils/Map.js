import L from "leaflet";
import { youtube, challenge, fnmap4, fnmap5, placeholder } from "./../Images";

export const decideMap = seasonNumber => {
  let map = null;
  switch (seasonNumber) {
    case 4:
      map = fnmap4;
      break;
    case 5:
      map = fnmap5;
      break;
    default:
      map = placeholder;
  }
  return map;
};

export const populateMap = (data, length, group, icons) => {
  if (data && icons) {
    const iconDictionary = icons.reduce((acc, item) => {
      return {
        ...acc,
        [item.name]: {
          width: item.width,
          height: item.height,
          imageUrl: item.imageUrl
        }
      };
    }, {});
    data.forEach(chal => {
      if (chal.coord.length) {
        const coordinates = chal.coord;
        coordinates.forEach(coordinate => {
          const marker = getMarker(
            coordinate,
            length,
            iconDictionary[chal.icon],
            chal.description
          );
          group.addLayer(marker);
        });
      }
    });
  }
};

const getMarker = (coordinate, length, icon, description) => {
  const popupWidth = window.innerWidth >= 576 ? 400 : 250;
  const popup = L.popup({ keepInView: true, maxWidth: popupWidth }).setContent(
    coordinate.url
      ? "<div style='width:100%;text-align:center'>" +
        "<img" +
        " style='width:" +
        popupWidth +
        "px;height:auto'" +
        " src=" +
        coordinate.url +
        " />" +
        "<b>" +
        description +
        "</b>" +
        "<br/>" +
        (coordinate.locationDescription
          ? "<i>" + coordinate.locationDescription + "</i>"
          : "") +
        (coordinate.credit
          ? coordinate.refLink
            ? "<a href=" +
              coordinate.refLink +
              " target='_blank' ><img src=" +
              youtube +
              " style='height:auto;width:15px;margin-left:5px;margin-right:5px'" +
              " />" +
              coordinate.credit +
              "</a>"
            : coordinate.credit
          : "") +
        "</div>"
      : description
  );
  return L.marker([coordinate.x * length, coordinate.y * length], {
    icon: getIcon(icon)
  }).bindPopup(popup);
};

export const getIcon = icon => {
  const multiplier = window.innerWidth >= 576 ? 1 : 0.6;
  if (icon) {
    return L.icon({
      iconUrl: icon.imageUrl,
      iconSize: [multiplier * icon.width, multiplier * icon.height]
    });
  }
  return L.icon({
    iconUrl: challenge,
    iconSize: [multiplier * 35, multiplier * 35]
  });
};
