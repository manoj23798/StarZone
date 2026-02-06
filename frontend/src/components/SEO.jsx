import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image, url }) => {
    const siteTitle = "Star Zone | Luxury Unisex Salon";
    const defaultDesc = "Star Zone Salon - The premium unisex hair and style salon in Erode. Expert haircuts, bridal makeup, and radiant skin care.";
    const siteUrl = "https://star-zone.vercel.app";
    const defaultImage = "/logo.png";

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{title ? `${title} | Star Zone` : siteTitle}</title>
            <meta name="description" content={description || defaultDesc} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url ? `${siteUrl}${url}` : siteUrl} />
            <meta property="og:title" content={title || siteTitle} />
            <meta property="og:description" content={description || defaultDesc} />
            <meta property="og:image" content={image || defaultImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url ? `${siteUrl}${url}` : siteUrl} />
            <meta property="twitter:title" content={title || siteTitle} />
            <meta property="twitter:description" content={description || defaultDesc} />
            <meta property="twitter:image" content={image || defaultImage} />
        </Helmet>
    );
};

export default SEO;
