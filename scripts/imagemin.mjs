import imagemin from "imagemin";
import imageminJpegtran from "imagemin-jpegtran";
import imageminOptipng from "imagemin-optipng";
import imageminSvgo from "imagemin-svgo";
import imageminGifsicle from "imagemin-gifsicle";

(async () => {
  const files = await imagemin(["../public/images/*.{jpg,png,svg,gif}"], {
    destination: "../dist/images",
    plugins: [
      imageminJpegtran(),
      imageminOptipng(),
      imageminSvgo(),
      imageminGifsicle()
    ]
  })
})()