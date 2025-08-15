"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Globe, Cpu, Zap, TrendingUp, ArrowRight, Play, Sparkles } from "lucide-react"

export default function HomePage() {
  const globeRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const loadThreeJS = async () => {
      if (typeof window !== "undefined") {
        const THREE = await import("three")

        if (!globeRef.current) return

        // Scene setup
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

        const container = globeRef.current
        const size = Math.min(container.clientWidth, container.clientHeight)
        renderer.setSize(size, size)
        renderer.setClearColor(0x000000, 0)
        container.appendChild(renderer.domElement)

        // Enhanced Globe
        const geometry = new THREE.SphereGeometry(2, 64, 64)
        const material = new THREE.MeshPhongMaterial({
          color: 0x2563eb,
          transparent: true,
          opacity: 0.8,
          wireframe: false,
        })
        const globe = new THREE.Mesh(geometry, material)
        scene.add(globe)

        // Wireframe overlay
        const wireframeGeometry = new THREE.SphereGeometry(2.01, 32, 32)
        const wireframeMaterial = new THREE.MeshBasicMaterial({
          color: 0x60a5fa,
          wireframe: true,
          transparent: true,
          opacity: 0.3,
        })
        const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial)
        scene.add(wireframe)

        // AI Data Points
        const pointsGeometry = new THREE.BufferGeometry()
        const pointsCount = 200
        const positions = new Float32Array(pointsCount * 3)

        for (let i = 0; i < pointsCount; i++) {
          const phi = Math.acos(-1 + (2 * i) / pointsCount)
          const theta = Math.sqrt(pointsCount * Math.PI) * phi

          positions[i * 3] = 2.1 * Math.cos(theta) * Math.sin(phi)
          positions[i * 3 + 1] = 2.1 * Math.sin(theta) * Math.sin(phi)
          positions[i * 3 + 2] = 2.1 * Math.cos(phi)
        }

        pointsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
        const pointsMaterial = new THREE.PointsMaterial({
          color: 0x10b981,
          size: 0.05,
          transparent: true,
          opacity: 0.8,
        })
        const points = new THREE.Points(pointsGeometry, pointsMaterial)
        scene.add(points)

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
        directionalLight.position.set(5, 5, 5)
        scene.add(directionalLight)

        camera.position.z = 6

        // Animation
        const animate = () => {
          requestAnimationFrame(animate)

          globe.rotation.y += 0.005
          wireframe.rotation.y += 0.003
          points.rotation.y += 0.002

          renderer.render(scene, camera)
        }

        animate()
        setIsLoaded(true)

        // Cleanup
        return () => {
          if (container && renderer.domElement) {
            container.removeChild(renderer.domElement)
          }
          renderer.dispose()
        }
      }
    }

    loadThreeJS()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-400/30">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI-Powered Global Trade
                </Badge>
                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                  Future of
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                    {" "}
                    Smart Trading
                  </span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Revolutionizing global import-export with AI-driven insights, predictive analytics, and intelligent
                  supply chain optimization. Connect with worldwide markets through our advanced trading platform.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Play className="w-5 h-5 mr-2" />
                  Start Trading
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  Watch Demo
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">150+</div>
                  <div className="text-gray-400">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">$2.5B+</div>
                  <div className="text-gray-400">Trade Volume</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">99.9%</div>
                  <div className="text-gray-400">AI Accuracy</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative w-full h-96 lg:h-[500px]">
                <div ref={globeRef} className="w-full h-full flex items-center justify-center" />
                {!isLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400"></div>
                  </div>
                )}
              </div>

              {/* Floating Cards */}
              <Card className="absolute top-4 right-4 bg-black/40 border-blue-400/30 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                    <div>
                      <div className="text-white font-semibold">Live Trading</div>
                      <div className="text-emerald-400 text-sm">+24.5% Today</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="absolute bottom-4 left-4 bg-black/40 border-blue-400/30 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <div>
                      <div className="text-white font-semibold">AI Processing</div>
                      <div className="text-yellow-400 text-sm">Real-time</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">AI-Powered Trading Features</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the next generation of global trade with our intelligent platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Cpu className="w-8 h-8" />,
                title: "Smart Analytics",
                description: "AI-driven market analysis and predictive insights for optimal trading decisions",
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Global Network",
                description: "Connect with verified suppliers and buyers across 150+ countries worldwide",
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Real-time Processing",
                description: "Lightning-fast transaction processing with blockchain security",
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Market Trends",
                description: "Advanced trend analysis and price forecasting powered by machine learning",
              },
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: "Smart Contracts",
                description: "Automated contract execution with AI-powered risk assessment",
              },
              {
                icon: <ArrowRight className="w-8 h-8" />,
                title: "Seamless Integration",
                description: "Easy integration with existing ERP and supply chain management systems",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-black/20 border-white/10 backdrop-blur-sm hover:bg-black/30 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="text-blue-400 mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-to-r from-blue-600/20 to-emerald-600/20 border-blue-400/30 backdrop-blur-sm">
            <CardContent className="p-12">
              <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your Trading?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of businesses already using AI Import Exports to optimize their global trade operations
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Get Started Free
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  Schedule Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
