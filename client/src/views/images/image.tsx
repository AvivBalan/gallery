import React from "react";
import { History } from 'history';
import ImageService from "../../services/images";
import Image from "../../types/image.type";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

import './image.css';

type Props = {
    history: History
    match: {
        params: {
            id: string
        }
    }
};

type State = {
  image?: Image,
  imgUrl?: string,
  deleting: boolean
};

export default class ImageUpload extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);

        this.state = {
            deleting: false
        };

        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        const imageId = this.props.match.params.id;
        ImageService.get(imageId).then(image => this.setState({ image }));
        ImageService.download(imageId).then(imgUrl => this.setState({ imgUrl }));
    }

    handleDelete = () => {
        if (this.state.image && this.state.image.id) {
            this.setState({ deleting: true });
            ImageService.delete(this.state.image.id).then(() => {
                this.props.history.replace('/');
            });
        }
    }

    render() {
        return <Stack alignItems='center'>
            {this.state.image?
                <div>
                    <h3>File name: {this.state.image.fileName}</h3>
                    <h4>Uploaded at: {this.state.image.createdAt? new Date(this.state.image.createdAt).toDateString() : ''}</h4>
                    <Button variant="contained" color="error" onClick={() => this.handleDelete()}>Delete</Button>
                </div>
            : null}
            {!this.state.imgUrl?
                <CircularProgress/>
            :
                <img className='actual-image' src={this.state.imgUrl}/>
            }
            <Button variant="contained" onClick={() => this.props.history.replace('/')}>Back to menu</Button>
        </Stack>;
    }
}