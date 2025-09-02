import React, { useState } from 'react';

interface BookingForm {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  date: string;
  time: string;
  message: string;
}

const Booking: React.FC = () => {
  const [formData, setFormData] = useState<BookingForm>({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    date: '',
    time: '',
    message: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceTypes = [
    { id: '1-on-1', name: '1-on-1 Training', price: '$120', duration: '60 min' },
    { id: 'group', name: 'Group Sessions', price: '$60', duration: '90 min' },
    { id: 'shooting', name: 'Shooting Clinics', price: '$80', duration: '75 min' },
    { id: 'virtual', name: 'Virtual Coaching', price: '$90', duration: '60 min' }
  ];

  const timeSlots = [
    '9:00 AM', '10:30 AM', '12:00 PM', '1:30 PM', '3:00 PM', '4:30 PM', '6:00 PM', '7:30 PM'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceSelect = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      serviceType: serviceId
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form and show success
    setFormData({
      name: '',
      email: '',
      phone: '',
      serviceType: '',
      date: '',
      time: '',
      message: ''
    });
    setCurrentStep(1);
    setIsSubmitting(false);
    
    alert('Booking request submitted successfully! We\'ll contact you within 24 hours to confirm your session.');
  };

  const selectedService = serviceTypes.find(service => service.id === formData.serviceType);

  return (
    <section id="booking" className="section-padding bg-light-gray">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold font-inter text-black mb-4">
            Book Your
            <span className="text-basketball-orange"> Session</span>
          </h2>
          <p className="text-lg text-gray-600 font-lato max-w-2xl mx-auto">
            Ready to elevate your game? Book a training session and start your journey.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className={`grid gap-12 ${selectedService ? 'lg:grid-cols-2' : 'lg:grid-cols-1'}`}>
            {/* Booking Form */}
            <div className="bg-white rounded-xl p-6 shadow-md animate-slide-in-left">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Service Selection */}
                {currentStep === 1 && (
                  <div className="animate-fade-in">
                    <h3 className="text-2xl font-bold font-inter text-black mb-6">
                      Choose Your Training
                    </h3>
                    <div className="space-y-4">
                      {serviceTypes.map((service) => (
                        <div
                          key={service.id}
                          onClick={() => handleServiceSelect(service.id)}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                            formData.serviceType === service.id
                              ? 'border-basketball-orange bg-orange-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-semibold text-black">{service.name}</h4>
                              <p className="text-sm text-gray-600">{service.duration}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold text-basketball-orange">
                                {service.price}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      disabled={!formData.serviceType}
                      className="w-full btn-primary mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue
                    </button>
                  </div>
                )}

                {/* Step 2: Personal Information */}
                {currentStep === 2 && (
                  <div className="animate-fade-in">
                    <h3 className="text-2xl font-bold font-inter text-black mb-6">
                      Your Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-basketball-orange focus:border-transparent"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-basketball-orange focus:border-transparent"
                          placeholder="Enter your email"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-basketball-orange focus:border-transparent"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>
                    <div className="flex gap-4 mt-6">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="flex-1 btn-secondary border-gray-300 text-gray-700 hover:bg-gray-100"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        disabled={!formData.name || !formData.email || !formData.phone}
                        className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Schedule */}
                {currentStep === 3 && (
                  <div className="animate-fade-in">
                    <h3 className="text-2xl font-bold font-inter text-black mb-6">
                      Schedule Your Session
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Date *
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          required
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-basketball-orange focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Time *
                        </label>
                        <select
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-basketball-orange focus:border-transparent"
                        >
                          <option value="">Select a time</option>
                          {timeSlots.map((time) => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Additional Notes
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-basketball-orange focus:border-transparent"
                          placeholder="Tell us about your goals, experience level, or any specific areas you'd like to focus on..."
                        />
                      </div>
                    </div>
                    <div className="flex gap-4 mt-6">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="flex-1 btn-secondary border-gray-300 text-gray-700 hover:bg-gray-100"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={!formData.date || !formData.time || isSubmitting}
                        className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Submitting...' : 'Book Session'}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Booking Summary - Only show when a service is selected */}
            {selectedService && (
              <div className="animate-slide-in-right">
                <div className="bg-white rounded-xl p-6 shadow-md mb-6">
                  <h3 className="text-2xl font-bold font-inter text-black mb-6">
                    Booking Summary
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-4 border-b border-gray-200">
                      <div>
                        <h4 className="font-semibold text-black">{selectedService.name}</h4>
                        <p className="text-sm text-gray-600">{selectedService.duration}</p>
                      </div>
                      <div className="text-xl font-bold text-basketball-orange">
                        {selectedService.price}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 space-y-2">
                      <p>✓ Professional coaching</p>
                      <p>✓ Personalized training plan</p>
                      <p>✓ Video analysis (where applicable)</p>
                      <p>✓ Progress tracking</p>
                      <p>✓ Flexible rescheduling</p>
                    </div>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="bg-gradient-to-br from-basketball-orange to-orange-600 rounded-xl p-6 text-white">
                  <h3 className="text-2xl font-bold font-inter mb-4">
                    Secure Payment
                  </h3>
                  <p className="mb-6 font-lato">
                    Payment is processed securely after booking confirmation. 
                    We accept all major credit cards and PayPal.
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="flex space-x-2">
                      <div className="w-8 h-6 bg-white rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-blue-600">VISA</span>
                      </div>
                      <div className="w-8 h-6 bg-white rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-red-600">MC</span>
                      </div>
                      <div className="w-8 h-6 bg-white rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-blue-800">AMEX</span>
                      </div>
                    </div>
                    <span className="text-sm opacity-90">+ PayPal</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
