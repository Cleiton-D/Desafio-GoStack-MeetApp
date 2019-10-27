import multer from 'multer';
import { resolve, extname } from 'path';
import crypto from 'crypto';

export default {
	storage: multer.diskStorage({
		destination: resolve(__dirname, '..', '..', 'temp', 'uploads'),
		filename: (req, file, callback) => {
			crypto.randomBytes(16, (err, buff) => {
				return callback(null, buff.toString('hex') + extname(file.originalname));
			});
		},
	}),
};
