import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-xl font-semibold text-primary-blue">StudyPilot</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/pricing" className="text-text-secondary hover:text-text-primary">
                Pricing
              </Link>
              <Link href="/auth/sign-in" className="text-text-secondary hover:text-text-primary">
                Sign In
              </Link>
              <Link href="/auth/sign-up">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold text-text-primary mb-6">
              Everything you need to study, automatically.
            </h1>
            <p className="text-xl text-text-secondary mb-8">
              Upload your notes or syllabus and get cheat sheets, flashcards, quizzes, and study plans automatically. Start with cheat sheets in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/sign-up">
                <Button size="lg">Get Started Free</Button>
              </Link>
              <Button variant="outline" size="lg">Watch Demo</Button>
            </div>
          </div>
          <div className="relative">
            {/* Dashboard Mockup Placeholder */}
            <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-4">
              <div className="bg-gray-100 rounded-md h-64 flex items-center justify-center">
                <p className="text-text-secondary">Dashboard Preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-center text-text-primary mb-12">
            Powerful Study Tools
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-card">
              <div className="w-12 h-12 bg-module-cheatSheets rounded-md flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Cheat Sheet Generator</h3>
              <p className="text-text-secondary">
                Automatically generate comprehensive cheat sheets from your class materials. Perfect for exam prep.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-card">
              <div className="w-12 h-12 bg-module-flashcards rounded-md flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Flashcards <span className="text-sm font-normal text-text-secondary">(Coming Soon)</span></h3>
              <p className="text-text-secondary">
                Create interactive flashcards automatically from your study materials.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-card">
              <div className="w-12 h-12 bg-module-quizzes rounded-md flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quiz Maker <span className="text-sm font-normal text-text-secondary">(Coming Soon)</span></h3>
              <p className="text-text-secondary">
                Generate practice quizzes to test your knowledge before exams.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-card">
              <div className="w-12 h-12 bg-module-studyPlan rounded-md flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Study Plan <span className="text-sm font-normal text-text-secondary">(Coming Soon)</span></h3>
              <p className="text-text-secondary">
                Get personalized study schedules based on your exam dates and priorities.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-card">
              <div className="w-12 h-12 bg-module-classes rounded-md flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Class Overview</h3>
              <p className="text-text-secondary">
                Organize all your classes and track your progress in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-center text-text-primary mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-semibold text-primary-blue">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload your notes</h3>
              <p className="text-text-secondary">
                Upload your class materials, syllabus, or lecture slides in PDF, DOCX, or PPTX format.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-semibold text-primary-blue">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI analyzes your material</h3>
              <p className="text-text-secondary">
                StudyPilot uses advanced AI to understand and organize your study materials.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-semibold text-primary-blue">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get cheat sheets instantly</h3>
              <p className="text-text-secondary">
                Receive comprehensive cheat sheets ready for exam day. Study smarter, not harder.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-center text-text-primary mb-12">
            Simple, Transparent Pricing
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-card border-2 border-gray-200">
              <h3 className="text-2xl font-semibold mb-2">Free</h3>
              <p className="text-3xl font-semibold mb-6">$0<span className="text-lg text-text-secondary font-normal">/month</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>3 cheat sheets per month</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Basic file support</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>All core features</span>
                </li>
              </ul>
              <Link href="/auth/sign-up">
                <Button variant="outline" className="w-full">Get Started</Button>
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-card border-2 border-primary-blue relative">
              <div className="absolute top-0 right-0 bg-primary-blue text-white px-4 py-1 rounded-bl-md text-sm font-medium">
                Popular
              </div>
              <h3 className="text-2xl font-semibold mb-2">Pro</h3>
              <p className="text-3xl font-semibold mb-6">$7.99<span className="text-lg text-text-secondary font-normal">/month</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Unlimited cheat sheets</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Priority processing</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Export options</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Early access to new features</span>
                </li>
              </ul>
              <Link href="/auth/sign-up">
                <Button className="w-full">Upgrade to Pro</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-center text-text-primary mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Is this cheating?</h3>
              <p className="text-text-secondary">
                No. StudyPilot helps you study more efficiently by organizing and summarizing your own class materials. It's a study tool, not a way to bypass learning.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Does StudyPilot do my homework for me?</h3>
              <p className="text-text-secondary">
                No. StudyPilot creates study aids like cheat sheets from your materials. It doesn't complete assignments or solve problems for you.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">What file types are supported?</h3>
              <p className="text-text-secondary">
                Currently, we support PDF, DOCX, and PPTX files. We're working on adding support for images with OCR.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Can I cancel anytime?</h3>
              <p className="text-text-secondary">
                Yes! You can cancel your Pro subscription at any time from your settings page. You'll retain access until the end of your billing period.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Is my data private?</h3>
              <p className="text-text-secondary">
                Absolutely. Your uploaded files and generated content are private to your account. We never share your data with third parties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <span className="text-xl font-semibold text-white mb-4 block">StudyPilot</span>
              <p className="text-sm">Everything you need to study, automatically.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/#features" className="hover:text-white">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/app" className="hover:text-white">App</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-sm text-center">
            <p>© {new Date().getFullYear()} StudyPilot.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

