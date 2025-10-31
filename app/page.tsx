"use client"

import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { BookOpen, Tag, Zap } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status == "authenticated") {
      router.push('/dashboard');
      router.refresh();
    }
  }, [router, status]);

  if (status == "loading") {
    return <Loading />
  }

   return (
    <div className="flex flex-col min-h-screen bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900">
      <Header />

      <main className="flex-grow">
        <section className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Stop losing links. Start building your brain. 🧠
          </h1>
          <p className="text-lg md:text-xl text-gray-300 dark:text-gray-700 max-w-3xl mx-auto mb-8">
            DevCrate is an <b>intelligent bookmarking tool</b> built for developers.
            It uses AI to automatically <b>summarize and tag</b> any link, turning
            your chaotic bookmarks into a searchable, personal knowledge base.
          </p>
          <Link
            href="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
          >
            Get Started for Free
          </Link>
        </section>

        <section className="bg-gray-800 dark:bg-white py-20">
          <div className="container mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <Zap size={48} className="text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Never Type Again</h3>
              <p className="text-gray-400 dark:text-gray-600">
                Just paste a URL. DevCrate instantly fetches the{" "}
                <strong>title, description, and preview image</strong>, so you
                never have to manually label a link again.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <BookOpen size={48} className="text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Understand at a Glance
              </h3>
              <p className="text-gray-400 dark:text-gray-600">
                Our AI reads the article and writes a{" "}
                <strong>concise summary</strong>. You&apos;ll always remember the key
                insights, even months after you saved the link.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Tag size={48} className="text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Find Anything, Instantly
              </h3>
              <p className="text-gray-400 dark:text-gray-600">
                Forget &quot;bookmark graveyards.&quot; Automatic <strong>tagging</strong>{" "}
                (e.g., <code>react</code>, <code>typescript</code>) lets you
                filter and find exactly what you need, when you need it.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to take control of your knowledge? 👇
          </h2>
          <Link
            href="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
          >
            Create Your Crates Today
          </Link>
        </section>
      </main>

      <footer className="bg-gray-800 dark:bg-gray-200 text-gray-300 dark:text-gray-700 text-center p-6">
        <p>&copy; 2025 DevCrate. All rights reserved.</p>
        <p className="text-sm mt-1">
          A portfolio project by Om Shimpi.{" "}
          <a
            href="https://github.com/om272004" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            GitHub
          </a>{" "}
          |{" "}
          <a
            href="https://linkedin.com/in/omshimpi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            LinkedIn
          </a>
        </p>
      </footer>
    </div>
  );
}
