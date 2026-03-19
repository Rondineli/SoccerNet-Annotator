import Head from "next/head";

const PageHead = ({ title }) => {
  return (
    <>
      <Head>
        <title>{`${title} || W23065543`}</title>
        <meta name="description" content="Reseacrh (Demo)" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
};

export default PageHead;
