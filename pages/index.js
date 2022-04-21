import React from 'react';
import Link from 'next/link'

export default function Home() {
    return (
        <div className="container">
            <div>
                <title>{'OCR POC'}</title>
            </div>

            <div>
                <h1>
                    {'Welcome to NGoedkens OCR POC App'}
                </h1>

                <p>
                    <Link href="/ocr/ocr-poc-tesseract"><a>{'Tesseract.js OCR POC'}</a></Link>
                </p>
            </div>

        </div>
    )
}
