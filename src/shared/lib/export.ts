import type { EditorData } from "@/shared/types/editor";

/**
 * URL 정규화 함수 - http:// 또는 https:// 자동 추가
 */
const normalizeUrl = (url: string): string => {
  if (!url) return "";
  const trimmed = url.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `https://${trimmed}`;
};

/**
 * 에디터 데이터를 HTML로 변환하는 함수
 * @param data - 에디터 데이터
 * @returns HTML 파일 내용
 */
export const generatePortfolioHTML = (data: EditorData): string => {
  const {
    profile,
    heroStatement,
    featuredProjects,
    gallery,
    about,
    timeline,
    contact,
  } = data;

  const htmlContent = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${profile.name || "Portfolio"}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f9f9f9;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    header {
      margin-bottom: 60px;
      border-bottom: 1px solid #e0e0e0;
      padding-bottom: 40px;
    }

    .profile {
      display: flex;
      gap: 30px;
      align-items: flex-start;
      margin-bottom: 20px;
    }

    .profile-avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      flex-shrink: 0;
      overflow: hidden;
    }

    .profile-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .profile-info h1 {
      font-size: 32px;
      margin-bottom: 5px;
    }

    .profile-info .title {
      font-size: 18px;
      color: #666;
      margin-bottom: 10px;
    }

    .profile-info .description {
      font-size: 15px;
      color: #666;
      line-height: 1.8;
    }

    section {
      margin-bottom: 60px;
    }

    section h2 {
      font-size: 24px;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #667eea;
      color: #333;
    }

    .hero-statement {
      background: #ffffff;
      border: 1px solid #e0e0e0;
      padding: 50px 40px;
      border-radius: 12px;
      margin-bottom: 40px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .hero-statement h2 {
      border-bottom: none;
      font-size: 28px;
      margin-bottom: 20px;
      color: #333;
      font-weight: 700;
      line-height: 1.3;
    }

    .hero-statement p {
      font-size: 15px;
      line-height: 1.8;
      color: #666;
    }

    .projects {
      display: grid;
      gap: 30px;
    }

    .project {
      padding: 20px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background: white;
      transition: box-shadow 0.3s ease;
    }

    .project:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .project h3 {
      font-size: 20px;
      margin-bottom: 10px;
      color: #333;
    }

    .project p {
      color: #666;
      margin-bottom: 15px;
      line-height: 1.8;
    }

    .project-meta {
      margin: 10px 0 14px;
      display: grid;
      gap: 6px;
      font-size: 13px;
      color: #666;
    }

    .project a {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
    }

    .project a:hover {
      text-decoration: underline;
    }

    .timeline {
      position: relative;
      padding-left: 30px;
    }

    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 20px;
    }

    .gallery-item {
      border: 1px solid #e0e0e0;
      border-radius: 10px;
      overflow: hidden;
      background: #fff;
    }

    .gallery-thumb {
      width: 100%;
      aspect-ratio: 4 / 3;
      object-fit: cover;
      background: #f0f0f0;
    }

    .gallery-body {
      padding: 14px;
    }

    .gallery-body h3 {
      font-size: 16px;
      margin-bottom: 6px;
    }

    .gallery-meta {
      font-size: 12px;
      color: #888;
      margin-bottom: 8px;
      text-transform: uppercase;
    }

    .about {
      background: #fff;
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      padding: 24px;
    }

    .about p {
      color: #555;
      margin-bottom: 12px;
      line-height: 1.8;
    }

    .timeline-item {
      position: relative;
      margin-bottom: 30px;
      padding-bottom: 30px;
      padding-left: 20px;
      border-left: 2px solid #e0e0e0;
    }

    .timeline-item::before {
      content: "";
      position: absolute;
      left: -8px;
      top: 5px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #667eea;
    }

    .timeline-item h3 {
      font-size: 18px;
      margin-bottom: 5px;
      color: #333;
    }

    .timeline-item .date {
      font-size: 13px;
      color: #999;
      margin-bottom: 8px;
    }

    .timeline-item p {
      color: #666;
      line-height: 1.8;
    }

    .contact {
      background: #f5f5f5;
      padding: 30px;
      border-radius: 8px;
    }

    .contact p {
      margin-bottom: 10px;
      font-size: 15px;
    }

    .contact a {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
    }

    .contact-links {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 15px;
    }

    .contact-link {
      display: inline-block;
      padding: 8px 16px;
      border: 1px solid #667eea;
      border-radius: 20px;
      color: #667eea;
      text-decoration: none;
      font-size: 13px;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .contact-link:hover {
      background: #667eea;
      color: white;
    }

    footer {
      text-align: center;
      color: #999;
      font-size: 13px;
      padding-top: 40px;
      border-top: 1px solid #e0e0e0;
      margin-top: 60px;
    }

    @media (max-width: 768px) {
      .container {
        padding: 20px;
      }

      .profile {
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      section h2 {
        font-size: 20px;
      }

      .hero-statement h2 {
        font-size: 28px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <header>
      <div class="profile">
        <div class="profile-avatar">
          ${profile.image ? `<img src="${profile.image}" alt="${escapeHtml(profile.name || "Profile")}" />` : ""}
        </div>
        <div class="profile-info">
          <h1>${escapeHtml(profile.name || "Portfolio")}</h1>
          ${profile.title ? `<div class="title">${escapeHtml(profile.title)}</div>` : ""}
          ${profile.description ? `<p class="description">${escapeHtml(profile.description).replace(/\n/g, "<br>")}</p>` : ""}
        </div>
      </div>
    </header>

    <!-- 소개 문구 -->
    ${
      heroStatement.headline || heroStatement.subheadline
        ? `<section class="hero-statement">
      ${heroStatement.headline ? `<h2>${escapeHtml(heroStatement.headline)}</h2>` : ""}
      ${heroStatement.subheadline ? `<p>${escapeHtml(heroStatement.subheadline).replace(/\n/g, "<br>")}</p>` : ""}
    </section>`
        : ""
    }

    <!-- Featured Projects -->
    ${
      featuredProjects.projects.length > 0
        ? `<section>
      <h2>프로젝트</h2>
      <div class="projects">
        ${featuredProjects.projects
          .map(
            (project) => `<div class="project">
          <h3>${escapeHtml(project.title || "프로젝트명")}</h3>
          ${project.description ? `<p>${escapeHtml(project.description).replace(/\n/g, "<br>")}</p>` : ""}
          ${
            project.concept ||
            project.tools ||
            project.duration ||
            project.participation
              ? `<div class="project-meta">
          ${project.concept ? `<div><strong>의도/컨셉:</strong> ${escapeHtml(project.concept)}</div>` : ""}
          ${project.tools ? `<div><strong>사용 툴:</strong> ${escapeHtml(project.tools)}</div>` : ""}
          ${project.duration ? `<div><strong>작업 기간:</strong> ${escapeHtml(project.duration)}</div>` : ""}
          ${project.participation ? `<div><strong>참여도:</strong> ${escapeHtml(project.participation)}</div>` : ""}
          </div>`
              : ""
          }
          ${
            project.links && project.links.length > 0
              ? `<div class="project-links">${project.links
                  .filter((link: any) => link.label?.trim() && link.url?.trim())
                  .map(
                    (link: any) =>
                      `<a href="${escapeHtml(normalizeUrl(link.url))}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)}</a>`,
                  )
                  .join(" | ")}</div>`
              : ""
          }
        </div>`,
          )
          .join("")}
      </div>
    </section>`
        : ""
    }

    <!-- Gallery -->
    ${
      gallery.items.length > 0
        ? `<section>
      <h2>작품 갤러리</h2>
      <div class="gallery-grid">
        ${gallery.items
          .map(
            (item) => `<article class="gallery-item">
          ${item.thumbnail ? `<img class="gallery-thumb" src="${escapeHtml(item.thumbnail)}" alt="${escapeHtml(item.title || "작품")}" />` : `<div class="gallery-thumb"></div>`}
          <div class="gallery-body">
            <h3>${escapeHtml(item.title || "작품 제목")}</h3>
            <div class="gallery-meta">${escapeHtml(item.mediaType || "image")}</div>
            ${item.summary ? `<p>${escapeHtml(item.summary).replace(/\n/g, "<br>")}</p>` : ""}
            ${item.mediaUrl ? `<a href="${escapeHtml(normalizeUrl(item.mediaUrl))}" target="_blank" rel="noopener noreferrer">작품 보기</a>` : ""}
          </div>
        </article>`,
          )
          .join("")}
      </div>
    </section>`
        : ""
    }

    <!-- About -->
    ${
      about.style || about.interests || about.bio
        ? `<section class="about">
      <h2>소개</h2>
      ${about.style ? `<p><strong>작업 스타일:</strong> ${escapeHtml(about.style).replace(/\n/g, "<br>")}</p>` : ""}
      ${about.interests ? `<p><strong>관심 분야:</strong> ${escapeHtml(about.interests).replace(/\n/g, "<br>")}</p>` : ""}
      ${about.bio ? `<p><strong>간단 이력:</strong> ${escapeHtml(about.bio).replace(/\n/g, "<br>")}</p>` : ""}
    </section>`
        : ""
    }

    <!-- Timeline -->
    ${
      timeline.items.length > 0
        ? `<section>
      <h2>경력 / 경험</h2>
      <div class="timeline">
        ${timeline.items
          .map(
            (item) => `<div class="timeline-item">
          <h3>${escapeHtml(item.title || "제목")}</h3>
          <div class="date">${escapeHtml(item.startDate)} ${item.endDate ? `~ ${escapeHtml(item.endDate)}` : ""}</div>
          ${item.description ? `<p>${escapeHtml(item.description).replace(/\n/g, "<br>")}</p>` : ""}
        </div>`,
          )
          .join("")}
      </div>
    </section>`
        : ""
    }

    <!-- Contact -->
    ${
      contact.email || contact.phone || contact.links.length > 0
        ? `<section class="contact">
      <h2>연락처</h2>
      ${contact.email ? `<p><strong>이메일:</strong> <a href="mailto:${escapeHtml(contact.email)}">${escapeHtml(contact.email)}</a></p>` : ""}
      ${contact.phone ? `<p><strong>전화:</strong> ${escapeHtml(contact.phone)}</p>` : ""}
      ${
        contact.links.length > 0
          ? `<div class="contact-links">
        ${contact.links
          .filter((link: any) => link.label?.trim() && link.url?.trim())
          .map(
            (link: any) =>
              `<a href="${escapeHtml(normalizeUrl(link.url))}" class="contact-link" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)}</a>`,
          )
          .join("")}
      </div>`
          : ""
      }
    </section>`
        : ""
    }

    <footer>
      <p>© 2024 ${escapeHtml(profile.name || "Portfolio")}. Built with Portfolio Template Builder.</p>
    </footer>
  </div>
</body>
</html>`;

  return htmlContent;
};

