import React from 'react';
import { SignUp } from '@clerk/nextjs';

function SignUpPage() {
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
            <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />  
        </main>
    );
}

export default SignUpPage;