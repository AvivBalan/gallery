import React from "react";
import { History } from 'history';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Dropzone from 'react-dropzone';
import ImagesService from '../../services/images';

import './upload.css';

type Props = {
    history: History
};

type State = {
  file?: File,
  submiting: boolean,
  uploadError?: string
};

export default class ImageUpload extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);

        this.state = {
            submiting: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        const file = this.state.file;

        if (!file) return;

        this.setState({ submiting: true });

        ImagesService.upload(file).then(image => {
            this.props.history.push(`/${image.id}`);
        }).catch(() => {
            this.setState({
                submiting: false,
                uploadError: 'Something went wrong :('
            });
        });
    }

    render() {
        return (
            <div className="upload-container">
                <h2>Upload images to the gallery</h2>
                <Paper className="dropzone-container">
                    <Dropzone onDrop={(files: Array<File>) => {
                        this.setState({file: files[0]});
                    }}>
                        {({getRootProps, getInputProps}) => (
                            <section className="dropzone-section">
                            <div className='dropzone' {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p>Drag and drop an image file here, or click to select a file</p>
                            </div>
                            </section>
                        )}
                    </Dropzone>    
                </Paper>
                {this.state.file?
                    <div className='file-submit'>
                        <h3>Chosen file: {this.state.file.name}</h3>
                        <Button variant="contained" size="large" onClick={() => this.handleSubmit()}>{this.state.submiting? 'uploading...' : 'upload'}</Button>
                    </div>
                :null}
                <h3>{this.state.uploadError}</h3>
            </div>
        );
    }
}