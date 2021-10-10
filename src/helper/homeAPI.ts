import { client } from "./client";
const homeAPI = {
  search,
  majorDasha,
  subDasha,
  subDasha2,
  subDasha3,
  subDasha4,
};
function search(payload: any) {
  return client.ApiCall("POST", `/v1/kp_horoscope`, payload);
}
function majorDasha(payload: any) {
  return client.ApiCall("POST", `/v1/major_vdasha`, payload);
}

function subDasha(payload: any, query: any) {
  return client.ApiCall("POST", `/v1/sub_vdasha/${query}`, payload);
}

function subDasha2(payload: any, query: any) {
  return client.ApiCall("POST", `/v1/sub_sub_vdasha/${query}`, payload);
}

function subDasha3(payload: any, query: any) {
  return client.ApiCall("POST", `/v1/sub_sub_sub_vdasha/${query}`, payload);
}

function subDasha4(payload: any, query: any) {
  return client.ApiCall("POST", `/v1/sub_sub_sub_sub_vdasha/${query}`, payload);
}

export default homeAPI;
