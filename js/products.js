// Product data
const products = [
  {
    id: 1,
    name: "Premium Mangoes",
    country: "India",
    season: "Summer",
    pricePerKg: "$3.50",
    pricePerCarton: "$84.00",
    image: "/placeholder.svg?height=200&width=300",
    description: "Sweet and juicy Alphonso mangoes from Maharashtra",
    specifications: {
      variety: "Alphonso",
      size: "Medium to Large",
      packaging: "24 pieces per carton",
      shelfLife: "7-10 days",
    },
  },
  {
    id: 2,
    name: "Dragon Fruit",
    country: "Vietnam",
    season: "Year-round",
    pricePerKg: "$4.20",
    pricePerCarton: "$100.80",
    image: "/placeholder.svg?height=200&width=300",
    description: "Exotic white-flesh dragon fruit with sweet flavor",
    specifications: {
      variety: "White Flesh",
      size: "300-500g each",
      packaging: "20 pieces per carton",
      shelfLife: "5-7 days",
    },
  },
  {
    id: 3,
    name: "Avocados",
    country: "Mexico",
    season: "Year-round",
    pricePerKg: "$2.80",
    pricePerCarton: "$67.20",
    image: "/placeholder.svg?height=200&width=300",
    description: "Creamy Hass avocados perfect for export",
    specifications: {
      variety: "Hass",
      size: "150-250g each",
      packaging: "24 pieces per carton",
      shelfLife: "10-14 days",
    },
  },
  {
    id: 4,
    name: "Kiwi Fruit",
    country: "New Zealand",
    season: "Spring",
    pricePerKg: "$3.90",
    pricePerCarton: "$93.60",
    image: "/placeholder.svg?height=200&width=300",
    description: "Sweet and tangy green kiwi fruit",
    specifications: {
      variety: "Hayward",
      size: "80-120g each",
      packaging: "30 pieces per carton",
      shelfLife: "14-21 days",
    },
  },
  {
    id: 5,
    name: "Passion Fruit",
    country: "Colombia",
    season: "Fall",
    pricePerKg: "$5.50",
    pricePerCarton: "$132.00",
    image: "/placeholder.svg?height=200&width=300",
    description: "Aromatic purple passion fruit with intense flavor",
    specifications: {
      variety: "Purple",
      size: "40-80g each",
      packaging: "48 pieces per carton",
      shelfLife: "7-10 days",
    },
  },
  {
    id: 6,
    name: "Pomegranates",
    country: "Turkey",
    season: "Fall",
    pricePerKg: "$4.80",
    pricePerCarton: "$115.20",
    image: "/placeholder.svg?height=200&width=300",
    description: "Ruby red pomegranates with sweet-tart flavor",
    specifications: {
      variety: "Wonderful",
      size: "250-400g each",
      packaging: "20 pieces per carton",
      shelfLife: "30-45 days",
    },
  },
]

// Initialize products
function initializeProducts() {
  renderProducts(products)
  setupFilters()
}

// Render products
function renderProducts(productsToRender) {
  const grid = document.getElementById("products-grid")
  grid.innerHTML = ""

  productsToRender.forEach((product) => {
    const productCard = createProductCard(product)
    grid.appendChild(productCard)
  })
}

