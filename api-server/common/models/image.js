'use strict';

const storage = require('../modules/storage');
const path = require('path');
const { IncomingForm } = require('formidable');

module.exports = function(Image) {
    Image.observe('before delete', (ctx, next) => {
            Image.find({where: ctx.where}).then(images => {
                images.forEach(img => {
                storage.deleteFile(`${img.id}.${img.fileName}`);
            });
            next();
          });
    });
    
    Image.upload = async function (req) {
        try {
            const newImage = await Image.create();
            let imageName = '';

            const form = new IncomingForm();
            
            const uploadPromise = new Promise((res, rej) => {
                form.on('end', () => {
                    newImage.fileName = imageName;
                    newImage.save((err, img) => {
                        if (err) {
                            rej(err);
                        }
                        res(img);
                    });
                });

                form.on('error', (error)=>{
                    rej(error)
                });
            });

            form.onPart = function(part) {
                if (!part.filename) {
                        // let formidable handle all non-file parts
                        form.handlePart(part);
                } else {
                    imageName = part.filename;

                    const ws = storage.createWriteStream(`${newImage.id}.${imageName}`);
                    part.pipe(ws);
                }
            };

            form.parse(req);
            return uploadPromise;
        } catch (err) {
            throw err;
        }
    };

    Image.remoteMethod(
        'upload', {
            description: 'upload a new image',
            http: {
                path: '/upload', verb: 'post',
            },
            accepts: [
                {arg: 'req', type: 'object', 'http': {source: 'req'}},
            ],
            returns: {
                root: true,
            },
        }
    );

    Image.download = function(id, res, cb) {
        Image.findById(id).then(image => {
            if (!image) {
                cb(`Unknown "Image" id "${id}"`);
            }
            const readStream = storage.createReadStream(`${image.id}.${image.fileName}`)
            .on('error',cb);
            
            readStream.pipe(res);
        }).catch(cb);
    }

    Image.remoteMethod(
        'download', {
            description: 'download the image file',
            http: {
                path: '/:id/download',
                verb: 'get'
            },
          accepts: [
            {arg: 'id', type: 'string', required: true, http: {source: 'path'}},
            {arg: 'res', type: 'object', 'http': {source: 'res'}},
          ],
        }
      );
};