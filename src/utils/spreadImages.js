export default function spreadImages(images) {
  for (let i = 0; i < images.length; i++) {
    images[i].x = Math.round(Math.random() * 1000)
    images[i].y = Math.round(Math.random() * 1000)
  }
  return images
}