// Create product card
function createProductCard(product) {
  const card = document.createElement("div")
  card.className = "product-card"
  card.onclick = () => openProductModal(product)

  card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-country">🌍 ${product.country}</p>
            <div class="product-details">
                <span>Season: ${product.season}</span>
                <span>Variety: ${product.specifications.variety}</span>
                <span>Size: ${product.specifications.size}</span>
                <span>Shelf Life: ${product.specifications.shelfLife}</span>
            </div>
            <div class="product-price">
                ${product.pricePerKg}/kg • ${product.pricePerCarton}/carton
            </div>
            <div class="product-actions">
                <button class="btn btn-primary btn-small" onclick="event.stopPropagation(); requestQuote('${product.name}')">
                    Request Quote
                </button>
                <button class="btn btn-secondary btn-small" onclick="event.stopPropagation(); openProductModal(${product.id})">
                    View Details
                </button>
            </div>
        </div>
    `

  return card
}

// Setup filters
function setupFilters() {
  const searchInput = document.getElementById("searchInput")
  const countryFilter = document.getElementById("countryFilter")
  const seasonFilter = document.getElementById("seasonFilter")

  // Populate country filter
  const countries = [...new Set(products.map((p) => p.country))]
  countries.forEach((country) => {
    const option = document.createElement("option")
    option.value = country
    option.textContent = country
    countryFilter.appendChild(option)
  })

  // Add event listeners
  searchInput.addEventListener("input", filterProducts)
  countryFilter.addEventListener("change", filterProducts)
  seasonFilter.addEventListener("change", filterProducts)
}

// Filter products
function filterProducts() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase()
  const selectedCountry = document.getElementById("countryFilter").value
  const selectedSeason = document.getElementById("seasonFilter").value

  const filtered = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm) || product.country.toLowerCase().includes(searchTerm)
    const matchesCountry = !selectedCountry || product.country === selectedCountry
    const matchesSeason = !selectedSeason || product.season === selectedSeason

    return matchesSearch && matchesCountry && matchesSeason
  })

  renderProducts(filtered)
}

// Open product modal
function openProductModal(productId) {
  const product = typeof productId === "object" ? productId : products.find((p) => p.id === productId)
  const modal = document.getElementById("productModal")
  const modalContent = document.getElementById("modalContent")

  modalContent.innerHTML = `
        <h2 style="color: #064e3b; margin-bottom: 1rem;">${product.name}</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
            <div>
                <img src="${product.image}" alt="${product.name}" style="width: 100%; border-radius: 0.5rem;">
            </div>
            <div>
                <p style="margin-bottom: 1rem;"><strong>Country:</strong> ${product.country}</p>
                <p style="margin-bottom: 1rem;"><strong>Season:</strong> ${product.season}</p>
                <p style="margin-bottom: 1rem;"><strong>Price per kg:</strong> ${product.pricePerKg}</p>
                <p style="margin-bottom: 1rem;"><strong>Price per carton:</strong> ${product.pricePerCarton}</p>
                <div style="margin-top: 2rem;">
                    <button class="btn btn-primary" onclick="requestQuote('${product.name}')">Request Quote</button>
                </div>
            </div>
        </div>
        <div>
            <h3 style="color: #064e3b; margin-bottom: 1rem;">Description</h3>
            <p style="margin-bottom: 2rem;">${product.description}</p>
            <h3 style="color: #064e3b; margin-bottom: 1rem;">Specifications</h3>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
                <p><strong>Variety:</strong> ${product.specifications.variety}</p>
                <p><strong>Size:</strong> ${product.specifications.size}</p>
                <p><strong>Packaging:</strong> ${product.specifications.packaging}</p>
                <p><strong>Shelf Life:</strong> ${product.specifications.shelfLife}</p>
            </div>
        </div>
    `

  modal.style.display = "block"
}

// Close modal
function closeModal() {
  document.getElementById("productModal").style.display = "none"
}

// Request quote
function requestQuote(productName) {
  const subject = `Quote Request for ${productName}`
  const body = `Hello,\n\nI would like to request a quote for ${productName}.\n\nPlease provide:\n- Pricing details\n- Minimum order quantity\n- Delivery timeline\n- Payment terms\n\nThank you!`

  window.location.href = `mailto:info@freshglobal.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeProducts)

// Modal event listeners
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("productModal")
  const closeBtn = document.querySelector(".modal-close")

  closeBtn.onclick = closeModal

  window.onclick = (event) => {
    if (event.target === modal) {
      closeModal()
    }
  }
})
