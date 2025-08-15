"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
  Cpu,
  ArrowLeft,
  Sparkles,
  Globe,
  Users,
  TrendingUp,
  Zap,
  Brain,
  Shield,
  Target,
  Rocket,
  Heart,
} from "lucide-react"

function AIVisualization() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

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

      // Create AI brain visualization
      const brainGeometry = new THREE.SphereGeometry(1.5, 32, 32)
      const brainMaterial = new THREE.MeshPhongMaterial({
        color: 0x60a5fa,
        transparent: true,
        opacity: 0.7,
        wireframe: false,
      })
      const brain = new THREE.Mesh(brainGeometry, brainMaterial)
      scene.add(brain)

      // Neural network connections
      const connections = []
      for (let i = 0; i < 50; i++) {
        const geometry = new THREE.BufferGeometry()
        const material = new THREE.LineBasicMaterial({
          color: 0x10b981,
          transparent: true,
          opacity: 0.6,
        })

        const points = []
        const radius = 1.6
        const phi1 = Math.random() * Math.PI * 2
        const theta1 = Math.random() * Math.PI
        const phi2 = Math.random() * Math.PI * 2
        const theta2 = Math.random() * Math.PI

        points.push(
          new THREE.Vector3(
            radius * Math.sin(theta1) * Math.cos(phi1),
            radius * Math.sin(theta1) * Math.sin(phi1),
            radius * Math.cos(theta1),
          ),
        )
        points.push(
          new THREE.Vector3(
            radius * Math.sin(theta2) * Math.cos(phi2),
            radius * Math.sin(theta2) * Math.sin(phi2),
            radius * Math.cos(theta2),
          ),
        )

        geometry.setFromPoints(points)
        const line = new THREE.Line(geometry, material)
        connections.push(line)
        scene.add(line)
      }

      // Data nodes
      const nodeGeometry = new THREE.SphereGeometry(0.05, 8, 8)
      const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xfbbf24 })
      const nodes = []

      for (let i = 0; i < 30; i++) {
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial)
        const radius = 1.8
        const phi = Math.random() * Math.PI * 2
        const theta = Math.random() * Math.PI

        node.position.set(
          radius * Math.sin(theta) * Math.cos(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(theta),
        )
        nodes.push(node)
        scene.add(node)
      }

      // Lighting
      const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
      scene.add(ambientLight)

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
      directionalLight.position.set(5, 5, 5)
      scene.add(directionalLight)

      camera.position.z = 4

      // Animation
      const animate = () => {
        requestAnimationFrame(animate)

        brain.rotation.y += 0.005
        brain.rotation.x += 0.002

        connections.forEach((connection, index) => {
          connection.rotation.y += 0.001 * ((index % 3) + 1)
        })

        nodes.forEach((node, index) => {
          node.rotation.y += 0.01
          const time = Date.now() * 0.001
          node.material.opacity = 0.5 + 0.5 * Math.sin(time + index)
        })

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
  }, [])

  return <div ref={mountRef} className="w-full h-96 flex items-center justify-center" />
}

