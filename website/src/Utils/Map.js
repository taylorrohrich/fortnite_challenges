import L from "leaflet";
import { youtube, challenge, fnmap4, fnmap5, placeholder } from "./../Images";

export const decideMap = seasonNumber => {
  let map = null;
  switch (Number(seasonNumber)) {
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

export const populateMap = (locations, length, group) => {
  if (locations && locations.length) {
    locations.forEach(location => {
      const coordinate = location.Coordinates
          ? JSON.parse(location.Coordinates)
          : null,
        locationDescription = location.LocationDescription,
        challengeName = location.ChallengeName,
        imageURL = location.ImageURL,
        iconURL = location.IconURL,
        options = location.Options ? JSON.parse(location.Options) : null,
        referral = location.Referral,
        credit = location.Credit,
        icon = getIcon(options, iconURL),
        marker = getMarker(
          coordinate,
          length,
          icon,
          locationDescription,
          challengeName,
          imageURL,
          referral,
          credit
        );
      group.addLayer(marker);
    });
  }
};

const getMarker = (
  coordinate,
  length,
  icon,
  locationDescription,
  challengeName,
  imageURL,
  referral,
  credit
) => {
  const popupWidth = window.innerWidth >= 576 ? 400 : 250;
  const popup = L.popup({ keepInView: true, maxWidth: popupWidth }).setContent(
    imageURL
      ? "<div style='width:100%;text-align:center'>" +
        "<img" +
        " style='width:" +
        popupWidth +
        "px;height:auto'" +
        " src=" +
        imageURL +
        " />" +
        "<b>" +
        challengeName +
        "</b>" +
        "<br/>" +
        (locationDescription ? "<i>" + locationDescription + "</i>" : "") +
        (credit
          ? referral
            ? "<a href=" +
              referral +
              " target='_blank' ><img src=" +
              youtube +
              " style='height:auto;width:15px;margin-left:5px;margin-right:5px'" +
              " />" +
              credit +
              "</a>"
            : credit
          : "") +
        "</div>"
      : challengeName
  );
  return L.marker([coordinate.x * length, coordinate.y * length], {
    icon: getIcon(icon)
  }).bindPopup(popup);
};

export const getIcon = (options, iconURL) => {
  const multiplier = window.innerWidth >= 576 ? 1 : 0.6;
  if (iconURL && options) {
    const { width, height } = options;
    return L.icon({
      iconUrl: iconURL,
      iconSize: [multiplier * width, multiplier * height]
    });
  }
  return L.icon({
    iconUrl: challenge,
    iconSize: [multiplier * 35, multiplier * 35]
  });
};
