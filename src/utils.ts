//  /1Rr5SrvHxMXHu5RjKpaMba8VTzi.jpg
function makeImagePath(bgimage: string, format?: string) {
  return `https://image.tmdb.org/t/p/${
    format ? format : "original"
  }/${bgimage}`;
}

export default makeImagePath;
