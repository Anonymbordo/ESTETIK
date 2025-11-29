import { Header } from "@/components/layout/header";
import { ComparisonSlider } from "@/components/ui/comparison-slider";
import { motion } from "framer-motion";
import { Filter, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import stock images
import before1 from "@assets/stock_images/woman_face_profile_v_4a2adaaf.jpg";
import after1 from "@assets/stock_images/woman_face_profile_v_97744a8b.jpg";

const cases = [
  {
    id: 1,
    title: "Burun Estetiği & Çene Dolgusu",
    doctor: "Dr. Sarah Chen",
    tags: ["Rinoplasti", "Çene İmplantı", "Profil Dengeleme"],
    description: "Doğal, kalkık bir burun ucu ve inceltilmiş kemer ile tam profil uyumu sağlandı.",
    before: before1,
    after: after1
  },
  {
    id: 2,
    title: "Revizyon Rinoplasti",
    doctor: "Dr. Michael Ross",
    tags: ["Revizyon", "Yapısal Greftleme"],
    description: "Önceki cerrahi asimetrisinin düzeltilmesi ve solunumun iyileştirilmesi.",
    before: after1, // Demo çeşitliliği için ters kullanılıyor
    after: before1
  }
];

export default function Gallery() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-20 px-4 md:px-8 container mx-auto max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900"
          >
            Gerçek Sonuçlar, <span className="text-gradient-primary">Doğal Güzellik</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Özenle seçilmiş hasta dönüşüm galerimizi keşfedin. Her prosedür, kişinin benzersiz anatomisine ve estetik hedeflerine göre uyarlanmıştır.
          </motion.p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {["Tüm Vakalar", "Rinoplasti", "Revizyon", "Septoplasti", "Ameliyatsız"].map((filter, i) => (
            <Button 
              key={filter} 
              variant={i === 0 ? "default" : "outline"}
              className={`rounded-full px-6 ${i === 0 ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
            >
              {filter}
            </Button>
          ))}
          <Button variant="ghost" size="icon" className="rounded-full">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {cases.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-panel rounded-3xl p-3 hover:shadow-2xl transition-all duration-500">
                <ComparisonSlider 
                  beforeImage={item.before} 
                  afterImage={item.after} 
                />
                
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-xl text-slate-900">{item.title}</h3>
                      <p className="text-sm text-primary font-medium flex items-center gap-1 mt-1">
                        <BadgeCheck className="w-4 h-4" />
                        {item.doctor}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-full text-xs">
                      Detayları Gör
                    </Button>
                  </div>
                  
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-[10px] uppercase tracking-wider font-semibold">
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
