// Menu data
const menuData = {
  "hot-coffee": [
    { name: "Espresso", price: 4000 },
    { name: "Americano", price: 5000 },
    { name: "Cappuccino", price: 6000 },
    { name: "Latte", price: 6500 },
    { name: "Mocha", price: 7000 },
    { name: "Macchiato", price: 6500 },
    { name: "Hot Chocolate", price: 6000 },
    { name: "Chai Latte", price: 6500 },
    { name: "Turkish Coffee", price: 5500 },
  ],
  "iced-coffee": [
    { name: "Iced Fresh Milk", price: 5000 },
    { name: "Iced Matcha Latte", price: 7000 },
    { name: "Iced Honey Lemon Tea", price: 6000 },
    { name: "Iced Milk Cafein", price: 6000 },
    { name: "Iced Americano", price: 5500 },
    { name: "Iced Latte", price: 6500 },
    { name: "Iced Mocha", price: 7000 },
    { name: "Cold Brew", price: 6000 },
  ],
  frappe: [
    { name: "Coffee Frappe", price: 7500 },
    { name: "Chocolate Frappe", price: 8000 },
    { name: "Vanilla Frappe", price: 7500 },
    { name: "Caramel Frappe", price: 8000 },
    { name: "Strawberry Frappe", price: 8500 },
    { name: "Mango Frappe", price: 8500 },
    { name: "Oreo Frappe", price: 9000 },
    { name: "Green Tea Frappe", price: 8000 },
    { name: "Coconut Frappe", price: 8500 },
  ],
  "italian-soda": [
    { name: "Lemon Italian Soda", price: 4500 },
    { name: "Orange Italian Soda", price: 4500 },
    { name: "Strawberry Italian Soda", price: 5000 },
    { name: "Blue Curacao Italian Soda", price: 5500 },
    { name: "Passion Fruit Italian Soda", price: 5500 },
  ],
}

// DOM elements
const themeToggle = document.getElementById("themeToggle")
const mainNav = document.getElementById("mainNav")
const navMenu = document.getElementById("navMenu")
const menuGrid = document.getElementById("menuGrid")
const sectionTitle = document.getElementById("sectionTitle")
const categoryBtns = document.querySelectorAll(".category-btn")
const navLinks = document.querySelectorAll(".nav-link")
const sections = document.querySelectorAll(".section")
const categoryDropdownToggle = document.getElementById("categoryDropdownToggle")
const categoryDropdownMenu = document.getElementById("categoryDropdownMenu")
const categoryDropdownItems = document.querySelectorAll(".category-dropdown-item")

const navDropdownToggle = document.getElementById("navDropdownToggle")
const navDropdownMenu = document.getElementById("navDropdownMenu")
const navDropdownItems = document.querySelectorAll(".nav-dropdown-item")

const sidebarToggle = document.getElementById("sidebarToggle")
const sidebarMenu = document.getElementById("sidebarMenu")
const sidebarClose = document.getElementById("sidebarClose")
const sidebarOverlay = document.getElementById("sidebarOverlay")
const sidebarLinks = document.querySelectorAll(".sidebar-link")
const sidebarDropdownToggle = document.querySelector(".sidebar-dropdown-toggle")
const sidebarDropdownContent = document.querySelector(".sidebar-dropdown-content")
const sidebarDropdownItems = document.querySelectorAll(".sidebar-dropdown-item")

// State
let currentCategory = "all"
let currentSection = "home"

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  initializeTheme()
  filterMenuItems()
  setupEventListeners()
  handleScroll()
})

// Theme functionality
function initializeTheme() {
  const savedTheme = localStorage.getItem("theme") || "light"
  document.documentElement.setAttribute("data-theme", savedTheme)
  updateThemeIcon(savedTheme)
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  document.documentElement.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)
  updateThemeIcon(newTheme)
}

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector("i")
  icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon"
}

