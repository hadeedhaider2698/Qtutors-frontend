import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  Users,
  BookOpen,
  LineChart,
  Star,
  Play,
  ChevronDown,
  ChevronUp,
  ArrowUp,
  Menu,
  X,
  Mail,
  Phone,
  Globe,
  CheckCircle2,
  Award
} from 'lucide-react';
import axios from 'axios';
import './App.css';

function App() {
  const form = useRef();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    exam: '',
    country: '',
    email: '',
    phone: ''
  });

  const testimonials = [
    { text: '"My daughter improved dramatically in NAPLAN Numeracy. Highly recommended!"', author: 'Parent (Sydney)', rating: 5 },
    { text: '"Excellent preparation for 11+. My son secured grammar school placement."', author: 'UK Parent', rating: 5 },
    { text: '"Improved my SAT score from 1150 to 1350."', author: 'US Student', rating: 5 }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

      const response = await axios.post(`${backendUrl}/api/submit-form`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        grade: formData.grade,
        exam: formData.exam,
        country: formData.country,
      });

      if (response.data.success || response.status === 207) {
        setSubmitStatus('success');
        form.current.reset();
        setFormData({ name: '', grade: '', exam: '', country: '', email: '', phone: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-purple-100 selection:text-purple-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold text-gradient flex items-center gap-2"
          >
            <img src="/logo.png" alt="Qtutors Logo" className="w-10 h-10 object-contain" />
            <span>Qtutors</span>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-8">
            {['About', 'Why Choose Us', 'How It Works', 'Exams', 'Pricing', 'Contact'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-sm font-medium text-slate-600 hover:text-purple-600 transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
              className="hidden md:block bg-purple-600 text-white px-6 py-2.5 rounded-full font-semibold text-sm shadow-lg shadow-purple-200 hover:bg-purple-700 transition-all"
            >
              Start Free Trial
            </motion.button>
            <button
              className="md:hidden p-2 text-slate-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <nav className="flex flex-col p-4 space-y-4">
                {['About', 'Why Choose Us', 'How It Works', 'Exams', 'Pricing', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-slate-600 font-medium hover:text-purple-600"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-700 text-sm font-semibold mb-6 border border-purple-100"
            >
              <Award className="w-4 h-4" />
              <span>World-Class Tutors at Your Fingertips</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight text-slate-900"
            >
              Master Your Exams with <span className="text-gradient">Qtutors</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto"
            >
              Personalized online coaching for NAPLAN, 11+, GCSE, SAT & IGCSE. Join thousands of successful students worldwide.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-center items-center gap-4"
            >
              <button
                onClick={scrollToContact}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-purple-200 hover:bg-purple-700 transition-all hover:scale-105 active:scale-95"
              >
                <Play className="w-5 h-5 fill-current" />
                Start Free Trial
              </button>
              <button
                onClick={() => document.getElementById('exams').scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-lg text-slate-600 border-2 border-slate-200 hover:border-purple-200 hover:bg-purple-50 transition-all hover:scale-105 active:scale-95"
              >
                Explore Courses
              </button>
            </motion.div>
          </div>
        </div>
      </section>


      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient inline-block">Who We Are</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Qtutors is your premier online tutoring academy, dedicated to empowering students worldwide to excel in international standardized exams through personalized, expert-led coaching.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              { emoji: '🇦🇺', label: 'NAPLAN', sub: 'Australia' },
              { emoji: '🇬🇧', label: '11+', sub: 'UK Grammar' },
              { emoji: '🇬🇧', label: 'GCSE', sub: 'UK Curriculum' },
              { emoji: '🇺🇸', label: 'SAT', sub: 'US College' },
              { emoji: '🇬🇧', label: 'IGCSE', sub: 'Cambridge' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center transition-shadow hover:shadow-xl hover:shadow-slate-200/50"
              >
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="font-bold text-slate-800">{item.label}</h3>
                <p className="text-sm text-slate-500">{item.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-choose-us" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">Why Choose <span className="text-gradient">Qtutors</span></h2>
            <p className="text-xl text-slate-600">Experience excellence in personalized online education</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: GraduationCap, title: 'Expert Tutors', color: 'purple', text: 'Certified specialists fluent in English, with deep expertise in international curricula.' },
              { icon: BookOpen, title: 'Customized Plans', color: 'blue', text: 'Tailored study roadmaps based on your unique strengths, weaknesses, and goals.' },
              { icon: LineChart, title: 'Regular Mock Tests', color: 'green', text: 'Exam-style practice with detailed performance analytics to build confidence.' },
              { icon: Users, title: '1-on-1 Attention', color: 'orange', text: '100% personalized sessions for maximum focus — no group distractions.' },
              { icon: Star, title: 'Progress Tracking', color: 'pink', text: 'Detailed reports shared with parents for full transparency on improvement.' },
              { icon: Globe, title: 'Global Reach', color: 'indigo', text: 'Supporting students from Australia, UK, USA, and beyond with flexible timing.' },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass p-8 rounded-3xl group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-${feature.color}-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-8 h-8 text-${feature.color}-600`} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient inline-block">How It Works</h2>
            <p className="text-xl text-slate-600">Simple steps to your academic success</p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-8 relative">
            {/* Connection Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-slate-100 -z-10"></div>

            {[
              { step: '1', title: 'Free Trial', text: 'Experience a 1-hour trial session to assess fit.' },
              { step: '2', title: 'Custom Plan', text: 'We create a roadmap and schedule that fits you.' },
              { step: '3', title: 'Tutoring', text: 'Interactive live sessions by proficient tutors.' },
              { step: '4', title: 'Flexibility', text: 'Missed a class? One makeup per month allowed.' },
              { step: '5', title: 'Results', text: 'Track progress with regular guardian reports.' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 rounded-full bg-slate-50 border-2 border-white shadow-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                  <span className="text-2xl font-bold">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Exam Preparation Details */}
      <section id="exams" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">Exam Preparation Details</h2>
            <p className="text-xl text-slate-600">Comprehensive coaching for international exams</p>
          </motion.div>

          <div className="space-y-8 max-w-5xl mx-auto">
            {[
              {
                id: 'naplan',
                flag: '🇦🇺',
                title: 'NAPLAN Preparation',
                color: 'blue',
                items: ['Numeracy', 'Reading', 'Writing', 'Language Conventions'],
                focus: ['Problem-solving strategies', 'Writing structure', 'Speed & accuracy', 'Past-style practice']
              },
              {
                id: '11plus',
                flag: '🇬🇧',
                title: '11+ Exam Preparation',
                color: 'emerald',
                items: ['Verbal Reasoning', 'Non-Verbal Reasoning', 'Maths', 'English'],
                focus: ['Logic-based thinking', 'Grammar school entry techniques', 'Time management', 'Confidence building']
              },
              {
                id: 'gcse',
                flag: '🇬🇧',
                title: 'GCSE & IGCSE Preparation',
                color: 'purple',
                items: ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
                focus: ['Concept clarity', 'Exam board patterns', 'Past paper solving', 'Grade-boosting strategies']
              },
              {
                id: 'sat',
                flag: '🇺🇸',
                title: 'SAT Preparation',
                color: 'orange',
                items: ['SAT Math', 'Reading', 'Writing'],
                focus: ['Time management', 'High-scoring techniques', 'Real practice tests', 'Score improvement plans']
              }
            ].map((exam, i) => (
              <motion.div
                key={exam.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass p-8 md:p-10 rounded-3xl"
              >
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-4xl">{exam.flag}</span>
                      <h3 className={`text-2xl font-bold text-${exam.color}-600`}>{exam.title}</h3>
                    </div>
                    <button
                      onClick={scrollToContact}
                      className={`inline-flex items-center gap-2 text-${exam.color}-600 font-bold hover:underline`}
                    >
                      Learn More <ChevronUp className="w-4 h-4 rotate-90" />
                    </button>
                  </div>
                  <div className="md:w-2/3 grid sm:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-slate-900 mb-4">Coverage:</h4>
                      <ul className="space-y-3">
                        {exam.items.map(item => (
                          <li key={item} className="flex items-center gap-3 text-slate-600">
                            <CheckCircle2 className={`w-5 h-5 text-${exam.color}-500`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-4">Key Focus:</h4>
                      <ul className="space-y-3">
                        {exam.focus.map(item => (
                          <li key={item} className="flex items-center gap-3 text-slate-600">
                            <div className={`w-1.5 h-1.5 rounded-full bg-${exam.color}-500`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient inline-block">Success Stories</h2>
            <p className="text-xl text-slate-600">What our students and parents say worldwide</p>
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="glass p-12 rounded-[2rem] text-center shadow-2xl shadow-purple-100"
              >
                <div className="flex justify-center gap-1 mb-8">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-2xl md:text-3xl font-medium text-slate-800 mb-8 italic">
                  {testimonials[currentTestimonial].text}
                </blockquote>
                <cite className="block not-italic">
                  <span className="text-xl font-bold text-purple-600">{testimonials[currentTestimonial].author}</span>
                </cite>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center items-center gap-6 mt-12">
              <button onClick={prevTestimonial} className="p-3 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors">
                <ChevronDown className="w-6 h-6 rotate-90" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentTestimonial ? 'w-8 bg-purple-600' : 'bg-slate-200'}`}
                  />
                ))}
              </div>
              <button onClick={nextTestimonial} className="p-3 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors">
                <ChevronDown className="w-6 h-6 -rotate-90" />
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* Pricing/Booking Section */}
      <section id="pricing" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto glass p-12 md:p-20 rounded-[3rem] relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-slate-900">Start Your Journey Today</h2>
              <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                Flexible, personalized one-on-one tutoring packages tailored to your needs. Book a free trial class and experience the Qtutors difference.
              </p>

              <div className="flex flex-col md:flex-row justify-center gap-8 mb-12">
                <div className="flex items-center gap-3 text-slate-700 bg-white/50 px-6 py-3 rounded-2xl border border-white">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  <span className="font-semibold">Free 1-Hour Trial</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700 bg-white/50 px-6 py-3 rounded-2xl border border-white">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  <span className="font-semibold">1-on-1 Personalized Classes</span>
                </div>
              </div>

              <button
                onClick={scrollToContact}
                className="bg-purple-600 text-white px-10 py-5 rounded-full font-bold text-xl shadow-2xl shadow-purple-200 hover:bg-purple-700 transition-all hover:scale-105 active:scale-95"
              >
                Book Your Free Trial Now
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 text-slate-900">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-600">Everything you need to know about Qtutors</p>
          </motion.div>

          <div className="space-y-4">
            {[
              { q: 'Are classes recorded?', a: 'No, sessions are live and interactive via Google Meet for maximum engagement. Recordings are available by special request in specific cases.' },
              { q: 'What time zones do you support?', a: 'We accommodate students worldwide. Schedules are set mutually based on availability across all time zones.' },
              { q: 'Do you provide study material?', a: 'Yes, customized resources, practice papers, and materials are provided as part of your personalized learning plan.' },
              { q: 'How do I get started?', a: 'Simply book your free trial class through the contact form. No initial commitment required.' },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-3xl border border-slate-100 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="text-lg font-bold text-slate-800">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-purple-600 transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-50">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Start Your <span className="text-purple-400">Success Journey</span></h2>
              <p className="text-xl text-slate-400 mb-12 leading-relaxed">
                Fill out the form below to book your free trial class. We'll get back to you within 24 hours to schedule your session.
              </p>

              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center">
                    <Mail className="w-7 h-7 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">Email Us</h4>
                    <p className="text-slate-400">syedaummerubab12@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                    <Phone className="w-7 h-7 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">WhatsApp</h4>
                    <p className="text-slate-400">Contact via Form</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-white/10"
            >
              {submitStatus === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Form submitted!</h3>
                  <p className="text-slate-400 mb-8">We'll contact you soon.</p>

                  {/* WhatsApp Option */}
                  <div className="mb-8">
                    <p className="text-sm text-slate-500 mb-4">You can also reach us via WhatsApp:</p>
                    <a
                      href={`https://wa.me/${(import.meta.env.VITE_WHATSAPP_NUMBER || '1234567890').replace(/[^0-9]/g, '')}?text=Hi%20Qtutors%2C%20I%20just%20submitted%20my%20form%20for%20${formData.exam}%20preparation.%20My%20name%20is%20${formData.name}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-all"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949c-1.238.503-2.335 1.236-3.356 2.192-1.021.956-1.882 2.023-2.712 3.172-.83 1.15-1.611 2.393-2.191 3.760a9.957 9.957 0 00-.522 2.946 9.928 9.928 0 00.338 3.108 9.89 9.89 0 002.018 3.535c.675.733 1.519 1.325 2.372 1.855 1.712 1.042 3.632 1.646 5.63 1.646 1.998 0 3.918-.604 5.63-1.646 1.853-1.129 3.497-2.76 4.594-4.658 1.097-1.898 1.695-4.063 1.695-6.328 0-1.998-.604-3.918-1.646-5.63-1.129-1.853-2.76-3.497-4.658-4.594-1.898-1.097-4.063-1.695-6.328-1.695z" />
                      </svg>
                      Chat on WhatsApp
                    </a>
                  </div>

                  <button
                    onClick={() => setSubmitStatus(null)}
                    className="mt-8 text-purple-400 font-bold hover:underline"
                  >
                    Send Another Request
                  </button>
                </div>
              ) : (
                <form ref={form} onSubmit={sendEmail} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-400">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/10 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-sans"
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-400">Grade</label>
                      <input
                        type="text"
                        name="grade"
                        value={formData.grade}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/10 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-sans"
                        placeholder="Current Grade"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-400">Exam Preparing For</label>
                      <select
                        name="exam"
                        value={formData.exam}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/10 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all appearance-none font-sans"
                      >
                        <option value="" className="bg-slate-900">Select Exam</option>
                        <option value="NAPLAN" className="bg-slate-900">NAPLAN</option>
                        <option value="11+" className="bg-slate-900">11+</option>
                        <option value="GCSE/IGCSE" className="bg-slate-900">GCSE/IGCSE</option>
                        <option value="SAT" className="bg-slate-900">SAT</option>
                        <option value="Others" className="bg-slate-900">Others</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-400">Country</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/10 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-sans"
                        placeholder="Your Country"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-400">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/10 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-sans"
                        placeholder="Email Address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-400">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/10 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-sans"
                        placeholder="+1 234 567 890"
                      />
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-purple-600 text-white p-5 rounded-2xl font-bold text-lg hover:bg-purple-700 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      'Claim Your Free Trial Class'
                    )}
                  </motion.button>
                  {submitStatus === 'error' && (
                    <p className="text-red-400 text-center mt-4 text-sm font-medium">
                      Something went wrong. Please try again or email us directly.
                    </p>
                  )}
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-white/5 py-12 text-slate-400">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
            <div>
              <div className="text-2xl font-bold text-white mb-4 flex items-center justify-center md:justify-start gap-3">
                <img src="/logo.png" alt="Qtutors Logo" className="w-10 h-10 object-contain" />
                <span>Qtutors</span>
              </div>
              <p className="max-w-xs">Connecting students with world-class tutors for international standardized exams.</p>
            </div>

            <div className="flex gap-8">
              <a href="#about" className="hover:text-purple-400 transition-colors">About</a>
              <a href="#exams" className="hover:text-purple-400 transition-colors">Exams</a>
              <a href="#pricing" className="hover:text-purple-400 transition-colors">Pricing</a>
              <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>
            </div>

            <div className="text-sm">
              © 2026 Qtutors. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-purple-600 text-white p-4 rounded-full shadow-2xl shadow-purple-200 z-50 hover:bg-purple-700 transition-all"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
