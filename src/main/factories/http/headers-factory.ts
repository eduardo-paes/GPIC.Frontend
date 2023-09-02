const ocpKey = import.meta.env.VITE_OCP_APIM_SUBSCRIPTION_KEY;

export const PrivateHeaderFactory = (): Record<string, string> => {
	return {
		Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
		"Ocp-Apim-Subscription-Key": ocpKey,
	};
};

export const PublicHeaderFactory = (): Record<string, string> => {
	return {
		"Ocp-Apim-Subscription-Key": ocpKey,
	};
};