// Event listeners
function setupEventListeners() {
  themeToggle.addEventListener("click", toggleTheme)

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const section = this.getAttribute("data-section")
      showSection(section)
    })
  })

  if (navDropdownToggle) {
    navDropdownToggle.addEventListener("click", () => {
      const isActive = navDropdownMenu.classList.contains("active")
      if (isActive) {
        closeNavDropdown()
      } else {
        openNavDropdown()
      }
    })
  }

  navDropdownItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault()
      const section = this.getAttribute("data-section")
      showSection(section)
      updateNavDropdownText(section)
      closeNavDropdown()
    })
  })

  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", openSidebar)
  }

  if (sidebarClose) {
    sidebarClose.addEventListener("click", closeSidebar)
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", closeSidebar)
  }

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const section = this.getAttribute("data-section")
      showSection(section)
      closeSidebar()
    })
  })

  if (sidebarDropdownToggle) {
    sidebarDropdownToggle.addEventListener("click", () => {
      const isActive = sidebarDropdownContent.classList.contains("active")
      if (isActive) {
        closeSidebarDropdown()
      } else {
        openSidebarDropdown()
      }
    })
  }

  sidebarDropdownItems.forEach((item) => {
    item.addEventListener("click", function () {
      const category = this.getAttribute("data-category")
      setActiveCategory(category)
      closeSidebar()
    })
  })

  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const category = this.getAttribute("data-category")
      setActiveCategory(category)
      scrollCategoryToLeft(this)
    })
  })

  if (categoryDropdownToggle) {
    categoryDropdownToggle.addEventListener("click", () => {
      const isActive = categoryDropdownMenu.classList.contains("active")
      if (isActive) {
        closeCategoryDropdown()
      } else {
        openCategoryDropdown()
      }
    })
  }

  categoryDropdownItems.forEach((item) => {
    item.addEventListener("click", function () {
      const category = this.getAttribute("data-category")
      setActiveCategory(category)
      updateDropdownText(category)
      closeCategoryDropdown()
    })
  })

  window.addEventListener("scroll", handleScroll)

  document.addEventListener("click", (e) => {
    if (
      navDropdownToggle &&
      navDropdownMenu &&
      !navDropdownToggle.contains(e.target) &&
      !navDropdownMenu.contains(e.target)
    ) {
      closeNavDropdown()
    }
    if (
      categoryDropdownToggle &&
      categoryDropdownMenu &&
      !categoryDropdownToggle.contains(e.target) &&
      !categoryDropdownMenu.contains(e.target)
    ) {
      closeCategoryDropdown()
    }
  })

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeNavDropdown()
      closeCategoryDropdown()
      closeSidebar()
    }
  })
}

function openSidebar() {
  if (sidebarMenu && sidebarOverlay) {
    sidebarMenu.classList.add("active")
    sidebarOverlay.classList.add("active")
    document.body.style.overflow = "hidden"
  }
}

function closeSidebar() {
  if (sidebarMenu && sidebarOverlay) {
    sidebarMenu.classList.remove("active")
    sidebarOverlay.classList.remove("active")
    document.body.style.overflow = ""
    closeSidebarDropdown()
  }
}

function openSidebarDropdown() {
  if (sidebarDropdownContent && sidebarDropdownToggle) {
    sidebarDropdownContent.classList.add("active")
    sidebarDropdownToggle.classList.add("active")
  }
}

function closeSidebarDropdown() {
  if (sidebarDropdownContent && sidebarDropdownToggle) {
    sidebarDropdownContent.classList.remove("active")
    sidebarDropdownToggle.classList.remove("active")
  }
}

function openNavDropdown() {
  if (navDropdownMenu && navDropdownToggle) {
    navDropdownMenu.classList.add("active")
    navDropdownToggle.classList.add("active")
  }
}

function closeNavDropdown() {
  if (navDropdownMenu && navDropdownToggle) {
    navDropdownMenu.classList.remove("active")
    navDropdownToggle.classList.remove("active")
  }
}

function updateNavDropdownText(section) {
  const titles = {
    home: "Home",
    about: "About Us",
    contact: "Contact",
  }

  if (navDropdownToggle) {
    const dropdownText = navDropdownToggle.querySelector(".dropdown-text")
    if (dropdownText) {
      dropdownText.textContent = titles[section] || "Menu"
    }
  }

  // Update active dropdown item
  navDropdownItems.forEach((item) => {
    item.classList.remove("active")
    if (item.getAttribute("data-section") === section) {
      item.classList.add("active")
    }
  })
}

