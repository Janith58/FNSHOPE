import React, { useState } from "react";

const About = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gradient-to-b from-white via-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-slate-800 mb-6">
            About <span className=" decoration-green-500">FNSHOPE</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Empowering you with a curated selection of handcrafted products that inspire creativity and support artisans worldwide.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16 bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b-2  ">
            Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed">
            At FNSHOPE, our mission is to connect buyers with talented artisans by offering a carefully curated
            selection of high-quality handcrafted products. We believe in promoting creativity, sustainability, and
            empowering artisans around the world.
          </p>
        </section>

        {/* Core Values Section */}
        <section className="mb-16 bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b-2 ">
            Our Core Values
          </h2>
          <ul className="list-inside list-disc text-gray-700 space-y-4 pl-4">
            <li className="hover:text-green-600 transition">
              <span className="font-medium">Quality and Craftsmanship:</span> Offering the best handmade products.
            </li>
            <li className="hover:text-green-600 transition">
              <span className="font-medium">Sustainability and Ethics:</span> Promoting eco-friendly and ethical practices.
            </li>
            <li className="hover:text-green-600 transition">
              <span className="font-medium">Supporting Artisans:</span> Empowering local and global small businesses.
            </li>
            <li className="hover:text-green-600 transition">
              <span className="font-medium">Customer Trust:</span> Ensuring a delightful shopping experience.
            </li>
          </ul>
        </section>

        {/* Toggleable "Meet the Team" Section */}
        <section className="mb-16 bg-white shadow-lg rounded-lg p-8">
          <div
            className="flex items-center justify-between cursor-pointer group"
            onClick={() => setIsOpen(!isOpen)}
          >
            <h2 className="text-3xl font-semibold text-gray-800 group-hover:text-green-600 transition">
              Meet the Team
            </h2>
            <span className="text-green-600 text-xl group-hover:scale-110 transition">
              {isOpen ? "▲" : "▼"}
            </span>
          </div>
          {isOpen && (
            <div className="mt-6 text-gray-700 leading-relaxed">
              <p>
                Our team is a group of passionate individuals dedicated to bringing you the best handcrafted products.
                With a shared commitment to excellence and creativity, we work closely with artisans to ensure a seamless
                shopping experience for you.
              </p>
            </div>
          )}
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Join Us
          </h2>
          <p className="text-gray-700 mb-8">
            Be a part of our journey to celebrate creativity and craftsmanship. Explore our collection and support
            talented artisans worldwide.
          </p>
          <a
            href="/shop"
            className="inline-block px-8 py-4 text-white bg-green-600 rounded-lg shadow-lg hover:bg-green-700 hover:shadow-xl transition-transform transform hover:-translate-y-1"
          >
            Explore Now
          </a>
        </section>
      </div>
    </div>
  );
};

export default About;
