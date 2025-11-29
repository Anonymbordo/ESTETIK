import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Star, Calendar, MapPin, Award, ArrowRight } from "lucide-react";

// Import stock images
import doctor1 from "@assets/stock_images/professional_doctor__b70cfab2.jpg";
import doctor2 from "@assets/stock_images/professional_doctor__bf26429e.jpg";

const specialists = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    title: "Double Board Certified Facial Plastic Surgeon",
    specialties: ["Rhinoplasty", "Revision Rhinoplasty", "Ethnic Rhinoplasty"],
    rating: 4.9,
    reviews: 128,
    location: "Beverly Hills, CA",
    image: doctor2,
    education: ["Harvard Medical School", "Johns Hopkins Residency"]
  },
  {
    id: 2,
    name: "Dr. Michael Ross",
    title: "Chief of Otolaryngology",
    specialties: ["Functional Rhinoplasty", "Septoplasty", "Reconstructive Surgery"],
    rating: 5.0,
    reviews: 94,
    location: "New York, NY",
    image: doctor1,
    education: ["Yale School of Medicine", "Mayo Clinic Fellowship"]
  }
];

export default function Specialists() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-20 px-4 md:px-8 container mx-auto max-w-7xl">
         {/* Hero Section */}
         <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-4"
          >
            World-Class <span className="text-gradient-primary">Surgeons</span>
          </motion.h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Choose from our network of elite, board-certified specialists who combine artistic vision with surgical precision.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {specialists.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel rounded-3xl p-2 flex flex-col md:flex-row gap-6 hover:border-primary/30 transition-colors group overflow-hidden"
            >
              {/* Doctor Image */}
              <div className="w-full md:w-48 h-64 md:h-auto shrink-0 relative rounded-2xl overflow-hidden">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
                <div className="absolute bottom-3 left-3 text-white md:hidden">
                  <div className="flex items-center gap-1 text-sm font-bold">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {doctor.rating}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-4 md:py-6 md:pr-6 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{doctor.name}</h3>
                    <p className="text-sm text-primary font-medium">{doctor.title}</p>
                  </div>
                  <div className="hidden md:flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-slate-700">{doctor.rating}</span>
                    <span className="text-slate-400 text-xs">({doctor.reviews})</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
                  <MapPin className="w-4 h-4" />
                  {doctor.location}
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Specialties</p>
                    <div className="flex flex-wrap gap-2">
                      {doctor.specialties.map(spec => (
                        <span key={spec} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md font-medium">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                     <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <Award className="w-3 h-3" /> Education
                     </p>
                     <ul className="text-sm text-slate-600 space-y-1">
                       {doctor.education.map(edu => (
                         <li key={edu} className="flex items-center gap-2">
                           <span className="w-1 h-1 bg-primary rounded-full" />
                           {edu}
                         </li>
                       ))}
                     </ul>
                  </div>
                </div>

                <div className="mt-auto flex gap-3">
                  <Button className="flex-1 shadow-lg shadow-primary/20 group/btn">
                    Book Consultation
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                  <Button variant="outline" className="flex-1">
                    View Profile
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
