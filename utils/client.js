import config from './config';
import sanityClient from '@sanity/client';

const client = sanityClient({
	projectId: config.projectId,
	apiVersion: '2022-09-27',
	dataset: config.dataset,
	useCdn: true,
});

console.log('client: ', client);

export default client;
