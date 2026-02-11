import type { EditorData } from "@/shared/types/editor";

/**
 * 에디터 데이터를 HTML로 변환하는 함수
 * @param data - 에디터 데이터
 * @returns HTML 파일 내용
 */
export const generatePortfolioHTML = (data: EditorData): string => {
  const { profile, heroStatement, featuredProjects, timeline, contact } = data;

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
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px;
      border-radius: 8px;
      margin-bottom: 40px;
    }

    .hero-statement h2 {
      border-bottom: none;
      font-size: 42px;
      margin-bottom: 15px;
    }

    .hero-statement p {
      font-size: 18px;
      line-height: 1.8;
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

    .timeline-item {
      position: relative;
      margin-bottom: 30px;
      padding-bottom: 30px;
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
        <div class="profile-avatar"></div>
        <div class="profile-info">
          <h1>${escapeHtml(profile.name || "Portfolio")}</h1>
          ${profile.title ? `<div class="title">${escapeHtml(profile.title)}</div>` : ""}
          ${profile.description ? `<p class="description">${escapeHtml(profile.description).replace(/\n/g, "<br>")}</p>` : ""}
        </div>
      </div>
    </header>

    <!-- Hero Statement -->
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
          ${project.link ? `<a href="${escapeHtml(project.link)}" target="_blank" rel="noopener noreferrer">링크 보기</a>` : ""}
        </div>`,
          )
          .join("")}
      </div>
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
        ${contact.links.map((link) => `<a href="${escapeHtml(link.url)}" class="contact-link" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)}</a>`).join("")}
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
