import { Head } from "vite-react-ssg";

const SITE_URL = "https://antton.digital";
const OG_IMAGE = `${SITE_URL}/og-cover.jpg`;

interface SeoProps {
  title: string;
  description: string;
  /** Ruta absoluta dentro del sitio, p. ej. "/servicios". Home = "/". */
  path?: string;
}

const Seo = ({ title, description, path = "/" }: SeoProps) => {
  const url = `${SITE_URL}${path}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={OG_IMAGE} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </Head>
  );
};

export default Seo;
