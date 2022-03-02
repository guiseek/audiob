
export interface AuthenticationSessionsChangeEvent {
	added: ReadonlyArray<AuthenticationSession>;
	removed: ReadonlyArray<AuthenticationSession>;
	changed: ReadonlyArray<AuthenticationSession>;
}

export interface AuthenticationProviderInformation {
	id: string;
	label: string;
}

export interface AuthenticationSession {
	id: string;
	accessToken: string;
	account: AuthenticationProviderInformation;
	scopes: ReadonlyArray<string>;
	idToken?: string;
}
