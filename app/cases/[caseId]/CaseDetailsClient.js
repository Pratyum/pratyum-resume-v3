'use client';
import React, { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import styles from "@/styles/CaseDetails.module.css";
import { useAppContext } from "@/context/AppContext";
import StructuredData from "@/components/StructuredData";
import { MDXRemote } from "next-mdx-remote";
import SlidingText from "@/components/SlidingText";

const components = {
  // Headings
  h1: (props) => <h1 className={styles.mdx_h1} {...props} />,
  h2: (props) => <h2 className={styles.mdx_h2} {...props} />,
  h3: (props) => <h3 className={styles.mdx_h3} {...props} />,
  h4: (props) => <h4 className={styles.mdx_h4} {...props} />,
  h5: (props) => <h5 className={styles.mdx_h5} {...props} />,
  h6: (props) => <h6 className={styles.mdx_h6} {...props} />,
  
  // Text elements
  p: (props) => <p className={styles.mdx_p} {...props} />,
  blockquote: (props) => <blockquote className={styles.mdx_blockquote} {...props} />,
  
  // Lists
  ul: (props) => <ul className={styles.mdx_ul} {...props} />,
  ol: (props) => <ol className={styles.mdx_ol} {...props} />,
  li: (props) => <li className={styles.mdx_li} {...props} />,
  
  // Code blocks
  pre: (props) => <pre className={styles.mdx_pre} {...props} />,
  code: ({ className, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';
    return (
      <div className={styles.mdx_code_container}>
        {language && <span className={styles.mdx_code_language}>{language}</span>}
        <code className={`${styles.mdx_code} ${className || ''}`} {...props} />
      </div>
    );
  },
  inlineCode: (props) => <code className={styles.mdx_inline_code} {...props} />,
  
  // Tables
  table: (props) => <table className={styles.mdx_table} {...props} />,
  thead: (props) => <thead className={styles.mdx_thead} {...props} />,
  tbody: (props) => <tbody className={styles.mdx_tbody} {...props} />,
  tr: (props) => <tr className={styles.mdx_tr} {...props} />,
  th: (props) => <th className={styles.mdx_th} {...props} />,
  td: (props) => <td className={styles.mdx_td} {...props} />,
  
  // Horizontal rule
  hr: () => <hr className={styles.mdx_hr} />,
  
  // Links and images
  a: ({ href, children, ...props }) => (
    <a 
      href={href} 
      className={styles.mdx_a}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  img: (props) => (
    <div className={styles.mdx_img_container}>
      <img 
        className={styles.mdx_img} 
        alt={props.alt || ''} 
        loading="lazy"
        {...props} 
      />
      {/* {props.alt && <figcaption className={styles.mdx_img_caption}>{props.alt}</figcaption>} */}
    </div>
  ),
  
  // Custom components
  TechStack: ({ technologies }) => (
    <div className={styles.mdx_tech_stack}>
      <h3 className={styles.mdx_tech_stack_title}>Technologies Used</h3>
      <div className={styles.mdx_tech_stack_list}>
        {technologies.map((tech, index) => (
          <span key={index} className={styles.mdx_tech_badge}>
            {tech}
          </span>
        ))}
      </div>
    </div>
  ),
  
  KeyPoints: ({ children }) => (
    <div className={styles.mdx_key_points}>
      {children}
    </div>
  ),
  
  ProjectLink: ({ href, text }) => (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.mdx_project_link}
    >
      <span>{text || 'View Project'}</span>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    </a>
  ),
  
  CodeDemo: ({ title, children }) => (
    <div className={styles.mdx_code_demo}>
      {title && <div className={styles.mdx_code_demo_title}>{title}</div>}
      <div className={styles.mdx_code_demo_content}>
        {children}
      </div>
    </div>
  ),
  
  ImageGrid: ({ images }) => (
    <div className={styles.mdx_image_grid}>
      {images.map((img, index) => (
        <div key={index} className={styles.mdx_image_grid_item}>
          <img 
            src={img.src} 
            alt={img.alt || ''} 
            className={styles.mdx_grid_img}
          />
        </div>
      ))}
    </div>
  ),
  
  VideoEmbed: ({ src, title }) => (
    <div className={styles.mdx_video_container}>
      <iframe
        src={src}
        title={title || 'Embedded video'}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={styles.mdx_video}
      />
    </div>
  ),
  
  Callout: ({ type = 'info', title, children }) => (
    <div className={`${styles.mdx_callout} ${styles[`mdx_callout_${type}`]}`}>
      {title && <div className={styles.mdx_callout_title}>{title}</div>}
      <div className={styles.mdx_callout_content}>{children}</div>
    </div>
  ),
  
  Timeline: ({ events }) => (
    <div className={styles.mdx_timeline}>
      {events.map((event, index) => (
        <div key={index} className={styles.mdx_timeline_item}>
          <div className={styles.mdx_timeline_date}>{event.date}</div>
          <div className={styles.mdx_timeline_content}>
            <h4 className={styles.mdx_timeline_title}>{event.title}</h4>
            <p className={styles.mdx_timeline_description}>{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
};

const CaseDetailsClient = ({
  caseId,
  caseData,
  nextCaseTitle,
  nextCaseImgUrl,
  nextCaseObjectPosition,
}) => {
  const { view, setScrollDir } = useAppContext();
  const mainRef = useRef(null);
  const { mdxSource, frontMatter } = caseData;

  // Set up scroll detection with proper cleanup and dependencies
useEffect(() => {
  // Get the main container - use ref instead of querySelector for reliability
  const mainElement = mainRef.current;
  
  if (!mainElement) return; // Safety check
  
  // Make sure the main container is styled for scrolling
  mainElement.style.height = '100vh'; // Set height to viewport height
  mainElement.style.overflowY = 'auto'; // Enable vertical scrolling
  mainElement.style.overflowX = 'hidden'; // Prevent horizontal scrolling
  
  let lastScrollTop = 0; // Use a local variable instead of state to avoid re-renders
  
  const scrollEvent = () => {
    const currentScrollTop = mainElement.scrollTop;
    
    // Determine scroll direction
    if (currentScrollTop > lastScrollTop) {
      setScrollDir("down");
    } else if (currentScrollTop < lastScrollTop) {
      setScrollDir("up");
    }
    
    // Update for next comparison
    lastScrollTop = currentScrollTop;
  };
  
  // Add scroll event listener
  mainElement.addEventListener('scroll', scrollEvent);
  
  // Prevent body scrolling but allow main container to scroll
  document.body.style.overflow = 'hidden';
  
  // Cleanup function
  return () => {
    if (mainElement) {
      mainElement.removeEventListener('scroll', scrollEvent);
    }
    document.body.style.overflow = 'auto';
  };
}, [setScrollDir]);

  const getLogoColor = (caseId) => {
    switch (caseId) {
      case "suitsupply":
        return "#fff";

      default:
        return "#000";
    }
  };

  const { url, title, desc, objectPosition, pages, nextCaseId } = frontMatter;

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
              <SlidingText as="a" target="_blank" href={pageInfo.redirectUrl} text="Visit platform"/>
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
              {pageInfo.heading3List && <div>
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
              </div>}
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
  const structuredData = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": caseData.title,
      "description": caseData.desc,
      "applicationCategory": "Web Application",
      "author": {
        "@type": "Person",
        "name": "Pratyum Jagannath"
      },
      "keywords": caseData.keywords,
  }

  return (
    <>
    <div className={styles.container}>
      <main className={styles.main} ref={mainRef} id="main">
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
        {/* Add MDX content as an additional scrollable section */}
        <section className={styles.mdx_section}>
          <div className={styles.mdx_content_wrapper}>
            <MDXRemote {...mdxSource} components={components} />
          </div>
        </section>

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
            {nextCaseId && (
              <div className={styles.next_up_wrapper}>
                {`Next up - ${nextCaseTitle}`}
              </div>
            )}
            <a href={nextCaseId ? `/cases/${nextCaseId}` : "/cases"}>
              explore
            </a>
          </div>
        </div>
      </main>
    </div>
    <StructuredData data={structuredData} />
    </>
  );
};

export default CaseDetailsClient;