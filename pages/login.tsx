import * as React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Login() {
  const session  = useSession();

  console.log("data => ", session);

  return (
    <div className="container mx-auto">
      <Card>
          <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Please Login First</CardDescription>
          </CardHeader>
          <CardContent>
              <div className="flex justify-center grid grid-1 gap-4">
                <Button onClick={() => signIn('google')}>Signin Google</Button>
              </div>
          </CardContent>
      </Card>
    </div>
  )
}
