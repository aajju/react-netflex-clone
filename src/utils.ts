//  /1Rr5SrvHxMXHu5RjKpaMba8VTzi.jpg
export default function makeImagePath(bgimage: string, format?: string) {
  //   console.log(bgimage);
  return `https://image.tmdb.org/t/p/${
    format ? format : "original"
  }/${bgimage}`;
}
