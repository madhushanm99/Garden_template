import Link from "next/link";

const backgroundImages = {
  home4: "url(assets/images/bg/home-bg.jpg)",
  about5: "url(assets/images/bg/about-bg.jpg)",
  services5: "url(assets/images/bg/services-bg.jpg)",
  rainfall_forecast: "url(assets/images/bg/page-bg-2.jpg)",
  // Add more page names and their corresponding background images as needed
};

const PageBanner = ({ pageName, pageTitle }) => {
  // Determine the background image URL based on the pageName
  const backgroundImage = backgroundImages[pageName.toLowerCase()] || "url(assets/images/bg/page-bg-1.jpg)";

  return (
    <section
      className="page-title-area text-white bg_cover"
      style={{ backgroundImage: backgroundImage }}
    >
      <div className="container">
        {/*======  Page-title-Inner ======*/}
        <div className="page-title-inner text-center">
          <h1 className="page-title">{pageName}</h1>
          <div className="gd-breadcrumb">
            <span className="breadcrumb-entry">
              <Link legacyBehavior href="/">
                Home
              </Link>
            </span>
            <span className="separator" />
            <span className="breadcrumb-entry active">{pageName}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageBanner;
