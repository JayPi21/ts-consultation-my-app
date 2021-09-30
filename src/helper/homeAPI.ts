import { client } from "./client";
const homeAPI = {
  search,
  majorDasha,
};
function search(payload: any) {
  return client.ApiCall("POST", `/v1/kp_horoscope`, payload);
}
function majorDasha(payload: any) {
  return client.ApiCall("POST", `/v1/major_vdasha`, payload);
}
export default homeAPI;
