import React from "react";

export default function FDMaintenance({FrontdeskImg}) {
  return (
    <>
      <div class="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <div class="w-40 h-40 mb-8 rounded-full bg-blue-100 flex justify-center items-center p-8">
          <img src={FrontdeskImg} alt="Logo" />
        </div>
        <h1 class="text-4xl font-bold mb-4">Coming Soon</h1>
        <p class="text-lg mb-8 px-4 md:px-0 text-center">
          We're working hard to bring you something awesome. Stay tuned!
        </p>
        <div class="flex justify-center items-center space-x-4">
          <a
            href="#"
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Learn More
          </a>
          <a
            href="#"
            class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
          >
            Contact Us
          </a>
        </div>
      </div>
    </>
  );
}
