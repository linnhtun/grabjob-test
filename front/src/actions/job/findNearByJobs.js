import axios from "axios";
import { baseUri } from "../api";

const findNearByJobs = async (lat, lng, title, page, radius = 0) => {
  const { data } = await axios.get(`${baseUri}/jobs/nearby`, {
    params: { lat, lng, title, page, radius },
  });

  return data;
};

export default findNearByJobs;
