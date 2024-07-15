import { getXmlToJson } from "../utils/getXmlToJson";

const SERVICE_KEY =
  "uX6TevVA4HK9Q6giXVkd6KnBWczRFYe8oIgkp27Sfi22asiiEes9MLYRjeYDEhDD3HBSUrYTSEu71y20hHsgHQ%3D%3D";

function getFormattedDate() {
  const today = new Date();
  const isoString = today.toISOString(); // 2024-07-15T15:05:35:575Z
  // 20240715
  const formattedDate = isoString.split("T")[0].split("-").join("");
  console.log(formattedDate);
  return formattedDate;
}

async function getSunsetRiseData() {
  var xhr = new XMLHttpRequest();
  var url =
    "http://apis.data.go.kr/B090041/openapi/service/RiseSetInfoService/getAreaRiseSetInfo"; /*URL*/
  var queryParams =
    "?" + encodeURIComponent("serviceKey") + "=" + SERVICE_KEY; /*Service Key*/
  queryParams +=
    "&" +
    encodeURIComponent("locdate") +
    "=" +
    encodeURIComponent(getFormattedDate()); /**/
  queryParams +=
    "&" +
    encodeURIComponent("location") +
    "=" +
    encodeURIComponent("대전"); /**/

  const result = await fetch(url + queryParams);
  const textResult = await result.text();
  const xmlString = new DOMParser().parseFromString(textResult, "text/xml");
  const jsonResult = getXmlToJson(xmlString);
  //   console.log(jsonResult);

  //   xhr.open("GET", url + queryParams);
  //   xhr.onreadystatechange = function () {
  //     if (this.readyState == 4) {
  //       console.log(
  //         "Status: " +
  //           this.status +
  //           "nHeaders: " +
  //           JSON.stringify(this.getAllResponseHeaders()) +
  //           "nBody: " +
  //           this.responseText
  //       );
  //     }
  //   };

  //   xhr.send("");
  return jsonResult.response.body.items.item;
}

export { getSunsetRiseData };
