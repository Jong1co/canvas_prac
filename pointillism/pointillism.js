class Pointillism {
  ctx;
  canvasWidth;
  canvasHeight;

  constructor(url = "./bg2.jpeg") {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    this.ctx = ctx;

    // 내가 원하는 최종 캔버스 크기(800×400)
    this.canvasWidth = 800;
    this.canvasHeight = 400;

    canvas.style.width = this.canvasWidth + "px";
    canvas.style.height = this.canvasHeight + "px";
    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;

    this.createPointillismByUrl(ctx, url);
  }

  createPointillismByUrl(ctx, url) {
    const background = new Image();
    background.src = url;

    // 이미지 로드 후 처리
    background.onload = () => {
      // cover 함수를 이용해 800×400 크기에 맞춰 그림
      drawCoverImage(ctx, background, this.canvasWidth, this.canvasHeight);

      let i = 0;

      this.draw(i);
      // const interval = setInterval(() => {
      //   i++;

      //   if (i > 300) {
      //     clearInterval(interval);
      //   }
      // }, 16);
    };
  }

  draw(column) {
    const pixelWidth = 10;

    for (let i = 0; i < this.canvasWidth / pixelWidth; i++) {
      for (let j = 0; j < this.canvasHeight / pixelWidth; j++) {
        const startX = i * pixelWidth;
        const startY = j * pixelWidth;

        const centerX = startX + pixelWidth / 2;
        const centerY = startY + pixelWidth / 2;

        const color = this.findPixelInfo(this.ctx, centerX, centerY);

        this.ctx.fillStyle = "black";
        this.ctx.fillRect(startX, startY, pixelWidth, pixelWidth);

        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, pixelWidth / 2 - 0.5, 0, Math.PI * 2);
        this.ctx.fillStyle = color;
        this.ctx.fill();
      }
    }
  }

  findPixelInfo(ctx, x, y) {
    // (x, y) 좌표의 1픽셀 정보를 가져온다.
    const imageData = ctx.getImageData(x, y, 1, 1);

    // pixel 배열에는 RGBA가 순서대로 들어있다.
    // pixel[0] -> Red
    // pixel[1] -> Green
    // pixel[2] -> Blue
    // pixel[3] -> Alpha (0 ~ 255)
    const pixel = imageData.data;

    return `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${pixel[3] / 255})`;
  }
}

function drawCoverImage(ctx, image, canvasWidth, canvasHeight) {
  // 1) 캔버스와 이미지의 가로세로 비율(Aspect Ratio) 계산
  const imageRatio = image.width / image.height;
  const canvasRatio = canvasWidth / canvasHeight;

  let sx, sy, sWidth, sHeight;

  if (imageRatio > canvasRatio) {
    sHeight = image.height;
    sWidth = sHeight * canvasRatio;
    sx = (image.width - sWidth) / 2;
    sy = 0;
  } else {
    sWidth = image.width;
    sHeight = sWidth / canvasRatio;
    sx = 0;
    sy = (image.height - sHeight) / 2;
  }

  ctx.drawImage(
    image,
    sx,
    sy,
    sWidth,
    sHeight,
    0,
    0,
    canvasWidth,
    canvasHeight
  );
}

window.onload = function () {
  new Pointillism();

  // window.requestAnimationFrame();
};
