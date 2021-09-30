import { Error } from "./Error";
export const client = {
  post,
  ApiCall,
};

let username = "615494";
let password = "eab7d2c05cd95ed31e6d8e646dd0fbe6";
let base64string = btoa(`${username}:${password}`);

function post(payload: any) {
  let request = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Basic ${base64string}`,
      "Content-Type": "application/json",
    },

    body: JSON.stringify(payload),
  };

  return request;
}

function ApiCall(method: any, endpoint: any, payload = {}) {
  let request = {};
  let url = `https://json.astrologyapi.com`;
  switch (method) {
    case "POST":
      request = post(payload);
      break;
    default:
      console.log("Requested Method Not Valid");
  }
  return fetch(`${url}${endpoint}`, request);
}

function response(res: any) {
  let json = res.json();
  if (!(res.status === 200 || res.status === 201)) {
    return json.then((re: any) => {
      Error.show(re);
      return Promise.reject(re);
    });
  }
  return json;
}
