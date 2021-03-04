export function withAuthServerSideProps(getServerSidePropsFunc?: Function) {
  return async (context: any) => {
    const user = await getUser(context);
    if (getServerSidePropsFunc) {
      return {
        props: { user, data: await getServerSidePropsFunc(context, user) },
      };
    }
    return { props: { user, data: { props: { user } } } };
  };
}

async function getUser(content: any) {
  return {
    id: 1,
    username: "JBis",
    email: "test@test.com",
  };
}

// https://github.com/vercel/next.js/discussions/10925

