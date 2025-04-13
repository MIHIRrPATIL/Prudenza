import React from 'react'

const HeroSection = () => {
  return (
    <section className="bg-white text-gray-900 py-20 px-6">
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center space-y-10">
        
        {/* Text Content */}
        <div className="space-y-5">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Manage Money, <br /> The Smart Way.
          </h1>
          <p className="text-base text-gray-600 max-w-xl mx-auto">
            Effortlessly track expenses, set budgets & get smart predictions — all in one simple wallet designed for you.
          </p>
          <button className="bg-gray-900 text-white font-medium px-6 py-3 rounded-lg hover:bg-gray-800 transition">
            Get Started
          </button>
        </div>

        {/* Image */}
        <div>
          <img 
            src="https://cdn.dribbble.com/users/1186261/screenshots/16608267/media/073ffb5a964d137f1a45521a63c4469f.png" 
            alt="Smart Wallet Illustration" 
            className="w-full max-w-md mx-auto"
          />
        </div>
        
      </div>
    </section>
  )
}

export default HeroSection