function Timeline3D() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const loadThreeJS = async () => {
      const THREE = await import("three")

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000)
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

      const container = mountRef.current!
      renderer.setSize(container.clientWidth, 300)
      renderer.setClearColor(0x000000, 0)
      container.appendChild(renderer.domElement)

      // Timeline path
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-4, 0, 0),
        new THREE.Vector3(-2, 1, 0),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(2, -1, 0),
        new THREE.Vector3(4, 0, 0),
      ])

      const points = curve.getPoints(100)
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const material = new THREE.LineBasicMaterial({ color: 0x60a5fa, linewidth: 3 })
      const line = new THREE.Line(geometry, material)
      scene.add(line)

      // Timeline markers
      const markerGeometry = new THREE.SphereGeometry(0.1, 16, 16)
      const markerMaterial = new THREE.MeshPhongMaterial({ color: 0x10b981 })

      const markers = []
      for (let i = 0; i < 5; i++) {
        const marker = new THREE.Mesh(markerGeometry, markerMaterial)
        const t = i / 4
        const position = curve.getPoint(t)
        marker.position.copy(position)
        markers.push(marker)
        scene.add(marker)
      }

      // Lighting
      const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
      scene.add(ambientLight)

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
      directionalLight.position.set(5, 5, 5)
      scene.add(directionalLight)

      camera.position.set(0, 2, 3)
      camera.lookAt(0, 0, 0)

      // Animation
      const animate = () => {
        requestAnimationFrame(animate)

        markers.forEach((marker, index) => {
          marker.rotation.y += 0.02
          const time = Date.now() * 0.001
          marker.position.y += Math.sin(time + index) * 0.01
        })

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
  }, [])

  return <div ref={mountRef} className="w-full h-72" />
}

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState("story")

  const timelineEvents = [
    {
      year: "2019",
      title: "Founded",
      description: "AI Import Exports was born with a vision to revolutionize global trade",
    },
    { year: "2020", title: "AI Integration", description: "Launched our first AI-powered market analysis platform" },
    {
      year: "2021",
      title: "Global Expansion",
      description: "Expanded to 50+ countries with verified supplier network",
    },
    {
      year: "2022",
      title: "Smart Contracts",
      description: "Introduced blockchain-based smart contracts for secure trading",
    },
    {
      year: "2023",
      title: "Market Leader",
      description: "Became the leading AI-powered import-export platform globally",
    },
  ]

  const values = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Innovation",
      description: "Leveraging cutting-edge artificial intelligence to transform global trade",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Trust & Security",
      description: "Blockchain-secured transactions with verified supplier networks",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Reach",
      description: "Connecting businesses across 150+ countries worldwide",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Precision",
      description: "Data-driven insights for optimal trading decisions",
    },
  ]

  const achievements = [
    { number: "$2.5B+", label: "Trade Volume", icon: <TrendingUp className="w-6 h-6" /> },
    { number: "150+", label: "Countries", icon: <Globe className="w-6 h-6" /> },
    { number: "10K+", label: "Active Traders", icon: <Users className="w-6 h-6" /> },
    { number: "99.9%", label: "AI Accuracy", icon: <Cpu className="w-6 h-6" /> },
  ]

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
              Our Story
            </Badge>
            <h1 className="text-5xl font-bold text-white mb-4">
              Revolutionizing
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                {" "}
                Global Trade
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're on a mission to transform international commerce through artificial intelligence, making global
              trade more efficient, transparent, and accessible for businesses worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* AI Visualization Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-white">
                Powered by
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                  {" "}
                  Advanced AI
                </span>
              </h2>
              <p className="text-lg text-gray-300">
                Our proprietary artificial intelligence engine processes millions of data points in real-time, analyzing
                market trends, predicting demand patterns, and optimizing supply chain routes to deliver unprecedented
                trading insights.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/20 border border-blue-400/20 rounded-lg p-4">
                  <Zap className="w-8 h-8 text-yellow-400 mb-2" />
                  <h3 className="text-white font-semibold">Real-time Processing</h3>
                  <p className="text-gray-400 text-sm">Lightning-fast analysis of global market data</p>
                </div>
                <div className="bg-black/20 border border-blue-400/20 rounded-lg p-4">
                  <Brain className="w-8 h-8 text-purple-400 mb-2" />
                  <h3 className="text-white font-semibold">Machine Learning</h3>
                  <p className="text-gray-400 text-sm">Continuously improving prediction accuracy</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <AIVisualization />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 rounded-lg pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Journey</h2>
            <p className="text-xl text-gray-300">From startup to global leader in AI-powered trade</p>
          </div>

          <div className="mb-8">
            <Timeline3D />
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {timelineEvents.map((event, index) => (
              <Card key={index} className="bg-black/20 border-white/10 backdrop-blur-sm text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  <CardTitle className="text-blue-400 text-lg">{event.year}</CardTitle>
                  <h3 className="text-white font-semibold">{event.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm">{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-xl text-gray-300">The principles that drive our innovation</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="bg-black/20 border-white/10 backdrop-blur-sm hover:bg-black/30 transition-all duration-300 text-center"
              >
                <CardContent className="p-6">
                  <div className="text-blue-400 mb-4 flex justify-center">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Impact</h2>
            <p className="text-xl text-gray-300">Numbers that speak to our global reach</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-blue-600/20 to-emerald-600/20 border-blue-400/30 backdrop-blur-sm text-center"
              >
                <CardContent className="p-8">
                  <div className="text-blue-400 mb-4 flex justify-center">{achievement.icon}</div>
                  <div className="text-4xl font-bold text-white mb-2">{achievement.number}</div>
                  <div className="text-gray-300">{achievement.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-to-r from-blue-600/20 to-emerald-600/20 border-blue-400/30 backdrop-blur-sm">
            <CardContent className="p-12">
              <Heart className="w-16 h-16 text-red-400 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                To democratize global trade through artificial intelligence, empowering businesses of all sizes to
                participate in international commerce with confidence, transparency, and unprecedented efficiency.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Rocket className="w-5 h-5 mr-2" />
                  Join Our Mission
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  Learn More
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
