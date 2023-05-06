import React, { useEffect, useState } from "react";

import Header from "../../components/Header";
import NotFoundPage from "../404";
import { casesData } from "../../assets/data/cases-data";
import styles from "../../styles/CaseDetails.module.css";
import { useAppContext } from "../../context/AppContext";

// Generates `/cases/1`, `/cases/2`, ...
export const getStaticPaths = async () => {
  const paths = casesData.map((item) => {
    return {
      params: {
        caseId: item.caseId,
      },
    };
  });

  return {
    paths: paths,
    fallback: false, // can also be true or 'blocking'
  };
};

// `getStaticPaths` requires using `getStaticProps`
export const getStaticProps = async (context) => {
  try {
    const caseId = context.params.caseId;
    const caseData = casesData.filter((item) => item.caseId === caseId)[0];
    const nextCaseId = caseData.nextCaseId;
    const nextCaseData = casesData.filter(
      (item) => item.caseId === nextCaseId
    )[0];
    if (nextCaseData) {
      const {
        title: nextCaseTitle,
        url: nextCaseImgUrl,
        objectPosition: nextCaseObjectPosition = "0% 0%",
      } = nextCaseData;
      return {
        // Passed to the page component as props
        props: {
          caseId: caseId,
          caseData: caseData,
          nextCaseTitle: nextCaseTitle,
          nextCaseImgUrl: nextCaseImgUrl,
          nextCaseObjectPosition: nextCaseObjectPosition,
        },
      };
    }

    return {
      props: {
        caseId,
        caseData,
      },
    };
  } catch (error) {
    return {
      props: {
        notFound: true,
      },
    };
  }
};

