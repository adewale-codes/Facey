import { redirect } from "next/navigation";

const DEFAULT_CONCERN_ID = "Facial";

export default function ConcernsIndexRedirect() {
  redirect(`/body/${DEFAULT_CONCERN_ID}`);
}
