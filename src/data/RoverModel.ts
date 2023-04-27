import { CameraModel } from "./CameraModel";

export type RoverModel = {
  id: number;
  name: string;
  landing_date: string;
  launch_date: string;
  max_date: string;
  status: string;
  total_photos: number;
  cameras: CameraModel[];
};
