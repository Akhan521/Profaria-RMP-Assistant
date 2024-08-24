import React from 'react';
import { SignIn } from '@clerk/nextjs';

function SignInPage() {
    return (
        <main
            style={{
                backgroundColor: "#121212",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />  
        </main>
    );
}

export default SignInPage;
