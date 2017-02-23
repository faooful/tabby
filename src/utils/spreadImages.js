import shuffle from 'shuffle-array'

export default function spreadImages(images, canvas) {
  images.sort((a, b) => b.height - a.height)
  const rows = []
  const rowLengths = []
  let y = 0
  let i = 0
  while (i < images.length && y + images[i].height < canvas.height) {
    images[i].x = 0
    images[i].y = y
    y += images[i].height
    rows.push([images[i]])
    rowLengths.push(images[i].width)
    i++
  }
  while (i < images.length) {
    const minRowLength = Reflect.apply(Math.min, null, rowLengths)
    const minRowLengthIndex = rowLengths.indexOf(minRowLength)
    rows[minRowLengthIndex].push(images[i])
    images[i].x = rowLengths[minRowLengthIndex]
    images[i].y = rows[minRowLengthIndex][0].y
    rowLengths[minRowLengthIndex] += images[i].width
    i++
  }

  for (let j = 0; j < rows.length; j++) {
    const rowHeight = rows[j][0].height
    for (let k = 0; k < rows[j].length; k++) {
      const randomOffset = Math.floor(Math.random() * (rowHeight - rows[j][k].height))
      rows[j][k].y += randomOffset
    }
    shuffleImages(rows[j])
  }

  let maxRowLength = Reflect.apply(Math.max, null, rowLengths)
  if (maxRowLength > canvas.width) {
    const reductionFactor = canvas.width / (maxRowLength + rows[0].length * 10)
    for (let j = 0; j < images.length; j++) {
      images[j].width *= reductionFactor
      images[j].height *= reductionFactor
    }
  }

  maxRowLength = Reflect.apply(Math.max, null, rowLengths)
  let expansionFactor = canvas.width / maxRowLength
  for (let j = 0; j < images.length; j++) {
    images[j].x *= expansionFactor
  }

  const gridHeight = rows[rows.length - 1][0].y + rows[rows.length - 1][0].height
  expansionFactor = canvas.height / gridHeight
  for (let j = 0; j < images.length; j++) {
    images[j].y *= expansionFactor
  }

  return images
}

function shuffleImages(images) {
  const indexes = images.map((_, i) => i)
  shuffle(indexes)
  let x = images[0].x
  for (let i = 0; i < indexes.length; i++) {
    const randomIndex = indexes[i]
    const image = images[randomIndex]
    image.x = x
    x += image.width
  }
}
