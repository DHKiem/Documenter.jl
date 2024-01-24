// Generated by Documenter.jl
requirejs.config({
  paths: {
    'headroom': 'https://cdnjs.cloudflare.com/ajax/libs/headroom/0.12.0/headroom.min',
    'katex-auto-render': 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.8/contrib/auto-render.min',
    'minisearch': 'https://cdn.jsdelivr.net/npm/minisearch@6.1.0/dist/umd/index.min',
    'highlight-yaml': 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/languages/yaml.min',
    'headroom-jquery': 'https://cdnjs.cloudflare.com/ajax/libs/headroom/0.12.0/jQuery.headroom.min',
    'highlight': 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min',
    'highlight-julia-repl': 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/languages/julia-repl.min',
    'highlight-julia': 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/languages/julia.min',
    'jqueryui': 'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.13.2/jquery-ui.min',
    'jquery': 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min',
    'katex': 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.8/katex.min',
  },
  shim: {
  "highlight-julia": {
    "deps": [
      "highlight"
    ]
  },
  "highlight-yaml": {
    "deps": [
      "highlight"
    ]
  },
  "katex-auto-render": {
    "deps": [
      "katex"
    ]
  },
  "headroom-jquery": {
    "deps": [
      "jquery",
      "headroom"
    ]
  },
  "highlight-julia-repl": {
    "deps": [
      "highlight"
    ]
  }
}
});
////////////////////////////////////////////////////////////////////////////////
require(['jquery', 'katex', 'katex-auto-render'], function($, katex, renderMathInElement) {
$(document).ready(function() {
  renderMathInElement(
    document.body,
    {
  "delimiters": [
    {
      "left": "$",
      "right": "$",
      "display": false
    },
    {
      "left": "$$",
      "right": "$$",
      "display": true
    },
    {
      "left": "\\[",
      "right": "\\]",
      "display": true
    }
  ]
}

  );
})

})
////////////////////////////////////////////////////////////////////////////////
require(['jquery', 'highlight', 'highlight-julia', 'highlight-julia-repl', 'highlight-yaml'], function($) {
$(document).ready(function() {
    hljs.highlightAll();
})

})
////////////////////////////////////////////////////////////////////////////////
require(['jquery'], function($) {

let timer = 0;
var isExpanded = true;

$(document).on("click", ".docstring header", function () {
  let articleToggleTitle = "Expand docstring";

  debounce(() => {
    if ($(this).siblings("section").is(":visible")) {
      $(this)
        .find(".docstring-article-toggle-button")
        .removeClass("fa-chevron-down")
        .addClass("fa-chevron-right");
    } else {
      $(this)
        .find(".docstring-article-toggle-button")
        .removeClass("fa-chevron-right")
        .addClass("fa-chevron-down");

      articleToggleTitle = "Collapse docstring";
    }

    $(this)
      .find(".docstring-article-toggle-button")
      .prop("title", articleToggleTitle);
    $(this).siblings("section").slideToggle();
  });
});

$(document).on("click", ".docs-article-toggle-button", function (event) {
  let articleToggleTitle = "Expand docstring";
  let navArticleToggleTitle = "Expand all docstrings";
  let animationSpeed = event.noToggleAnimation ? 0 : 400;

  debounce(() => {
    if (isExpanded) {
      $(this).removeClass("fa-chevron-up").addClass("fa-chevron-down");
      $(".docstring-article-toggle-button")
        .removeClass("fa-chevron-down")
        .addClass("fa-chevron-right");

      isExpanded = false;

      $(".docstring section").slideUp(animationSpeed);
    } else {
      $(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
      $(".docstring-article-toggle-button")
        .removeClass("fa-chevron-right")
        .addClass("fa-chevron-down");

      isExpanded = true;
      articleToggleTitle = "Collapse docstring";
      navArticleToggleTitle = "Collapse all docstrings";

      $(".docstring section").slideDown(animationSpeed);
    }

    $(this).prop("title", navArticleToggleTitle);
    $(".docstring-article-toggle-button").prop("title", articleToggleTitle);
  });
});

function debounce(callback, timeout = 300) {
  if (Date.now() - timer > timeout) {
    callback();
  }

  clearTimeout(timer);

  timer = Date.now();
}

})
////////////////////////////////////////////////////////////////////////////////
require([], function() {
function addCopyButtonCallbacks() {
  for (const el of document.getElementsByTagName("pre")) {
    const button = document.createElement("button");
    button.classList.add("copy-button", "fa-solid", "fa-copy");
    button.setAttribute("aria-label", "Copy this code block");
    button.setAttribute("title", "Copy");

    el.appendChild(button);

    const success = function () {
      button.classList.add("success", "fa-check");
      button.classList.remove("fa-copy");
    };

    const failure = function () {
      button.classList.add("error", "fa-xmark");
      button.classList.remove("fa-copy");
    };

    button.addEventListener("click", function () {
      copyToClipboard(el.innerText).then(success, failure);

      setTimeout(function () {
        button.classList.add("fa-copy");
        button.classList.remove("success", "fa-check", "fa-xmark");
      }, 5000);
    });
  }
}

function copyToClipboard(text) {
  // clipboard API is only available in secure contexts
  if (window.navigator && window.navigator.clipboard) {
    return window.navigator.clipboard.writeText(text);
  } else {
    return new Promise(function (resolve, reject) {
      try {
        const el = document.createElement("textarea");
        el.textContent = text;
        el.style.position = "fixed";
        el.style.opacity = 0;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");

        resolve();
      } catch (err) {
        reject(err);
      } finally {
        document.body.removeChild(el);
      }
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", addCopyButtonCallbacks);
} else {
  addCopyButtonCallbacks();
}

})
////////////////////////////////////////////////////////////////////////////////
require(['jquery', 'headroom', 'headroom-jquery'], function($, Headroom) {

// Manages the top navigation bar (hides it when the user starts scrolling down on the
// mobile).
window.Headroom = Headroom; // work around buggy module loading?
$(document).ready(function () {
  $("#documenter .docs-navbar").headroom({
    tolerance: { up: 10, down: 10 },
  });
});

})
////////////////////////////////////////////////////////////////////////////////
require(['jquery'], function($) {

let meta = $("div[data-docstringscollapsed]").data();

if (meta.docstringscollapsed) {
  $("#documenter-article-toggle-button").trigger({
    type: "click",
    noToggleAnimation: true,
  });
}

})
////////////////////////////////////////////////////////////////////////////////
require(['jquery', 'minisearch'], function($, minisearch) {

// In general, most search related things will have "search" as a prefix.
// To get an in-depth about the thought process you can refer: https://hetarth02.hashnode.dev/series/gsoc

let results = [];
let timer = undefined;

let data = documenterSearchIndex["docs"].map((x, key) => {
  x["id"] = key; // minisearch requires a unique for each object
  return x;
});

// list below is the lunr 2.1.3 list minus the intersect with names(Base)
// (all, any, get, in, is, only, which) and (do, else, for, let, where, while, with)
// ideally we'd just filter the original list but it's not available as a variable
const stopWords = new Set([
  "a",
  "able",
  "about",
  "across",
  "after",
  "almost",
  "also",
  "am",
  "among",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "because",
  "been",
  "but",
  "by",
  "can",
  "cannot",
  "could",
  "dear",
  "did",
  "does",
  "either",
  "ever",
  "every",
  "from",
  "got",
  "had",
  "has",
  "have",
  "he",
  "her",
  "hers",
  "him",
  "his",
  "how",
  "however",
  "i",
  "if",
  "into",
  "it",
  "its",
  "just",
  "least",
  "like",
  "likely",
  "may",
  "me",
  "might",
  "most",
  "must",
  "my",
  "neither",
  "no",
  "nor",
  "not",
  "of",
  "off",
  "often",
  "on",
  "or",
  "other",
  "our",
  "own",
  "rather",
  "said",
  "say",
  "says",
  "she",
  "should",
  "since",
  "so",
  "some",
  "than",
  "that",
  "the",
  "their",
  "them",
  "then",
  "there",
  "these",
  "they",
  "this",
  "tis",
  "to",
  "too",
  "twas",
  "us",
  "wants",
  "was",
  "we",
  "were",
  "what",
  "when",
  "who",
  "whom",
  "why",
  "will",
  "would",
  "yet",
  "you",
  "your",
]);

let index = new minisearch({
  fields: ["title", "text"], // fields to index for full-text search
  storeFields: ["location", "title", "text", "category", "page"], // fields to return with search results
  processTerm: (term) => {
    let word = stopWords.has(term) ? null : term;
    if (word) {
      // custom trimmer that doesn't strip @ and !, which are used in julia macro and function names
      word = word
        .replace(/^[^a-zA-Z0-9@!]+/, "")
        .replace(/[^a-zA-Z0-9@!]+$/, "");
    }

    return word ?? null;
  },
  // add . as a separator, because otherwise "title": "Documenter.Anchors.add!", would not find anything if searching for "add!", only for the entire qualification
  tokenize: (string) => string.split(/[\s\-\.]+/),
  // options which will be applied during the search
  searchOptions: {
    prefix: true,
    boost: { title: 100 },
    fuzzy: 2,
    processTerm: (term) => {
      let word = stopWords.has(term) ? null : term;
      if (word) {
        word = word
          .replace(/^[^a-zA-Z0-9@!]+/, "")
          .replace(/[^a-zA-Z0-9@!]+$/, "");
      }

      return word ?? null;
    },
    tokenize: (string) => string.split(/[\s\-\.]+/),
  },
});

index.addAll(data);

let filters = [...new Set(data.map((x) => x.category))];
var modal_filters = make_modal_body_filters(filters);
var filter_results = [];

$(document).on("keyup", ".documenter-search-input", function (event) {
  // Adding a debounce to prevent disruptions from super-speed typing!
  debounce(() => update_search(filter_results), 300);
});

$(document).on("click", ".search-filter", function () {
  if ($(this).hasClass("search-filter-selected")) {
    $(this).removeClass("search-filter-selected");
  } else {
    $(this).addClass("search-filter-selected");
  }

  // Adding a debounce to prevent disruptions from crazy clicking!
  debounce(() => get_filters(), 300);
});

/**
 * A debounce function, takes a function and an optional timeout in milliseconds
 *
 * @function callback
 * @param {number} timeout
 */
function debounce(callback, timeout = 300) {
  clearTimeout(timer);
  timer = setTimeout(callback, timeout);
}

/**
 * Make/Update the search component
 *
 * @param {string[]} selected_filters
 */
function update_search(selected_filters = []) {
  let initial_search_body = `
      <div class="has-text-centered my-5 py-5">Type something to get started!</div>
    `;

  let querystring = $(".documenter-search-input").val();

  if (querystring.trim()) {
    results = index.search(querystring, {
      filter: (result) => {
        // Filtering results
        if (selected_filters.length === 0) {
          return result.score >= 1;
        } else {
          return (
            result.score >= 1 && selected_filters.includes(result.category)
          );
        }
      },
    });

    let search_result_container = ``;
    let search_divider = `<div class="search-divider w-100"></div>`;

    if (results.length) {
      let links = [];
      let count = 0;
      let search_results = "";

      results.forEach(function (result) {
        if (result.location) {
          // Checking for duplication of results for the same page
          if (!links.includes(result.location)) {
            search_results += make_search_result(result, querystring);
            count++;
          }

          links.push(result.location);
        }
      });

      let result_count = `<div class="is-size-6">${count} result(s)</div>`;

      search_result_container = `
            <div class="is-flex is-flex-direction-column gap-2 is-align-items-flex-start">
                ${modal_filters}
                ${search_divider}
                ${result_count}
                <div class="is-clipped w-100 is-flex is-flex-direction-column gap-2 is-align-items-flex-start has-text-justified mt-1">
                  ${search_results}
                </div>
            </div>
        `;
    } else {
      search_result_container = `
           <div class="is-flex is-flex-direction-column gap-2 is-align-items-flex-start">
               ${modal_filters}
               ${search_divider}
               <div class="is-size-6">0 result(s)</div>
            </div>
            <div class="has-text-centered my-5 py-5">No result found!</div>
       `;
    }

    if ($(".search-modal-card-body").hasClass("is-justify-content-center")) {
      $(".search-modal-card-body").removeClass("is-justify-content-center");
    }

    $(".search-modal-card-body").html(search_result_container);
  } else {
    filter_results = [];
    modal_filters = make_modal_body_filters(filters, filter_results);

    if (!$(".search-modal-card-body").hasClass("is-justify-content-center")) {
      $(".search-modal-card-body").addClass("is-justify-content-center");
    }

    $(".search-modal-card-body").html(initial_search_body);
  }
}

/**
 * Make the modal filter html
 *
 * @param {string[]} filters
 * @param {string[]} selected_filters
 * @returns string
 */
function make_modal_body_filters(filters, selected_filters = []) {
  let str = ``;

  filters.forEach((val) => {
    if (selected_filters.includes(val)) {
      str += `<a href="javascript:;" class="search-filter search-filter-selected"><span>${val}</span></a>`;
    } else {
      str += `<a href="javascript:;" class="search-filter"><span>${val}</span></a>`;
    }
  });

  let filter_html = `
        <div class="is-flex gap-2 is-flex-wrap-wrap is-justify-content-flex-start is-align-items-center search-filters">
            <span class="is-size-6">Filters:</span>
            ${str}
        </div>
    `;

  return filter_html;
}

/**
 * Make the result component given a minisearch result data object and the value of the search input as queryString.
 * To view the result object structure, refer: https://lucaong.github.io/minisearch/modules/_minisearch_.html#searchresult
 *
 * @param {object} result
 * @param {string} querystring
 * @returns string
 */
function make_search_result(result, querystring) {
  let search_divider = `<div class="search-divider w-100"></div>`;
  let display_link =
    result.location.slice(Math.max(0), Math.min(50, result.location.length)) +
    (result.location.length > 30 ? "..." : ""); // To cut-off the link because it messes with the overflow of the whole div

  if (result.page !== "") {
    display_link += ` (${result.page})`;
  }

  let textindex = new RegExp(`${querystring}`, "i").exec(result.text);
  let text =
    textindex !== null
      ? result.text.slice(
          Math.max(textindex.index - 100, 0),
          Math.min(
            textindex.index + querystring.length + 100,
            result.text.length
          )
        )
      : ""; // cut-off text before and after from the match

  let display_result = text.length
    ? "..." +
      text.replace(
        new RegExp(`${querystring}`, "i"), // For first occurrence
        '<span class="search-result-highlight py-1">$&</span>'
      ) +
      "..."
    : ""; // highlights the match

  let in_code = false;
  if (!["page", "section"].includes(result.category.toLowerCase())) {
    in_code = true;
  }

  // We encode the full url to escape some special characters which can lead to broken links
  let result_div = `
      <a href="${encodeURI(
        documenterBaseURL + "/" + result.location
      )}" class="search-result-link w-100 is-flex is-flex-direction-column gap-2 px-4 py-2">
        <div class="w-100 is-flex is-flex-wrap-wrap is-justify-content-space-between is-align-items-flex-start">
          <div class="search-result-title has-text-weight-bold ${
            in_code ? "search-result-code-title" : ""
          }">${result.title}</div>
          <div class="property-search-result-badge">${result.category}</div>
        </div>
        <p>
          ${display_result}
        </p>
        <div
          class="has-text-left"
          style="font-size: smaller;"
          title="${result.location}"
        >
          <i class="fas fa-link"></i> ${display_link}
        </div>
      </a>
      ${search_divider}
    `;

  return result_div;
}

/**
 * Get selected filters, remake the filter html and lastly update the search modal
 */
function get_filters() {
  let ele = $(".search-filters .search-filter-selected").get();
  filter_results = ele.map((x) => $(x).text().toLowerCase());
  modal_filters = make_modal_body_filters(filters, filter_results);
  update_search(filter_results);
}

})
////////////////////////////////////////////////////////////////////////////////
require(['jquery'], function($) {

// Modal settings dialog
$(document).ready(function () {
  var settings = $("#documenter-settings");
  $("#documenter-settings-button").click(function () {
    settings.toggleClass("is-active");
  });
  // Close the dialog if X is clicked
  $("#documenter-settings button.delete").click(function () {
    settings.removeClass("is-active");
  });
  // Close dialog if ESC is pressed
  $(document).keyup(function (e) {
    if (e.keyCode == 27) settings.removeClass("is-active");
  });
});

})
////////////////////////////////////////////////////////////////////////////////
require(['jquery'], function($) {

let search_modal_header = `
  <header class="modal-card-head gap-2 is-align-items-center is-justify-content-space-between w-100 px-3">
    <div class="field mb-0 w-100">
      <p class="control has-icons-right">
        <input class="input documenter-search-input" type="text" placeholder="Search" />
        <span class="icon is-small is-right has-text-primary-dark">
          <i class="fas fa-magnifying-glass"></i>
        </span>
      </p>
    </div>
    <div class="icon is-size-4 is-clickable close-search-modal">
      <i class="fas fa-times"></i>
    </div>
  </header>
`;

let initial_search_body = `
  <div class="has-text-centered my-5 py-5">Type something to get started!</div>
`;

let search_modal_footer = `
  <footer class="modal-card-foot">
    <span>
      <kbd class="search-modal-key-hints">Ctrl</kbd> +
      <kbd class="search-modal-key-hints">/</kbd> to search
    </span>
    <span class="ml-3"> <kbd class="search-modal-key-hints">esc</kbd> to close </span>
  </footer>
`;

$(document.body).append(
  `
    <div class="modal" id="search-modal">
      <div class="modal-background"></div>
      <div class="modal-card search-min-width-50 search-min-height-100 is-justify-content-center">
        ${search_modal_header}
        <section class="modal-card-body is-flex is-flex-direction-column is-justify-content-center gap-4 search-modal-card-body">
          ${initial_search_body}
        </section>
        ${search_modal_footer}
      </div>
    </div>
  `
);

document.querySelector(".docs-search-query").addEventListener("click", () => {
  openModal();
});

document.querySelector(".close-search-modal").addEventListener("click", () => {
  closeModal();
});

$(document).on("click", ".search-result-link", function () {
  closeModal();
});

document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === "/") {
    openModal();
  } else if (event.key === "Escape") {
    closeModal();
  }

  return false;
});

// Functions to open and close a modal
function openModal() {
  let searchModal = document.querySelector("#search-modal");

  searchModal.classList.add("is-active");
  document.querySelector(".documenter-search-input").focus();
}

function closeModal() {
  let searchModal = document.querySelector("#search-modal");
  let initial_search_body = `
    <div class="has-text-centered my-5 py-5">Type something to get started!</div>
  `;

  searchModal.classList.remove("is-active");
  document.querySelector(".documenter-search-input").blur();

  if (!$(".search-modal-card-body").hasClass("is-justify-content-center")) {
    $(".search-modal-card-body").addClass("is-justify-content-center");
  }

  $(".documenter-search-input").val("");
  $(".search-modal-card-body").html(initial_search_body);
}

document
  .querySelector("#search-modal .modal-background")
  .addEventListener("click", () => {
    closeModal();
  });

})
////////////////////////////////////////////////////////////////////////////////
require(['jquery'], function($) {

// Manages the showing and hiding of the sidebar.
$(document).ready(function () {
  var sidebar = $("#documenter > .docs-sidebar");
  var sidebar_button = $("#documenter-sidebar-button");
  sidebar_button.click(function (ev) {
    ev.preventDefault();
    sidebar.toggleClass("visible");
    if (sidebar.hasClass("visible")) {
      // Makes sure that the current menu item is visible in the sidebar.
      $("#documenter .docs-menu a.is-active").focus();
    }
  });
  $("#documenter > .docs-main").bind("click", function (ev) {
    if ($(ev.target).is(sidebar_button)) {
      return;
    }
    if (sidebar.hasClass("visible")) {
      sidebar.removeClass("visible");
    }
  });
});

// Resizes the package name / sitename in the sidebar if it is too wide.
// Inspired by: https://github.com/davatron5000/FitText.js
$(document).ready(function () {
  e = $("#documenter .docs-autofit");
  function resize() {
    var L = parseInt(e.css("max-width"), 10);
    var L0 = e.width();
    if (L0 > L) {
      var h0 = parseInt(e.css("font-size"), 10);
      e.css("font-size", (L * h0) / L0);
      // TODO: make sure it survives resizes?
    }
  }
  // call once and then register events
  resize();
  $(window).resize(resize);
  $(window).on("orientationchange", resize);
});

// Scroll the navigation bar to the currently selected menu item
$(document).ready(function () {
  var sidebar = $("#documenter .docs-menu").get(0);
  var active = $("#documenter .docs-menu .is-active").get(0);
  if (typeof active !== "undefined") {
    sidebar.scrollTop = active.offsetTop - sidebar.offsetTop - 15;
  }
});

})
////////////////////////////////////////////////////////////////////////////////
require(['jquery'], function($) {

// Theme picker setup
$(document).ready(function () {
  // onchange callback
  $("#documenter-themepicker").change(function themepick_callback(ev) {
    var themename = $("#documenter-themepicker option:selected").attr("value");
    if (themename === "auto") {
      // set_theme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      window.localStorage.removeItem("documenter-theme");
    } else {
      // set_theme(themename);
      window.localStorage.setItem("documenter-theme", themename);
    }
    // We re-use the global function from themeswap.js to actually do the swapping.
    set_theme_from_local_storage();
  });

  // Make sure that the themepicker displays the correct theme when the theme is retrieved
  // from localStorage
  if (typeof window.localStorage !== "undefined") {
    var theme = window.localStorage.getItem("documenter-theme");
    if (theme !== null) {
      $("#documenter-themepicker option").each(function (i, e) {
        e.selected = e.value === theme;
      });
    }
  }
});

})
////////////////////////////////////////////////////////////////////////////////
require(['jquery'], function($) {

// update the version selector with info from the siteinfo.js and ../versions.js files
$(document).ready(function () {
  // If the version selector is disabled with DOCUMENTER_VERSION_SELECTOR_DISABLED in the
  // siteinfo.js file, we just return immediately and not display the version selector.
  if (
    typeof DOCUMENTER_VERSION_SELECTOR_DISABLED === "boolean" &&
    DOCUMENTER_VERSION_SELECTOR_DISABLED
  ) {
    return;
  }

  var version_selector = $("#documenter .docs-version-selector");
  var version_selector_select = $("#documenter .docs-version-selector select");

  version_selector_select.change(function (x) {
    target_href = version_selector_select
      .children("option:selected")
      .get(0).value;
    window.location.href = target_href;
  });

  // add the current version to the selector based on siteinfo.js, but only if the selector is empty
  if (
    typeof DOCUMENTER_CURRENT_VERSION !== "undefined" &&
    $("#version-selector > option").length == 0
  ) {
    var option = $(
      "<option value='#' selected='selected'>" +
        DOCUMENTER_CURRENT_VERSION +
        "</option>"
    );
    version_selector_select.append(option);
  }

  if (typeof DOC_VERSIONS !== "undefined") {
    var existing_versions = version_selector_select.children("option");
    var existing_versions_texts = existing_versions.map(function (i, x) {
      return x.text;
    });
    DOC_VERSIONS.forEach(function (each) {
      var version_url = documenterBaseURL + "/../" + each + "/";
      var existing_id = $.inArray(each, existing_versions_texts);
      // if not already in the version selector, add it as a new option,
      // otherwise update the old option with the URL and enable it
      if (existing_id == -1) {
        var option = $(
          "<option value='" + version_url + "'>" + each + "</option>"
        );
        version_selector_select.append(option);
      } else {
        var option = existing_versions[existing_id];
        option.value = version_url;
        option.disabled = false;
      }
    });
  }

  // only show the version selector if the selector has been populated
  if (version_selector_select.children("option").length > 0) {
    version_selector.toggleClass("visible");
  }
});

})
