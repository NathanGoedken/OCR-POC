import React, { Component } from 'react';
import styled from 'styled-components'
import Link from 'next/link';
import * as Tesseract from 'tesseract.js';

import Footer from './footer';

const OcrInputContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  text-align: center;
  padding: 24px;
`;

const BodyContainer = styled.div`
  text-align: center;
`;

const ResultContainer = styled.div`
  test-align: center;
`;

const FileUploaderContainer  = styled.div`
    overflow: hidden;
    display: block;
    position: relative;
    color: #777777;
    padding: 8px;
    margin-bottom: 8px;
    border: 3px dashed #777777;
    border-radius: 8px;
`;

const GenerateButton = styled.div`
  width: 100%;
  background: #61dafb;
  border-radius: 4px;
  padding: 8px;
  border: none;
  cursor: pointer;
  font-size: 12px;
  color: white;
  font-weight: bold;
  
  :hover {
    background: #54bedb
  }
  
  :active {
    background: #54bedb
  }
}
`;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploads: [],
            patterns: [],
            documents: []
        };
    }

    handleChange = (event) => {
        if (event.target.files[0]) {
            let uploads = [];
            for (let key in event.target.files) {
                if (!event.target.files.hasOwnProperty(key)) continue;
                let upload = event.target.files[key];
                uploads.push(URL.createObjectURL(upload))
            }
            this.setState({
                uploads: uploads
            })
        } else {
            this.setState({
                uploads: []
            })
        }
    };

    generateText = () => {
        let uploads = this.state.uploads;
        console.log('uploads', uploads);

        for(let i = 0; i < uploads.length; i++) {
            Tesseract.recognize(
                uploads[i],
                'eng',
                { logger: m => console.log('m', m)})
                .catch(err => {
                    console.log('catch here');
                    console.error(err)
                })
                // .then(({ data: {text}}) => console.log('text', text));
                .then(result => {
                    console.log('test', result.data.text);
                    // Get Confidence score
                    const confidence = result.data.confidence;

                    // Get full output
                    const text = result.data.text;

                    // Get codes
                    const pattern = /\b\w{10}\b/g;
                    const patterns = text.match(pattern);

                    // Update state
                    this.setState({
                        patterns: this.state.patterns.concat(patterns),
                        documents: this.state.documents.concat({
                            pattern: patterns,
                            text: text,
                            confidence: confidence
                        })
                    });
                })
        }
    };

    render() {
        return (
            <OcrInputContainer>
                <TitleContainer>
                    <h1>My OCR App</h1>
                </TitleContainer>

                <BodyContainer>
                    <FileUploaderContainer>
                        Click here to upload documents
                        <input type="file" id="fileUploader" onChange={this.handleChange} multiple />
                    </FileUploaderContainer>

                    <div>
                        { this.state.uploads.map((value, index) => {
                            return <img key={index} src={value} width="100px" />
                        }) }
                    </div>

                    <GenerateButton>
                        <button onClick={this.generateText}>Generate</button>
                    </GenerateButton>
                </BodyContainer>

                <ResultContainer>
                    { this.state.documents.map((value, index) => {
                        return (
                            <div key={index}>
                                <div>
                                    <img src={this.state.uploads[index]} width="250px" />
                                </div>
                                <div>
                                    <div>
                                        <small><strong>Confidence Score:</strong> {value.confidence}</small>
                                    </div>
                                    {value.pattern &&
                                        <div>
                                            <small><strong>Pattern Output:</strong> {value.pattern.map((pattern) => { return pattern + ', ' })}</small>
                                        </div>
                                    }
                                    <div>
                                        <small><strong>Full Output:</strong> {value.text}</small>
                                    </div>
                                </div>
                            </div>
                        )
                    }) }
                </ResultContainer>
                <Footer>
                    <Link href="/">
                        <a>Back to home</a>
                    </Link>
                </Footer>
            </OcrInputContainer>
        )
    }

}

export default App;
