function redirectIfNotAuthed(context) {
  if (context.url.pathname !== '/auth/login' && !context.cookies.has('pbToken')) {
    return context.redirect('/auth/login', 302);
  }
}

export function onRequest(context, next) {
  console.log(context.cookies.get('pbToken')?.value);
  
  // TODO - once Pocketbase is ready, add this back in.
  // redirectIfNotAuthed(context);

  return next();
}
