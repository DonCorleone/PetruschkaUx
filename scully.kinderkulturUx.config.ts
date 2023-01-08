import {ScullyConfig} from "@scullyio/scully";

export const config: ScullyConfig = {
  projectRoot: "./src",
  defaultPostRenderers: [],
	distFolder: './dist/kinderkulturUx', // output directory of your Angular build artifacts
  projectName: "kinderkulturUx",
  outDir: './dist/static',
  routes: {
		'/user/:userId': {
			type: 'json',
			userId: {
				url: 'http://localhost:8200/users',
				property: 'id',
			},
		},
	}
};
