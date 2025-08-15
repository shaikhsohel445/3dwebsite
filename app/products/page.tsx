"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Search, Filter, Eye, Star, MapPin, Calendar, Package, TrendingUp, ArrowLeft, Sparkles } from "lucide-react"

interface Product {
  id: number
  name: string
  category: string
  country: string
  price: number
  rating: number
  season: string
  description: string
  aiInsights: string
  color: string
  shape: string
}

const products: Product[] = [
  {
    id: 1,
    name: "Premium Mangoes",
    category: "Tropical Fruits",
    country: "India",
    price: 4.5,
    rating: 4.8,
    season: "Summer",
    description: "Sweet, juicy mangoes with exceptional flavor profile",
    aiInsights: "High demand predicted for Q3. Optimal shipping temperature: 13°C",
    color: "#FFA500",
    shape: "oval",
  },
  {
    id: 2,
    name: "Dragon Fruit",
    category: "Exotic Fruits",
    country: "Vietnam",
    price: 8.2,
    rating: 4.6,
    season: "Year-round",
    description: "Exotic dragon fruit with vibrant appearance and mild taste",
    aiInsights: "Growing market trend. 35% increase in demand over last quarter",
    color: "#FF1493",
    shape: "oval",
  },
  {
    id: 3,
    name: "Organic Avocados",
    category: "Healthy Fruits",
    country: "Mexico",
    price: 6.8,
    rating: 4.9,
    season: "Year-round",
    description: "Creamy, nutrient-rich organic avocados",
    aiInsights: "Premium segment showing 28% growth. Sustainable packaging preferred",
    color: "#228B22",
    shape: "pear",
  },
  {
    id: 4,
    name: "Golden Pineapples",
    category: "Tropical Fruits",
    country: "Costa Rica",
    price: 3.2,
    rating: 4.7,
    season: "Year-round",
    description: "Sweet golden pineapples with perfect ripeness",
    aiInsights: "Stable demand. Recommend bulk orders for better margins",
    color: "#FFD700",
    shape: "cylinder",
  },
  {
    id: 5,
    name: "Premium Berries",
    category: "Berries",
    country: "Chile",
    price: 12.5,
    rating: 4.8,
    season: "Winter",
    description: "Mixed premium berries with antioxidant properties",
    aiInsights: "Peak season approaching. 45% price increase expected",
    color: "#8B0000",
    shape: "sphere",
  },
  {
    id: 6,
    name: "Exotic Kiwis",
    category: "Exotic Fruits",
    country: "New Zealand",
    price: 5.4,
    rating: 4.5,
    season: "Spring",
    description: "Tangy kiwis rich in vitamin C and fiber",
    aiInsights: "Health trend driving demand. Target wellness market segment",
    color: "#9ACD32",
    shape: "oval",
  },
]

function Product3DViewer({ product, isOpen }: { product: Product; isOpen: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen || !mountRef.current) return

    const loadThreeJS = async () => {
      const THREE = await import("three")

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

      const container = mountRef.current!
      const size = Math.min(container.clientWidth, container.clientHeight, 400)
      renderer.setSize(size, size)
      renderer.setClearColor(0x000000, 0)
      container.appendChild(renderer.domElement)

      // Create 3D product based on shape
      let geometry
      switch (product.shape) {
        case "sphere":
          geometry = new THREE.SphereGeometry(1.5, 32, 32)
          break
        case "oval":
          geometry = new THREE.SphereGeometry(1.5, 32, 32)
          geometry.scale(1, 0.8, 1.2)
          break
        case "pear":
          geometry = new THREE.SphereGeometry(1.5, 32, 32)
          geometry.scale(0.8, 1.2, 0.8)
          break
        case "cylinder":
          geometry = new THREE.CylinderGeometry(1, 1.2, 2, 32)
          break
        default:
          geometry = new THREE.SphereGeometry(1.5, 32, 32)
      }

      const material = new THREE.MeshPhongMaterial({
        color: product.color,
        shininess: 100,
        transparent: true,
        opacity: 0.9,
      })

      const productMesh = new THREE.Mesh(geometry, material)
      scene.add(productMesh)

      // Add wireframe overlay
      const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.1,
      })
      const wireframe = new THREE.Mesh(geometry.clone(), wireframeMaterial)
      wireframe.scale.multiplyScalar(1.01)
      scene.add(wireframe)

      // Lighting
      const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
      scene.add(ambientLight)

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
      directionalLight.position.set(5, 5, 5)
      scene.add(directionalLight)

      const pointLight = new THREE.PointLight(0x60a5fa, 0.5)
      pointLight.position.set(-5, 5, 5)
      scene.add(pointLight)

      camera.position.z = 4

      // Animation
      const animate = () => {
        requestAnimationFrame(animate)
        productMesh.rotation.y += 0.01
        wireframe.rotation.y += 0.005
        renderer.render(scene, camera)
      }

      animate()

      return () => {
        if (container && renderer.domElement) {
          container.removeChild(renderer.domElement)
        }
        renderer.dispose()
      }
    }

    loadThreeJS()
  }, [isOpen, product])

  return <div ref={mountRef} className="w-full h-96 flex items-center justify-center" />
}

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <Navigation />

      {/* Header */}
      <section className="pt-24 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4 mb-8">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-white hover:text-blue-400">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="text-center mb-12">
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-400/30 mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Curated Products
            </Badge>
            <h1 className="text-5xl font-bold text-white mb-4">
              Premium Global
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                {" "}
                Products
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our AI-selected premium products from verified suppliers worldwide. Each product is analyzed for
              quality, market trends, and optimal trading opportunities.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-black/20 border-white/20 text-white placeholder-gray-400"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "border-white/20 text-white hover:bg-white/10 bg-transparent"
                  }
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="bg-black/20 border-white/10 backdrop-blur-sm hover:bg-black/30 transition-all duration-300 group"
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-400/30">
                      {product.category}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm">{product.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-white text-xl">{product.name}</CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-gray-300">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{product.country}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{product.season}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-300 text-sm">{product.description}</p>

                  <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-blue-400" />
                      <span className="text-blue-400 font-semibold text-sm">AI Insights</span>
                    </div>
                    <p className="text-gray-300 text-xs">{product.aiInsights}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-2xl font-bold text-white">${product.price}</div>
                      <div className="text-gray-400 text-sm">per kg</div>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => setSelectedProduct(product)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          3D View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl bg-black/90 border-white/20 text-white">
                        <DialogHeader>
                          <DialogTitle className="text-2xl">{product.name}</DialogTitle>
                        </DialogHeader>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            {selectedProduct && (
                              <Product3DViewer product={selectedProduct} isOpen={selectedProduct.id === product.id} />
                            )}
                          </div>
                          <div className="space-y-4">
                            <div>
                              <h3 className="font-semibold mb-2">Product Details</h3>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Category:</span>
                                  <span>{product.category}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Origin:</span>
                                  <span>{product.country}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Season:</span>
                                  <span>{product.season}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Rating:</span>
                                  <span className="flex items-center">
                                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                                    {product.rating}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold mb-2">AI Market Analysis</h3>
                              <p className="text-sm text-gray-300">{product.aiInsights}</p>
                            </div>
                            <div className="pt-4">
                              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                <Package className="w-4 h-4 mr-2" />
                                Request Quote
                              </Button>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 text-lg">No products found matching your criteria</div>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All")
                }}
                className="mt-4 bg-blue-600 hover:bg-blue-700"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
