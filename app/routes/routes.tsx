import {redirect} from 'react-router';

// Routes is a homepage section (#routes), not a standalone page. This file only
// exists to redirect anyone landing on the old /routes URL to that anchor.
export async function loader() {
  return redirect('/#routes');
}
