import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image, url }) => {
    const siteTitle = "Star Zone | Top-Rated Luxury Unisex Salon in Erode";
    const defaultDesc = "Experience the best haircuts, expert bridal makeup, and radiant skincare at Star Zone – Erode's premier luxury salon. 10+ years of expert styling.";
    const siteUrl = "https://star-zone.vercel.app";
    const defaultImage = "/logo.png";

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{title ? `${title} | Star Zone` : siteTitle}</title>
            <meta name="description" content={description || defaultDesc} />
            <meta name="google-site-verification" content="iWw1upGG9roSHHuXHIxYTpgGGQ-BlX5cOmobivW25LE" />

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
