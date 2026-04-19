import { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    category: '',
    preference: '',
    message: '',
    termsAccepted: false,
  });

  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic Custom Validation Check
    if (!formData.termsAccepted) {
      setStatus({ type: 'error', message: 'You must accept the terms and conditions.' });
      return;
    }

    if (!formData.preference) {
      setStatus({ type: 'error', message: 'Please select a preference.' });
      return;
    }

    // Success State
    console.log('Form Submitted Data:', formData);
    setStatus({ type: 'success', message: 'Form submitted successfully! Check console for details.' });
    
    // Optional: Reset form
    // setFormData({ fullName: '', email: '', phone: '', category: '', preference: '', message: '', termsAccepted: false });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header section */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white text-center">
          <h1 className="text-2xl font-bold mb-2">Contact Us</h1>
          <p className="text-blue-100 text-sm">We'd love to hear from you. Please fill out the form below.</p>
        </div>

        {/* Form section */}
        <div className="p-8">
          {status.message && (
            <div className={`mb-6 p-4 rounded-lg text-sm font-medium ${status.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="John Doe"
              />
            </div>

            {/* Email and Phone Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="(555) 000-0000"
                />
              </div>
            </div>

            {/* Dropdown Selection */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white"
              >
                <option value="" disabled>Select a category</option>
                <option value="support">Technical Support</option>
                <option value="sales">Sales Inquiry</option>
                <option value="feedback">General Feedback</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Radio Buttons */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Communication Preference <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="preference"
                    value="email"
                    checked={formData.preference === 'email'}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Email</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="preference"
                    value="phone"
                    checked={formData.preference === 'phone'}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Phone Call</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="preference"
                    value="text"
                    checked={formData.preference === 'text'}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Text Message</span>
                </label>
              </div>
            </div>

            {/* Textarea */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            {/* Checkbox */}
            <div className="flex items-start pt-2">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="termsAccepted"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="termsAccepted" className="font-medium text-gray-700 cursor-pointer">
                  I accept the terms and conditions <span className="text-red-500">*</span>
                </label>
                <p className="text-gray-500 mt-1">By checking this box, you agree to our privacy policy.</p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 outline-none shadow-md hover:shadow-lg"
              >
                Submit Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
