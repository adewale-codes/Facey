import { redirect } from "next/navigation";

const DEFAULT_CONCERN_ID = "Facial";

export default function ConcernsIndexRedirect() {
  redirect(`/face/${DEFAULT_CONCERN_ID}`);
}
