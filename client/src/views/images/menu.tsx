import { Component } from "react";
import ImageService from "../../services/images";
import Image from "../../types/image.type";
import { Link, Redirect } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

interface MatchParams {
    path: string
}

type Props = {
    match: MatchParams
};

type State = {
  images?: Array<Image>
};

export default class ImageMenu extends Component<Props, State>{
    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        ImageService.getAll().then(images => this.setState({images}));
    }

    render() {
        if (!this.state.images) {
            return <CircularProgress/>;
        }
        if (this.state.images && this.state.images.length === 0) {
            return <Redirect to='upload'/>;
        }
        return (
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="strech"
                spacing={4}
            >
                {this.state.images.map(image => (
                    <Card className="image-item" key={image.id}>
                        <h3>File name: {image.fileName}</h3>
                        <h4>Uploaded at: {image.createdAt? new Date(image.createdAt).toDateString() : ''}</h4>
                        <Link to={`${this.props.match.path}image/${image.id}`}>
                            <Button variant="contained">View</Button>
                        </Link>
                    </Card>
                ))}
            </Stack>
        );
    }
}