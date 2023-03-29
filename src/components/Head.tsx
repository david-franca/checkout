import NextHead from "next/head";

interface HeadType {
  title: string;
}
export const Head: React.FC<HeadType> = ({ title }) => {
  return (
    <NextHead>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  );
};
