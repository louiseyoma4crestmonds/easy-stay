import { useEffect, useState } from "react";
import { getSessionDetails } from "src/pages/api/user";

export default function useSessionDetails() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    getSessionDetails()
      .then((res: any) => setSession(res?.user?.user?.token?.token))
      .catch(console.error);
  }, []);

  return {
    firstName: session?.firstName ?? "",
    lastName: session?.lastName ?? "",
    token: session?.userData?.data?.[0]?.token ?? "",
    email: session?.email ?? "",
  };
}
