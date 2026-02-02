import axios from "./axiosInstane";
import { YOUTUBE_ENDPOINT } from "../config";
import type { YoutubeVideo } from "../modules/types";

export const youtubeSearch = async (query: string): Promise<YoutubeVideo[]> => {
  const response = await axios.get(`${YOUTUBE_ENDPOINT}/${query}`);
  return response.data;
}