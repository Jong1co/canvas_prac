class Pointillism {
  ctx;

  constructor() {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    this.ctx = ctx;

    // 내가 원하는 최종 캔버스 크기(800×400)
    const canvasWidth = 800;
    const canvasHeight = 400;

    canvas.style.width = canvasWidth + "px";
    canvas.style.height = canvasHeight + "px";
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const background = new Image();
    background.src = "./bg.png";

    // 이미지 로드 후 처리
    background.onload = () => {
      // cover 함수를 이용해 800×400 크기에 맞춰 그림
      drawCoverImage(ctx, background, canvasWidth, canvasHeight);

      const pixelWidth = 8;

      for (let i = 0; i < canvasWidth / pixelWidth; i++) {
        for (let j = 0; j < canvasHeight / pixelWidth; j++) {
          console.log(i, j);
          const startX = i * pixelWidth;
          const startY = j * pixelWidth;
          const endX = startX + pixelWidth;
          const endY = startY + pixelWidth;

          const centerX = startX + pixelWidth / 2;
          const centerY = startY + pixelWidth / 2;

          const color = this.findPixelInfo(ctx, centerX, centerY);

          ctx.fillStyle = "black";
          ctx.fillRect(startX, startY, pixelWidth, pixelWidth);

          ctx.beginPath();
          ctx.arc(centerX, centerY, pixelWidth / 2, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
        }
      }
    };
  }

  findPixelInfo(ctx, x, y) {
    // (x, y) 좌표의 1픽셀 정보를 가져온다.
    const imageData = ctx.getImageData(x, y, 1, 1);
    const pixel = imageData.data;

    // pixel 배열에는 RGBA가 순서대로 들어있다.
    // pixel[0] -> Red
    // pixel[1] -> Green
    // pixel[2] -> Blue
    // pixel[3] -> Alpha (0 ~ 255)

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

new Pointillism();
