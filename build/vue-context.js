module.exports = {
    SEOMixinTitle: {
        title:'CryptoCurrency of the future',
        facebook: 'WebDollar - CryptoCurrency of the internet',
        twitter: 'WebDollar - CryptoCurrency of the internet',
    }, // default title
    SEOMixinDescription: {
        description:'WebDollar is easy to use Cryptocurrency, Wallet in the Browser with modern hybrid Mining Proof of Work and Proof of Stake. Own blockchain. No installs, no downloads.',
        facebook:'WebDollar is a cryptocurrency native to the browser. No installs or downloads. Mining and Wallets are incorporated in your browser. WebDollar is aiming for mass adoption',
        twitter: 'WebDollar is a cryptocurrency native to the browser. No installs or downloads. Mining and Wallets are incorporated in your browser. WebDollar is aiming for mass adoption', // default title
    },
    SEOMixinKeywords: 'cryptocurrency, blockchain, browser mining, bitcoin alternative, future of cryptocurrency, cryptocoin',
    SEOMixinImages:
    '<meta property="og:image"  content="http://webdollar.io/public/assets/images/WebDollar-Landing-image.png"  /> ' +
    '<meta property="og:image:alt" content="WebDollar - Currency of Internet" />' +
    '<meta property="twitter:image"  content="http://webdollar.io/public/assets/images/WebDollar-Landing-image.png" />'+
    '<meta property="twitter:image:alt" content="WebDollar - Currency of the Internet"/>',
    SEOMixinSchemaMarkup: JSON.stringify({
        "@context": "http://schema.org",
        "@type": "WebSite",
        name: "WebDollar",
        alternateName: "WebDollar Currency of the Internet",
        url: "http://webdollar.io/",
        potentialAction: {
            "@type": "SearchAction",
            // target: "http://skyhub.me/search/{query}",
            "query-input": "required"
        }
    }),
    SEOMixinBreadcrumbsSchemaMarkup: JSON.stringify({
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [{
            "@type": "ListItem",
            position: 1,
            item: {
                "@id": "https://webolldar.io/",
                name: "Home",
                image: "http://webdollar.io/public/WebDollar-logo.jpg"
            }
        }],
    }),
    SEOMixinWebPageType: 'website',
    SEOMixinCopyright: 'WebDollar',
    SEOMixinLanguage: 'en-US',
    pageType: 'article',
};
