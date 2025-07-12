import { redirect } from 'next/navigation';

const DEFAULT_CONCERN_ID = 'acne';

export default function ConcernsIndexRedirect() {
  redirect(`/concerns/${DEFAULT_CONCERN_ID}`);
}
