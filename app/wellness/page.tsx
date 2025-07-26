import { redirect } from "next/navigation";

const DEFAULT_CONCERN_ID = "Iv";

export default function ConcernsIndexRedirect() {
  redirect(`/wellness/${DEFAULT_CONCERN_ID}`);
}
