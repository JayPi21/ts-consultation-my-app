import { client } from "./client";
const homeAPI = {
  search,
};
function search(payload: any) {
  return client.ApiCall("POST", `/v1/kp_horoscope`, payload);
}
export default homeAPI;