/**
 * HTML 문자를 이스케이프하는 함수
 */
function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

/**
 * 파일을 다운로드하는 함수
 */
export const downloadFile = (content: string, filename: string) => {
  const blob = new Blob([content], { type: "text/html;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
};

/**
 * HTML을 PDF로 변환하여 다운로드하는 함수
 */
export const downloadPDF = async (data: EditorData) => {
  try {
    // 동적으로 html2pdf.js 로드
    const html2pdf = (await import("html2pdf.js")).default;

    // HTML 생성
    const htmlContent = generatePortfolioHTML(data);

    // 숨겨진 컨테이너에 HTML 삽입
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.left = "-10000px";
    container.style.top = "0";
    container.style.width = "210mm";
    container.style.backgroundColor = "#f9f9f9";
    container.innerHTML = htmlContent;
    document.body.appendChild(container);

    // 스타일이 적용되도록 잠시 대기
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // container 내부의 실제 body 내용만 가져오기
    const htmlDoc = container.querySelector(".container") as HTMLElement;

    if (!htmlDoc) {
      throw new Error("콘텐츠를 찾을 수 없습니다.");
    }

    // PDF 옵션 설정
    const opt = {
      margin: [10, 10, 10, 10] as [number, number, number, number],
      filename: `${data.profile.name || "portfolio"}-portfolio.pdf`,
      image: { type: "jpeg" as const, quality: 0.95 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: "#f9f9f9",
        windowWidth: 794, // A4 width in pixels at 96 DPI
        windowHeight: 1123, // A4 height in pixels at 96 DPI
      },
      jsPDF: {
        unit: "mm" as const,
        format: "a4" as const,
        orientation: "portrait" as const,
      },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] as any },
    };

    // PDF 생성 및 다운로드
    await html2pdf().set(opt).from(htmlDoc).save();

    // 컨테이너 제거
    document.body.removeChild(container);
  } catch (error) {
    console.error("PDF 생성 중 오류 발생:", error);
    alert("PDF 생성에 실패했습니다. 다시 시도해주세요.");
  }
};
