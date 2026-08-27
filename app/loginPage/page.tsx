// app/loginPage/page.tsx
import React, { Suspense } from "react";
import LoginPageComponent from "./LoginPageComponent";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
      <LoginPageComponent />
    </Suspense>
  );
}
