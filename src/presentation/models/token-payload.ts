export interface TokenPayload {
	aud: string;
	exp: number;
	"http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
	"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
	"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid": string;
	"http://schemas.xmlsoap.org/ws/2009/09/identity/claims/actor": string;
	iss: string;
	jti: string;
}
