export function seo({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
    ],
  };
}