function openCategoryDropdown() {
  if (categoryDropdownMenu && categoryDropdownToggle) {
    categoryDropdownMenu.classList.add("active")
    categoryDropdownToggle.classList.add("active")
  }
}

function closeCategoryDropdown() {
  if (categoryDropdownMenu && categoryDropdownToggle) {
    categoryDropdownMenu.classList.remove("active")
    categoryDropdownToggle.classList.remove("active")
  }
}

function updateDropdownText(category) {
  const titles = {
    all: "All Categories",
    "hot-coffee": "Hot Coffee",
    "iced-coffee": "Iced Coffee",
    frappe: "Frappe",
    "italian-soda": "Italian Soda",
  }

  if (categoryDropdownToggle) {
    const dropdownText = categoryDropdownToggle.querySelector(".dropdown-text")
    if (dropdownText) {
      dropdownText.textContent = titles[category] || "All Categories"
    }
  }

  // Update active dropdown item
  categoryDropdownItems.forEach((item) => {
    item.classList.remove("active")
    if (item.getAttribute("data-category") === category) {
      item.classList.add("active")
    }
  })
}

function scrollCategoryToLeft(activeBtn) {
  const categoryNav = document.querySelector(".nav-categories")
  if (categoryNav && window.innerWidth <= 768) {
    const btnRect = activeBtn.getBoundingClientRect()
    const navRect = categoryNav.getBoundingClientRect()
    const scrollLeft = activeBtn.offsetLeft - navRect.width / 2 + btnRect.width / 2
    categoryNav.scrollTo({
      left: scrollLeft,
      behavior: "smooth",
    })
  }
}

// Category management
function setActiveCategory(category) {
  currentCategory = category

  // Update active button
  categoryBtns.forEach((btn) => {
    btn.classList.remove("active")
    if (btn.getAttribute("data-category") === category) {
      btn.classList.add("active")
    }
  })

  sidebarDropdownItems.forEach((item) => {
    item.classList.remove("active")
    if (item.getAttribute("data-category") === category) {
      item.classList.add("active")
    }
  })

  updateDropdownText(category)

  // Update section title
  const titles = {
    all: "All Items",
    "hot-coffee": "Hot Coffee",
    "iced-coffee": "Iced Coffee",
    frappe: "Frappe",
    "italian-soda": "Italian Soda",
  }
  sectionTitle.textContent = titles[category]

  filterMenuItems()
}

function filterMenuItems() {
  const menuItems = document.querySelectorAll(".menu-item")

  menuItems.forEach((item) => {
    const itemCategory = item.getAttribute("data-category")

    if (currentCategory === "all" || itemCategory === currentCategory) {
      item.style.display = "block"
      item.classList.add("fade-in")
    } else {
      item.style.display = "none"
      item.classList.remove("fade-in")
    }
  })
}

// Utility function to format currency
function formatCurrency(amount) {
  return `៛${amount.toLocaleString()}`
}

function showSection(sectionName) {
  currentSection = sectionName

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("data-section") === sectionName) {
      link.classList.add("active")
    }
  })

  navDropdownItems.forEach((item) => {
    item.classList.remove("active")
    if (item.getAttribute("data-section") === sectionName) {
      item.classList.add("active")
    }
  })

  sidebarLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("data-section") === sectionName) {
      link.classList.add("active")
    }
  })

  // Update dropdown text
  updateNavDropdownText(sectionName)

  // Show/hide sections
  sections.forEach((section) => {
    section.classList.remove("active")
    if (section.id === sectionName) {
      section.classList.add("active")
    }
  })

  // Show category navigation only on home section
  const categoryNav = document.getElementById("categoryNav")
  if (categoryNav) {
    categoryNav.style.display = sectionName === "home" ? "block" : "none"
  }
}

function handleScroll() {
  if (window.scrollY > 50) {
    mainNav.classList.add("scrolled")
  } else {
    mainNav.classList.remove("scrolled")
  }
}
