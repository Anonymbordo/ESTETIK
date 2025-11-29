import { Header } from "@/components/layout/header";
import { ComparisonSlider } from "@/components/ui/comparison-slider";
import { motion } from "framer-motion";
import { Filter, BadgeCheck, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import stock images
import before1 from "@assets/stock_images/woman_face_profile_v_4a2adaaf.jpg";
import after1 from "@assets/stock_images/woman_face_profile_v_97744a8b.jpg";

const cases = [
  {
    id: 1,
    title: "Burun Estetiği & Çene",
    doctor: "Dr. Sarah Chen",
    tags: ["Rinoplasti", "Çene İmplantı"],
    description: "Doğal, kalkık bir burun ucu ve inceltilmiş kemer ile tam profil uyumu sağlandı.",
    before: before1,
    after: after1
  },
  {
    id: 2,
    title: "Revizyon Rinoplasti",
    doctor: "Dr. Michael Ross",
    tags: ["Revizyon", "Yapısal Greft"],
    description: "Önceki cerrahi asimetrisinin düzeltilmesi ve solunumun iyileştirilmesi.",
    before: after1, 
    after: before1
  }
];

export default function Gallery() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-20 md:pb-0">
      <Header />
      
      <main className="flex-1 pt-20 md:pt-24 px-4 md:px-8 container mx-auto max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-10 md:mb-16 space-y-3 md:space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-6xl font-bold tracking-tight text-slate-900"
          >
            Gerçek <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-500">Dönüşümler</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Her biri bir sanat eseri niteliğinde olan hasta hikayelerimizi inceleyin.
          </motion.p>
        </div>

        {/* Filter Bar - Horizontal Scroll on Mobile */}
        <div className="flex overflow-x-auto pb-4 gap-2 justify-start md:justify-center mb-8 no-scrollbar snap-x snap-mandatory">
          {["Tüm Vakalar", "Rinoplasti", "Revizyon", "Septoplasti", "Ameliyatsız"].map((filter, i) => (
            <Button 
              key={filter} 
              variant={i === 0 ? "default" : "outline"}
              className={`rounded-full px-5 whitespace-nowrap snap-center ${i === 0 ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          {cases.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-[2rem] p-3 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-500 border border-slate-100">
                <ComparisonSlider 
                  beforeImage={item.before} 
                  afterImage={item.after}
                  className="rounded-[1.5rem]" 
                />
                
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg md:text-xl text-slate-900">{item.title}</h3>
                      <p className="text-xs md:text-sm text-primary font-medium flex items-center gap-1 mt-1">
                        <BadgeCheck className="w-3.5 h-3.5" />
                        {item.doctor}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full bg-slate-50 hover:bg-primary hover:text-white transition-colors">
                      <ArrowUpRight className="w-5 h-5" />
                    </Button>
                  </div>
                  
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[10px] uppercase tracking-wider font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
