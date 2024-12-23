import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

/**
 * Renders a sign in button for Google OAuth
 *
 * When clicked, it redirects the user to the Google OAuth sign in page
 * and then redirects back to the /sso-callback route. If the user is not
 * signed in, Clerk will handle the authentication flow and redirect the
 * user to the /auth-callback route.
 */
const SignInOAuthButtons = () => {
	const { signIn, isLoaded } = useSignIn();

	if (!isLoaded) {
		return null;
	}

	const signInWithGoogle = () => {
		signIn.authenticateWithRedirect({
			strategy: "oauth_google",
			redirectUrl: "/sso-callback",
			redirectUrlComplete: "/auth-callback",
		});
	};

	return (
		<Button onClick={signInWithGoogle} variant={"secondary"} className='w-full text-white border-zinc-200 h-11'>
			<img src='/google.png' alt='Google' className='size-5' />
			Continue with Google
		</Button>
	);
};
export default SignInOAuthButtons;