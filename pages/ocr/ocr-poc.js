import Link from 'next/link'
import Footer from './footer';
import { createWorker } from 'tesseract.js';

const worker = createWorker({
    logger: m => console.log(m)
});

(async () => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
    console.log(text);
    await worker.terminate();
})();

export default function FirstPost() {
    return (
        <>
            <h1>{'OCR POC'}</h1>
            <h2>{'Input Image file'}</h2>
            <input type="file" accept="image/*" />
            <worker />
            <Footer>
                <Link href="/">
                    <a>Back to home</a>
                </Link>
            </Footer>
        </>
    )
}
