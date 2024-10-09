import { decodeBase64 } from "@oslojs/encoding";
import { ObjectParser } from "@pilcrowjs/object-parser";

export async function createChallenge(): Promise<Uint8Array> {
	const response = await fetch("/api/webauthn/challenge", {
		method: "POST"
	});
	if (!response.ok) {
		throw new Error("Failed to create challenge");
	}
	const result = await response.json();
	const parser = new ObjectParser(result);
	return decodeBase64(parser.getString("challenge"));
}
