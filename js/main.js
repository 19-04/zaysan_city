(function ($) {
  "use strict";

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 90) {
      $(".nav-bar").addClass("nav-sticky");
      $(".carousel, .page-header").css("margin-top", "73px");
    } else {
      $(".nav-bar").removeClass("nav-sticky");
      $(".carousel, .page-header").css("margin-top", "0");
    }
  });

  // Dropdown on mouse hover
  $(document).ready(function () {
    function toggleNavbarMethod() {
      if ($(window).width() > 992) {
        $(".navbar .dropdown")
          .on("mouseover", function () {
            $(".dropdown-toggle", this).trigger("click");
          })
          .on("mouseout", function () {
            $(".dropdown-toggle", this).trigger("click").blur();
          });
      } else {
        $(".navbar .dropdown").off("mouseover").off("mouseout");
      }
    }
    toggleNavbarMethod();
    $(window).resize(toggleNavbarMethod);
  });

  // Testimonials carousel
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });

  // Blogs carousel
  $(".blog-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });

  // Portfolio isotope and filter
  var portfolioIsotope = $(".portfolio-container").isotope({
    itemSelector: ".portfolio-item",
    layoutMode: "fitRows",
  });

  $("#portfolio-flters li").on("click", function () {
    $("#portfolio-flters li").removeClass("filter-active");
    $(this).addClass("filter-active");

    portfolioIsotope.isotope({ filter: $(this).data("filter") });
  });
})(jQuery);

// supabase secret key
const SUPABASE_URL = "https://bpevroagkcuatzkxwois.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwZXZyb2Fna2N1YXR6a3h3b2lzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQwNTU0NjksImV4cCI6MTk5OTYzMTQ2OX0.duhhssa8ysMGvTC_JJzd-ynC_5QGijR2a6WvtsXP4XE";

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function validateInput(id, minLength, maxLength, errorMsg, isMinimum = false) {
  const input = document.getElementById(id);
  const error = document.getElementById(id + "-error");

  if (input.value.length < minLength || input.value.length > maxLength) {
    error.textContent = errorMsg;
    input.style.borderColor = "red";
  } else {
    error.textContent = "";
    input.style.borderColor = "";
  }
}

function validateEmailInput() {
  const email = document.getElementById("email");
  const error = document.getElementById("email-error");
  var re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!re.test(email.value)) {
    error.textContent = "Жарамды электрондық поштаны енгізіңіз";
    email.style.borderColor = "red";
  } else {
    error.textContent = "";
    email.style.borderColor = "";
  }
}

async function sendComment() {
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const recipient = document.getElementById("recipient");
  const comment = document.getElementById("comment");

  if (
    username.value.length > 20 ||
    email.value === "" ||
    !validateEmail(email.value) ||
    recipient.value.length > 20 ||
    comment.value.length < 5
  ) {
    alert("Жібермес бұрын қателерді түзетіңіз");
    return;
  }

  await _supabase
    .from("user_comment")
    .insert({
      user_name: username.value,
      email: email.value,
      recipient: recipient.value,
      comment: comment.value,
    })
    .then(() => {
      console.log("Save data Supabase success!");
      alert("Жіберілді");
    })
    .catch((error) => {
      console.error(error);
      alert("Жіберу кезінде қате орын алды. Қайталап көріңіз.");
    });
}

function validateEmail(email) {
  var re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

// window.onload = function() {
//     var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
//     var isInPWA = (window.matchMedia('(display-mode: standalone)').matches) || (window.navigator.standalone) || document.referrer.includes('android-app://');

//     if (isMobile && !isInPWA) {
//         var banner = document.getElementById('pwa-banner');
//         banner.style.display = 'block';
//     }
// }

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/zaysan_city/sw.js")
    .then(function (registration) {
      console.log("Service Worker 注册成功，范围是：", registration.scope);
    })
    .catch(function (err) {
      console.log("Service Worker 注册失败：", err);
    });
}

document.getElementById("close-button").addEventListener("click", function () {
  var banner = document.getElementById("pwa-banner");
  banner.style.display = "none";
});

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  console.log("beforeinstallprompt event fired");
  e.preventDefault();
  deferredPrompt = e;
  // Show the install banner only when beforeinstallprompt is fired
  // document.getElementById('pwa-banner').style.display = 'block';
});

document.getElementById("install-button").addEventListener("click", (e) => {
  console.log("Install button clicked");
  document.getElementById("pwa-banner").style.display = "none";
  if (deferredPrompt) {
    console.log("Prompting user");
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
      deferredPrompt = null;
    });
  } else {
    console.log("Deferred prompt is not available");
  }
});

const fetchData = async () => {
  const { data, error } = await _supabase.from("upload_news").select("*");

  if (error) {
    console.error("Error: ", error);
  } else {
    const newsList = document.querySelector(".news-list");
    data.forEach((item) => {
      let content = item.content;
      if (content.length > 30) {
        content = content.substring(0, 60) + "...";
      }

      const newsItem = document.createElement("div");
      newsItem.className = "news-item";
      newsItem.innerHTML = `
          <div class="news-inner">
            <img class="news-image" src="data:image/png;base64,${item.image}" alt="news image">
            <div class="news-content">
              <p class="news-description">${content}</p>
              <div class="news-date">Ұақыты: ${item.date_published}</div>
            </div>
          </div>
        `;
      newsList.appendChild(newsItem);
    });
  }
};

window.addEventListener("DOMContentLoaded", (event) => {
  fetchData();
});
