function getEnvVariables() {
	import.meta.env;

	return {
		...import.meta.env,
	};
}

export default getEnvVariables;
