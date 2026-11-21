function setupNavigation() {
  const root = document.documentElement;
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const updateThemeLabel = () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    themeToggle.setAttribute("aria-label", "Switch to " + next + " theme");
    return next;
  };
  updateThemeLabel();
  themeToggle.addEventListener("click", () => {
    const theme = updateThemeLabel();
    root.dataset.theme = theme;
    root.dataset.bsTheme = theme;
    updateThemeLabel();
    try { localStorage.setItem("theme", theme); } catch { /* Storage is optional. */ }
  });

  const menu = document.querySelector("#drawer");
  const opener = document.querySelector("[data-menu-open]");
  const backdrop = document.querySelector(".drawer-backdrop");
  const closeButton = menu.querySelector("button[data-menu-close]");
  const background = document.querySelectorAll(".header, main, footer, .skip-link, .to-top");
  function setMenu(open) {
    menu.classList.toggle("open", open);
    backdrop.classList.toggle("open", open);
    menu.inert = !open;
    menu.setAttribute("aria-hidden", String(!open));
    opener.setAttribute("aria-expanded", String(open));
    background.forEach((element) => { element.inert = open; });
    document.body.style.overflow = open ? "hidden" : "";
    (open ? closeButton : opener).focus();
  }
  opener.addEventListener("click", () => setMenu(true));
  document.querySelectorAll("[data-menu-close]").forEach((element) => {
    element.addEventListener("click", () => setMenu(false));
  });
  document.addEventListener("keydown", (event) => {
    if (!menu.inert && event.key === "Escape") setMenu(false);
  });

  const header = document.querySelector(".header");
  const top = document.querySelector("[data-back-to-top]");
  function updateScroll() {
    const scrolled = window.scrollY > 30;
    header.classList.toggle("scrolled", scrolled);
    top.classList.toggle("show", scrolled);
    top.tabIndex = scrolled ? 0 : -1;
  }
  window.addEventListener("scroll", updateScroll, { passive: true });
  updateScroll();
  top.addEventListener("click", () => window.scrollTo({ top: 0 }));
}

function setupAnimations() {
  if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const reveal = new IntersectionObserver((entries) => {
    for (const { target, isIntersecting } of entries) {
      if (!isIntersecting) continue;
      target.classList.add("in");
      reveal.unobserve(target);
    }
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal").forEach((element) => reveal.observe(element));
  document.documentElement.classList.add("js");

  const counters = new IntersectionObserver((entries) => {
    for (const { target, isIntersecting } of entries) {
      if (!isIntersecting) continue;
      counters.unobserve(target);
      const total = Number(target.dataset.counter);
      const start = performance.now();
      function tick(now) {
        const progress = Math.min(1, (now - start) / 1600);
        target.textContent = Math.round(total * (1 - (1 - progress) ** 3));
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
  }, { threshold: 0.4 });
  document.querySelectorAll("[data-counter]").forEach((element) => counters.observe(element));
}

function fold(value) {
  return value.toLocaleLowerCase("tr").normalize("NFD").replace(/\p{M}/gu, "").replaceAll("ı", "i");
}

function setupPublications(query) {
  const explorer = document.querySelector("[data-publications]");
  if (!explorer) return;

  const search = explorer.querySelector('[data-filter="q"]');
  const topic = explorer.querySelector('[data-filter="topic"]');
  const index = explorer.querySelector('[data-filter="index"]');
  const decade = explorer.querySelector('[data-filter="decade"]');
  const types = [...explorer.querySelectorAll("[data-type]")];
  const clear = [...explorer.querySelectorAll("[data-clear-filters]")];
  const count = explorer.querySelector("[data-result-count]");
  const empty = explorer.querySelector("[data-no-results]");
  const download = explorer.querySelector("[data-export-bib]");
  const groups = [...explorer.querySelectorAll(".year-group")].map((element) => ({
    element,
    count: element.querySelector("[data-year-count]"),
    items: [...element.querySelectorAll("[data-publication]")].map((row) => ({
      row,
      type: row.dataset.publication,
      text: fold(row.dataset.search),
      topics: JSON.parse(row.dataset.topics),
      indexing: JSON.parse(row.dataset.indexing),
      doi: Boolean(row.dataset.doi),
      decade: String(Math.floor(Number(row.dataset.year) / 10) * 10),
    })),
  }));

  search.value = query.get("q") || "";
  const initialTopic = query.get("topic");
  if ([...topic.options].some((option) => option.value === initialTopic)) topic.value = initialTopic;
  let type = types.some((button) => button.dataset.type === query.get("type")) ? query.get("type") : "all";
  let visible = [];

  function update() {
    const term = fold(search.value.trim());
    visible = [];
    for (const group of groups) {
      let matches = 0;
      for (const item of group.items) {
        const indexed = index.value === "all"
          || (index.value === "doi" ? item.doi : item.indexing.includes(index.value === "sci" ? "SCI-Expanded" : "Scopus"));
        const show = (type === "all" || type === item.type)
          && (topic.value === "all" || item.topics.includes(topic.value))
          && indexed
          && (decade.value === "all" || decade.value === item.decade)
          && item.text.includes(term);

        item.row.hidden = !show;
        if (show) {
          matches++;
          visible.push(item.row);
        }
      }
      group.element.hidden = matches === 0;
      group.count.textContent = matches + (matches === 1 ? " publication" : " publications");
    }

    for (const button of types) {
      const active = button.dataset.type === type;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    }
    count.textContent = visible.length;
    empty.hidden = visible.length > 0;
    download.disabled = visible.length === 0;
    clear[0].hidden = !term && [type, topic.value, index.value, decade.value].every((value) => value === "all");
  }

  explorer.addEventListener("input", update);
  for (const button of types) button.addEventListener("click", () => { type = button.dataset.type; update(); });
  for (const button of clear) button.addEventListener("click", () => {
    search.value = "";
    type = topic.value = index.value = decade.value = "all";
    update();
  });
  download.addEventListener("click", () => {
    const content = visible.map((row) => row.querySelector(".bib").textContent).join("\n\n");
    const url = URL.createObjectURL(new Blob([content], { type: "application/x-bibtex" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "kavak-publications.bib";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  update();
}

function setupCitations() {
  for (const row of document.querySelectorAll("[data-publication]")) {
    const citation = row.querySelector(".bib");
    const cite = row.querySelector("[data-cite]");
    const copy = row.querySelector("[data-copy]");
    function showCitation(show) {
      citation.hidden = !show;
      cite.setAttribute("aria-expanded", String(show));
    }
    cite.addEventListener("click", () => showCitation(citation.hidden));
    let timer;
    copy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(citation.textContent);
        const label = copy.querySelector("span");
        label.textContent = "Copied";
        clearTimeout(timer);
        timer = setTimeout(() => { label.textContent = "BibTeX"; }, 1800);
      } catch {
        showCitation(true);
      }
    });
  }
}

function setupContact(query) {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;
  const subject = form.elements.namedItem("subject");
  const initial = query.get("subject");
  if ([...subject.options].some((option) => option.value === initial)) subject.value = initial;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = new FormData(form);
    const org = fields.get("org");
    const signature = fields.get("name") + (org ? ", " + org : "");
    const body = fields.get("message") + "\n\n— " + signature + "\n" + fields.get("email");
    location.href = form.action + "?subject=" + encodeURIComponent("[Website] " + subject.value)
      + "&body=" + encodeURIComponent(body);
  });
}

const query = new URLSearchParams(location.search);
setupNavigation();
setupPublications(query);
setupCitations();
setupContact(query);
setupAnimations();
