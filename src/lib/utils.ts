export function stringAvatar(name: string) {
  return `${name.split(' ')[0][0]}`;
}

export const withCSR =
  (next: (arg0: any) => any) => async (ctx: { req: { url: string } }) => {
    const isCSR = ctx.req.url?.startsWith('/_next');
    console.log({ isCSR });
    if (isCSR) {
      return {
        props: {},
      };
    }

    return next?.(ctx);
  };
