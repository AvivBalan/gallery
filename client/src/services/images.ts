import {request, requestDownload} from './client';
import Image from '../types/image.type';

const model = 'Images';

class ImageService {
    getAll(filter = {}): Promise<Array<Image>> {
        return request('get', model, null, {filter});
    }

    get(id: string): Promise<Image> {
        return request('get',`/${model}/${id}`);
    }

    delete(id: string): Promise<any> {
        return request('delete',`/${model}/${id}`);
    }

    download(id: string): Promise<string> {
        return requestDownload(`/${model}/${id}/download`);
    }

    upload(imageFile: File): Promise<Image> {
        const formData = new FormData();
        formData.append('file', imageFile);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        return request('post', `/${model}/upload`, formData, config);
    }
}

export default new ImageService();