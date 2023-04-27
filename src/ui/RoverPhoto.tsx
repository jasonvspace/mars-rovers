import { PhotoModel } from "../data/PhotoModel";

export default function RoverPhoto(props: { photo: PhotoModel }) {
  const { photo } = props;
  return (
    <img
      id={photo.id.toString()}
      src={photo.img_src}
      alt=""
      width="100%"
      loading="lazy"
    />
  );
}
