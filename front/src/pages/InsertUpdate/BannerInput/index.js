import React, { useRef, useEffect, useState } from 'react';
import { MdCameraAlt } from 'react-icons/md';

import { useField } from '@rocketseat/unform';

import { Container } from './styles';

import api from '~/services/api';

export default function BannerInput() {
	const { defaultValue, registerField, error } = useField('banner');

	const [file, setFile] = useState(defaultValue && defaultValue.id);
	const [preview, setPreview] = useState(defaultValue && defaultValue.url);

	const ref = useRef();

	useEffect(() => {
		if (ref.current) {
			registerField({
				name: 'banner_id',
				ref: ref.current,
				path: 'dataset.file',
			});
		}
	}, [ref]); //eslint-disable-line

	async function handleChange(e) {
		const reader = new FileReader();
		reader.onload = read => {
			setPreview(read.target.result);
		};

		reader.readAsDataURL(e.target.files[0]);

		const data = new FormData();
		data.append('file', e.target.files[0]);

		const response = await api.post('files', data);
		setFile(response.data.id);
	}

	return (
		<>
			<Container>
				<label htmlFor="banner">
					{preview ? (
						<img src={preview} alt="" />
					) : (
						<div>
							<MdCameraAlt size={54} />
							Selecionar Imagem
						</div>
					)}
					<input
						type="file"
						id="banner"
						accept="image/*"
						data-file={file}
						onChange={handleChange}
						ref={ref}
					/>
				</label>
				{error && <span>{error}</span>}
			</Container>
		</>
	);
}
