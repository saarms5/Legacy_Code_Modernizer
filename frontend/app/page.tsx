'use client'

import { useState } from 'react'
import { supabase } from '@/utils/supabase'
import { Terminal, Shield, Zap, Code, ArrowRight } from 'lucide-react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email }])

      if (error) throw error
      setStatus('success')
      setEmail('')
    } catch (error) {
      console.error('Error:', error)
      setStatus('error')
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Grid Background Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10 opacity-20" />

      {/* Hero Section */}
      <section className="max-w-5xl w-full text-center space-y-8 py-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-800 bg-gray-900/50 text-sm text-gray-400 mb-4 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          System Online: v1.0.0
        </div>

        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 neon-text">
            LegacyLift
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12">
          Modernize Legacy Code in Seconds. <br />
          <span className="text-green-500 font-mono">&lt;AI-Powered Refactoring /&gt;</span>
        </p>

        {/* Waitlist Form */}
        <div className="max-w-md mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
          <form onSubmit={handleSubmit} className="relative flex gap-2 bg-black p-2 rounded-lg border border-gray-800">
            <input
              type="email"
              placeholder="enter_email_address..."
              className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-gray-600 font-mono"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="bg-green-600 hover:bg-green-500 text-black font-bold py-2 px-6 rounded flex items-center gap-2 transition-all"
            >
              {status === 'loading' ? 'PROCESSING...' : status === 'success' ? 'ACCESS GRANTED' : 'JOIN BETA'}
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
        {status === 'success' && (
          <p className="text-green-500 mt-4 font-mono animate-pulse">
            [SUCCESS] You have been added to the queue.
          </p>
        )}
        {status === 'error' && (
          <p className="text-red-500 mt-4 font-mono">
            [ERROR] Connection failed. Please try again.
          </p>
        )}
      </section>

      {/* Feature Grid */}
      <section className="grid md:grid-cols-3 gap-8 max-w-6xl w-full px-4 mt-20">
        {[
          {
            icon: <Shield className="w-8 h-8 text-green-500" />,
            title: "Security Sandboxed",
            desc: "Code execution happens in isolated, ephemeral environments. Zero risk to your infrastructure."
          },
          {
            icon: <Zap className="w-8 h-8 text-blue-500" />,
            title: "Self-Healing Tests",
            desc: "AI automatically generates and updates unit tests as it refactors your codebase."
          },
          {
            icon: <Code className="w-8 h-8 text-purple-500" />,
            title: "Instant Documentation",
            desc: "Generate comprehensive documentation and architecture diagrams on the fly."
          }
        ].map((feature, i) => (
          <div key={i} className="p-6 rounded-xl border border-gray-800 bg-gray-900/20 hover:border-green-500/50 transition-colors group">
            <div className="mb-4 p-3 bg-gray-900 rounded-lg w-fit group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-100">{feature.title}</h3>
            <p className="text-gray-400 leading-relaxed">
              {feature.desc}
            </p>
          </div>
        ))}
      </section>
    </main>
  )
}
