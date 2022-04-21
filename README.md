This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This POC leverages https://github.com/naptha/tesseract.js.

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

1. Yarn Dev
2. navigate to http://localhost:3000/ on your browser
3. click page link
4. click "Choose Files" and select as many images as your want in project images directory -> `/ocr-poc/images/`
  note: Images are currently prescription labels/bottles and Insurance Card.
5. Click Generate. Can monitor output in client console. 
6. When finished should display Image, Confidence Score, Pattern and Full Output (Text).
