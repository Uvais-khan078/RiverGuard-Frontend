import { Link } from "react-router-dom";
import PollutionChart from "../components/PollutionChart";

function Home() {
  return (
    <>
      <div className="font-sans text-gray-800">
        <header className="flex items-center justify-between bg-white px-6 py-4 shadow">
          <h1 className="text-2xl font-bold text-blue-600">RiverGuard</h1>
          <nav className="hidden space-x-6 md:flex">
            <a href="#features" className="hover:text-blue-600">Features</a>
            <a href="#dashboard" className="hover:text-blue-600">Dashboard</a>
            <a href="#ai-insights" className="hover:text-blue-600">AI Insights</a>
            <a href="#impact" className="hover:text-blue-600">Impact</a>
          </nav>
          <Link to="/login" className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">log-in</Link>
        </header>
        
        <section className="relative flex h-[90vh] items-center justify-center  bg-[url(D:\RiverGuard\Frontend\bg-1.jpg)] bg-cover text-center">
         <div className="" >
          <div className="absolute inset-0"></div>

          <div className="relative z-10 max-w-3xl px-6 text-white">
            <h2 className="mb-4 text-4xl leading-tight font-extrabold md:text-5xl">Safeguarding Rivers with <span className="text-blue-400">AI & Real-time Monitoring</span></h2>
            <p className="mb-8 text-lg text-blue-100 md:text-xl">RiverGuard harnesses IoT, satellite imagery, and intelligent analytics to protect freshwater ecosystems.</p>
            <div className="space-x-4">
              <button className="rounded-full bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700">Get Started</button>
              <button className="rounded-full bg-white px-6 py-2 text-blue-600 transition hover:bg-blue-100">Live Demo</button>
            </div>
          </div></div>
        </section>

        <section id="features" className="bg-white px-8 py-16">
          <h3 className="mb-12 text-center text-3xl font-semibold">Key Features</h3>
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            <div className="border rounded-xl shadow p-6 text-center">
              <div className="text-red-500 mb-3 text-4xl  flex justify-center ">
                <img src="https://media.discordapp.net/attachments/1352706628163473522/1369555492937928765/polimg-removebg-preview.png?ex=681c4972&is=681af7f2&hm=c92a5c5a20ac383d9e7d12550bc9c513cd53dad201766416e1eb35f85e735ca6&=&format=webp&quality=lossless&width=625&height=400" className="h-30" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Pollution Hotspot Detection</h4>
              <p className="text-gray-600">Identify high contamination zones using satellite and sensor data fusion.</p>
            </div>
            <div className="border rounded-xl shadow p-6 text-center">
              <div className="text-green-500 mb-4 text-4xl  flex justify-center  ">
                <img src="https://media.discordapp.net/attachments/1352706628163473522/1369553024359600188/factry_img-removebg-preview.png?ex=681c4726&is=681af5a6&hm=edd7df6b5a6483c87ca0ada6fa2910255bbb3102566f8d4c3406dc86fa07f49d&=&format=webp&quality=lossless&width=500&height=250" className="h-30 "/>
              </div>
              <h4 className="text-xl font-semibold mb-2">Factory Compliance Tracking</h4>
              <p className="text-gray-600">Monitor industrial discharge to ensure environmental norms are met.</p>
            </div>
            <div className="border rounded-xl shadow p-6 text-center">
              <div className="text-blue-500 mb-3 text-4xl  flex justify-center">
                <img src="https://media.discordapp.net/attachments/1352706628163473522/1369562249827713086/aquai-removebg-preview.png?ex=681c4fbd&is=681afe3d&hm=67b72749bfcbabc822d0325775130d4b0a367acbc18969874562439c73b95c7a&=&format=webp&quality=lossless&width=608&height=400" className="h-30 "/>
              </div>
              <h4 className="text-xl font-semibold mb-2">Ecological Risk Analysis</h4>
              <p className="text-gray-600">Evaluate impact on biodiversity and aquatic ecosystems through risk scoring.</p>
            </div>
          </div>
        </section>

        <section id="dashboard" class="py-16 px-8 bg-blue-50 text-center">
      <h3 class="text-3xl font-semibold mb-6">Explore the Live Dashboard</h3>
      <div class="border-2 border-dashed border-blue-300 p-10 rounded-xl bg-white max-w-4xl mx-auto">
        <PollutionChart/>
      </div>
    </section>

        <section id="ai-insights" className="bg-white px-8 py-16">
          <section className="bg-gray-100 px-6 py-16">
            <div className="mx-auto max-w-5xl">
              <h2 className="mb-8 text-center text-3xl font-semibold text-blue-800">🔍 Live AI Insights</h2>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg bg-white p-6 shadow-md">
                  <h3 className="mb-2 text-xl font-semibold text-blue-700">Pollution Forecast</h3>
                  <p className="text-gray-600">🧠 AI predicts rising nitrate levels in the <b>Yamuna River (Zone A)</b> over the next <b>48 hours</b>.</p>
                  <p className="mt-2 text-sm font-medium text-red-600">⚠️ Action Recommended: Investigate discharge from Factory X.</p>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-md">
                  <h3 className="mb-2 text-xl font-semibold text-blue-700">Anomaly Detected</h3>
                  <p className="text-gray-600">📡 Sensor #04 detected abnormal pH levels near <b>Riverbank Sector C</b>.</p>
                  <p className="mt-2 text-sm font-medium text-yellow-600">🛠️ Alert Level: Moderate</p>
                </div>

                <div className="col-span-2 rounded-lg bg-white p-6 shadow-md">
                  <h3 className="mb-2 text-xl font-semibold text-blue-700">Satellite Image Analysis</h3>
                  <p className="text-gray-600">🛰️ Land-use detection shows a new industrial expansion near <b>River Zone B</b>. Potential risk of contamination detected.</p>
                </div>
              </div>
            </div>
          </section>
        </section>

        <section id="impact" className="bg-blue-100 px-8 py-16">
          <h3 className="mb-10 text-center text-3xl font-semibold">Driving Impact with UN SDGs</h3>
          <div className="mx-auto grid max-w-6xl gap-6 text-center md:grid-cols-3">
            <div>
              <h4 className="mb-2 text-xl font-bold text-blue-700">Clean Water & Sanitation</h4>
              <p className="text-gray-700">Proactively managing water pollution to ensure safe, clean water.</p>
            </div>
            <div>
              <h4 className="mb-2 text-xl font-bold text-blue-700">Life Below Water</h4>
              <p className="text-gray-700">Protecting marine and freshwater life using data-driven insights.</p>
            </div>
            <div>
              <h4 className="mb-2 text-xl font-bold text-blue-700">Sustainable Cities</h4>
              <p className="text-gray-700">Empowering urban planning through environmental intelligence.</p>
            </div>
          </div>
        </section>

        <footer className="mt-12 bg-gray-800 px-8 py-10 text-gray-300">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-4">
            <div>
              <h4 className="mb-2 text-lg font-semibold text-white">RiverGuard</h4>
              <p className="text-sm">Empowering sustainable river management through intelligent monitoring.</p>
            </div>
            <div>
              <h5 className="mb-2 font-medium text-white">Quick Links</h5>
              <ul className="space-y-1 text-sm">
                <li><a href="#features" className="hover:underline">Features</a></li>
                <li><a href="#dashboard" className="hover:underline">Dashboard</a></li>
                <li><a href="#impact" className="hover:underline">Impact</a></li>
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h5 className="mb-2 font-medium text-white">Contact</h5>
              <p className="text-sm">Email: support@riverguard.io</p>
              <p className="text-sm">Phone: +1 234 567 8901</p>
            </div>
            <div>
              <h5 className="mb-2 font-medium text-white">Follow Us</h5>
              <div className="flex space-x-4 text-sm">
                <a href="#" className="hover:text-white">Twitter</a>
                <a href="#" className="hover:text-white">LinkedIn</a>
                <a href="#" className="hover:text-white">GitHub</a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-xs text-gray-500">© 2025 RiverGuard. All rights reserved.</div>
        </footer>
      </div>
    </>
  )
}

export default Home;
