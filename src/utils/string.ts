export const snakeCaseToTitleCase = (str: string) =>
  str.replace(/^(.)|-+(.)/g, (_, p1, p2) =>
    p1 ? p1.toUpperCase() : ` ${p2.toUpperCase()}`,
  );
