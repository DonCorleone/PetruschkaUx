function getApiBasePath(): string {
	return (window as any).config.API_BASE_PATH  || 'default-url';
}
export const environment = {
	production: false,
	API_KEY_IMAGE4IO: "4Yy9ZWYNl/HKYOwSIMI9LQ==",
	API_SECRET_IMAGE4IO: "FQw/fSWJTedUN36rXBBxAXsG+DKuM+Sz3xvk9m+IhRU=",
	API_URL_IMAGE4IO: "https://api.image4.io/v0.1",
	APP_ID_REALM: "application-0-cgymr",
	NODE_VERSION: "16"
};
