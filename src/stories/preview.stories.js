import { renderPreview } from '../preview'

export default {
	title: 'Previews',
	argTypes: {
		children: { control: 'text' }
	}
}

export const Preview = () => {
	return renderPreview( 'en', { title: 'adf' }, true )
}
