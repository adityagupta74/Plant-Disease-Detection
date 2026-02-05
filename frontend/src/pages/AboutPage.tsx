import { Leaf, Users, Target, Zap } from "lucide-react";

export function AboutPage() {
  return (
    <div className="container py-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            About Plant Disease Detection
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            An AI-powered system designed to help farmers, gardeners, and
            agricultural professionals identify plant diseases quickly and
            accurately.
          </p>
        </div>

        {/* Mission */}
        <div className="card p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 dark:text-gray-400 text-lg leading-relaxed">
            We aim to democratize access to plant disease diagnosis using
            cutting-edge artificial intelligence. By making advanced
            agricultural expertise available to everyone, we help protect crops,
            increase yields, and promote sustainable farming practices worldwide.
          </p>
        </div>

        {/* Features + Tech */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

          {/* Left */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Key Features
            </h2>

            {[
              {
                icon: Leaf,
                title: "25+ Disease Classes",
                desc: "Detects diseases across multiple plant species including apple, corn, grape, potato, and tomato.",
              },
              {
                icon: Zap,
                title: "Real-time Analysis",
                desc: "Get instant disease detection results with confidence scores and severity assessments.",
              },
              {
                icon: Target,
                title: "Treatment Recommendations",
                desc: "Receive detailed chemical, cultural, and preventive treatment options for identified diseases.",
              },
              {
                icon: Users,
                title: "User-Friendly Interface",
                desc: "Simple drag-and-drop interface designed for users of all technical backgrounds.",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-primary-100 dark:bg-primary-900/30 rounded-full p-2 flex-shrink-0 transition-colors">
                    <Icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Technology
            </h2>

            <div className="card p-6 bg-gray-50 dark:bg-gray-800 transition-colors">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Machine Learning Models
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-400">
                <li>• TensorFlow deep learning models</li>
                <li>• PyTorch neural networks</li>
                <li>• ONNX model support</li>
                <li>• Convolutional Neural Networks (CNNs)</li>
              </ul>
            </div>

            <div className="card p-6 bg-gray-50 dark:bg-gray-800 transition-colors">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Modern Web Stack
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-400">
                <li>• React + TypeScript frontend</li>
                <li>• FastAPI Python backend</li>
                <li>• Docker containerization</li>
                <li>• Redis caching</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Supported Diseases */}
        <div className="card p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Supported Plant Diseases
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700 dark:text-gray-400 text-sm">
            {[
              {
                name: "Apple",
                items: ["Apple Scab", "Black Rot", "Cedar Apple Rust", "Healthy"],
              },
              {
                name: "Corn",
                items: ["Cercospora Leaf Spot", "Common Rust", "Northern Leaf Blight", "Healthy"],
              },
              {
                name: "Grape",
                items: ["Black Rot", "Esca (Black Measles)", "Leaf Blight", "Healthy"],
              },
              {
                name: "Potato",
                items: ["Early Blight", "Late Blight", "Healthy"],
              },
              {
                name: "Tomato",
                items: [
                  "Bacterial Spot",
                  "Early Blight",
                  "Late Blight",
                  "Leaf Mold",
                  "Septoria Leaf Spot",
                  "Spider Mites",
                  "Target Spot",
                  "Yellow Leaf Curl Virus",
                  "Mosaic Virus",
                  "Healthy",
                ],
              },
            ].map((plant, index) => (
              <div key={index}>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  {plant.name}
                </h3>
                <ul className="space-y-1">
                  {plant.items.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="card p-6 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700 transition-colors">
          <h3 className="font-semibold text-yellow-900 dark:text-yellow-300 mb-2">
            Important Disclaimer
          </h3>
          <p className="text-yellow-800 dark:text-yellow-400 text-sm">
            This AI system provides disease detection suggestions based on image
            analysis. Results should be used as a preliminary assessment only.
            For critical agricultural decisions, professional diagnosis from
            qualified experts is recommended.
          </p>
        </div>
      </div>
    </div>
  );
}