const CaseDetails = ({
  caseId,
  caseData,
  nextCaseTitle,
  nextCaseImgUrl,
  nextCaseObjectPosition,
  notFound,
}) => {
  if (notFound) {
    return <NotFoundPage />;
  }

  const { view, setScrollDir } = useAppContext();

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const main = document.querySelector("#main");
    const scrollEvent = () => {
      const currentScrollPosition = main.scrollTop;

      if (currentScrollPosition > scrollPosition) {
        setScrollDir("down");
      } else {
        setScrollDir("up");
      }

      setScrollPosition(currentScrollPosition);
    };

    main.addEventListener("scroll", scrollEvent);
    document.body.style.overflow = "hidden";

    return () => {
      main.removeEventListener("scroll", scrollEvent);
      document.body.style.overflow = "auto";
    };
  }, [scrollPosition]);

  const getLogoColor = (caseId) => {
    switch (caseId) {
      case "suitsupply":
        return "#fff";

      default:
        return "#000";
    }
  };

  const { url, title, desc, objectPosition, pages, nextCaseId } = caseData;

  const renderPageType = (pageInfo) => {
    const { type } = pageInfo;

    switch (type) {
      case "info":
        return (
          <div
            className={styles.info_page}
            style={{
              ...(pageInfo.backgroundColor && {
                backgroundColor: pageInfo.backgroundColor,
              }),
            }}
          >
            <div className={styles.info_page_top_container}>
              <h2>{pageInfo.heading1}</h2>
              <p>{pageInfo.desc1}</p>
              <p>{pageInfo.desc2}</p>
              <a target="_blank" href={pageInfo.redirectUrl}>
                <div>visit platform</div>
              </a>
            </div>
            <div className={styles.info_page_bottom_container}>
              <div>
                <h3>{pageInfo.heading2}</h3>
                <ul>
                  {pageInfo.heading2List.map((item, idx) => {
                    return (
                      <li key={idx}>{`${item} ${
                        idx !== pageInfo.heading2List.length - 1 ? "·" : ""
                      } `}</li>
                    );
                  })}
                </ul>
              </div>
              <div>
                <h3>{pageInfo.heading3}</h3>
                <ul>
                  {pageInfo.heading3List.map((item, idx) => {
                    return (
                      <li key={idx}>{`${item} ${
                        idx !== pageInfo.heading3List.length - 1 ? "·" : ""
                      } `}</li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        );

      case "fullscreen-image":
      case "fullscreen-image-with-text":
        return (
          <div className={styles.scroll_snap_wrapper}>
            <img
              className={styles.fullscreen_image}
              src={pageInfo.imageUrl}
              alt={pageInfo.alt}
              style={{
                ...(pageInfo.objectPosition && {
                  objectPosition: pageInfo.objectPosition,
                }),
              }}
            />
            {pageInfo.heading && pageInfo.desc && (
              <div
                className={[
                  styles.abs_pos_text_wrapper,
                  pageInfo?.textPosition === "left" && styles.abs_text_left,
                ].join(" ")}
              >
                <h2>{pageInfo.heading}</h2>
                <p>{pageInfo.desc}</p>
              </div>
            )}
          </div>
        );

      case "centered-text":
        return (
          <div className={styles.only_centered_text}>
            <div className={styles.only_centered_text_text_wrapper}>
              <h2>{pageInfo.heading}</h2>
              <p>{pageInfo.desc}</p>
            </div>
          </div>
        );

      case "portrait-video":
      case "portrait-video-with-text":
        return (
          <div
            className={styles.video_portrait_centered}
            style={{
              ...(pageInfo.backgroundColor && {
                backgroundColor: pageInfo.backgroundColor,
              }),
              ...(pageInfo.backgroundImage && {
                backgroundImage: `url(${pageInfo.backgroundImage})`,
              }),
            }}
          >
            <div className={styles.video_portrait_centered_video_wrapper}>
              <video
                className={styles.video_portrait_centered_video}
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={pageInfo.videoUrl} type="video/mp4" />
              </video>
            </div>
            {pageInfo.heading && pageInfo.desc && (
              <div
                className={[
                  styles.abs_pos_text_wrapper,
                  styles.abs_text_left,
                ].join(" ")}
              >
                <h2>{pageInfo.heading}</h2>
                <p>{pageInfo.desc}</p>
              </div>
            )}
          </div>
        );

      case "fullscreen-video":
      case "fullscreen-video-with-text":
        return (
          <div className={styles.video_fullscreen}>
            <div className={styles.video_fullscreen_video_wrapper}>
              <video
                className={styles.video_fullscreen_video}
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={pageInfo.videoUrl} type="video/mp4" />
              </video>
            </div>
            {pageInfo.heading && pageInfo.desc && (
              <div className={styles.abs_pos_text_wrapper}>
                <h2>{pageInfo.heading}</h2>
                <p>{pageInfo.desc}</p>
              </div>
            )}
          </div>
        );

      default:
        break;
    }
  };

  const renderDesktopPages = () => {
    let renderedPages = [];
    let n = 0;
    if (pages) {
      while (n < pages.length) {
        if (pages[n].gridPlacement === "full") {
          renderedPages.push(
            <section className={styles.section} key={n}>
              <div className={styles.full_grid}>{renderPageType(pages[n])}</div>
            </section>
          );
          n = n + 1;
        } else {
          renderedPages.push(
            <section className={styles.section} key={n}>
              {renderPageType(pages[n])}
              {pages[n + 1] && renderPageType(pages[n + 1])}
            </section>
          );
          n = n + 2;
        }
      }
      return renderedPages;
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main} id="main">
        {/* main page */}
        <div className={styles.main_page}>
          <Header logoColor={getLogoColor(caseId)} delay={0} />
          <img
            className={styles.main_page_image}
            src={url}
            alt={title}
            style={{
              ...(objectPosition && {
                objectPosition: objectPosition,
              }),
            }}
          />
          <footer className={styles.main_page_footer}>
            <span className={styles.main_page_title}>{title}</span>
            <span className={styles.main_page_separator}>&nbsp;·&nbsp;</span>
            <span className={styles.main_page_desc}>{desc}</span>
          </footer>
        </div>

        {/* mobile pages */}
        {view === "mobile"
          ? pages.map((pageInfo, idx) => {
              return (
                <React.Fragment key={idx}>
                  {renderPageType(pageInfo)}
                </React.Fragment>
              );
            })
          : renderDesktopPages()}

        {/* last page */}
        <div
          className={styles.scroll_snap_wrapper}
          style={{ backgroundColor: "#000" }}
        >
          <img
            className={styles.main_page_image}
            src={nextCaseImgUrl}
            alt={nextCaseTitle}
            style={{
              opacity: 0.5,
              ...(nextCaseObjectPosition && {
                objectPosition: nextCaseObjectPosition,
              }),
            }}
          />
          <div className={styles.last_page_text_wrapper}>
            {nextCaseId && <div className={styles.next_up_wrapper}>
              {`Next up - ${nextCaseTitle}`}
            </div>}
            <a href={nextCaseId? `/cases/${nextCaseId}`: '/cases'}>explore</a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CaseDetails;
